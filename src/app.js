// Ridge Demo Shop: a small storefront API and page.
// Deliberately imperfect: Ridge's agents fix its bugs and build its features.
import express from "express";
import { products, findProduct } from "./catalog.js";
import { createOrder, getOrder } from "./orders.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.static(new URL("../public", import.meta.url).pathname));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.get("/api/products", (_req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = findProduct(req.params.id);
    if (!product) return res.status(404).json({ error: "product not found" });
    res.json(product);
  });

  // Prices are in cents everywhere.
  app.post("/api/cart/total", (req, res) => {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    res.json(cartTotal(items));
  });

  app.post("/api/orders", (req, res) => {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (!items.length) return res.status(422).json({ error: "cart is empty" });
    const order = createOrder({ customer: req.body.customer ?? "guest", items, total: cartTotal(items).total });
    res.status(201).json(order);
  });

  app.get("/api/orders/:id", (req, res) => {
    const order = getOrder(req.params.id);
    res.json({ id: order.id, status: order.status, items: order.items.length, total: order.total });
  });

  return app;
}

const FREE_SHIPPING_THRESHOLD = 5000; // cents
const SHIPPING_FEE = 499; // cents

export function cartTotal(items) {
  let subtotal = 0;
  for (const item of items) {
    const product = findProduct(item.id);
    if (!product) continue;
    subtotal += product.price;
  }
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}
