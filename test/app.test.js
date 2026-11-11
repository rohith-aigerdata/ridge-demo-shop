import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

let server;
let base;

before(async () => {
  server = createApp().listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const post = (path, body) =>
  fetch(base + path, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

test("lists the catalog", async () => {
  const res = await fetch(base + "/api/products");
  assert.equal(res.status, 200);
  assert.equal((await res.json()).length, 6);
});

test("unknown product is a 404", async () => {
  assert.equal((await fetch(base + "/api/products/nope")).status, 404);
});

test("cart total for single items", async () => {
  const t = await (await post("/api/cart/total", { items: [{ id: "p1", qty: 1 }, { id: "p3", qty: 1 }] })).json();
  assert.equal(t.subtotal, 1450 + 650);
});

test("placing and reading back an order", async () => {
  const res = await post("/api/orders", { customer: "ana", items: [{ id: "p2", qty: 1 }] });
  assert.equal(res.status, 201);
  const order = await res.json();
  const back = await (await fetch(`${base}/api/orders/${order.id}`)).json();
  assert.equal(back.status, "placed");
});
