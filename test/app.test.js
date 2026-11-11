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

test("shipping is $4.99 when subtotal is below $50", async () => {
  const t = await (await post("/api/cart/total", { items: [{ id: "p1", qty: 1 }, { id: "p3", qty: 1 }] })).json();
  assert.equal(t.subtotal, 2100);
  assert.equal(t.shipping, 499);
  assert.equal(t.total, 2100 + 499);
});

test("shipping is free when subtotal is $50 or more", async () => {
  const t = await (await post("/api/cart/total", { items: [{ id: "p2", qty: 1 }, { id: "p6", qty: 1 }] })).json();
  assert.equal(t.subtotal, 2200 + 3400);
  assert.equal(t.shipping, 0);
  assert.equal(t.total, t.subtotal);
});

test("storefront page is served at /", async () => {
  const res = await fetch(base + "/");
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /text\/html/);
});

test("storefront page renders the catalog and cart regions", async () => {
  const html = await (await fetch(base + "/")).text();
  for (const hook of ['id="products"', 'id="lines"', 'id="totals"', 'id="checkout"', 'id="status"']) {
    assert.ok(html.includes(hook), `missing ${hook}`);
  }
});

test("placing and reading back an order", async () => {
  const res = await post("/api/orders", { customer: "ana", items: [{ id: "p2", qty: 1 }] });
  assert.equal(res.status, 201);
  const order = await res.json();
  const back = await (await fetch(`${base}/api/orders/${order.id}`)).json();
  assert.equal(back.status, "placed");
});
