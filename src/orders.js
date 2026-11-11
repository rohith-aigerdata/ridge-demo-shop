// In-memory orders; they reset on restart, which is fine for a demo.
const orders = new Map();
let next = 1000;

export function createOrder({ customer, items, total }) {
  const order = { id: String(next++), customer, items, total, status: "placed", createdAt: new Date().toISOString() };
  orders.set(order.id, order);
  return order;
}

export function getOrder(id) {
  return orders.get(id);
}
