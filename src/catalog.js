// In-memory catalog. Prices in cents.
export const products = [
  { id: "p1", name: "Alpine Coffee Beans", category: "pantry", price: 1450 },
  { id: "p2", name: "Glacier Water Bottle", category: "outdoor", price: 2200 },
  { id: "p3", name: "Summit Trail Mix", category: "pantry", price: 650 },
  { id: "p4", name: "Ridge Wool Beanie", category: "apparel", price: 1800 },
  { id: "p5", name: "Basecamp Mug", category: "kitchen", price: 1200 },
  { id: "p6", name: "Peak Headlamp", category: "outdoor", price: 3400 },
];

export function findProduct(id) {
  return products.find((p) => p.id === id) ?? null;
}
