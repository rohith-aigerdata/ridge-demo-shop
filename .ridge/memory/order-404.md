# GET /api/orders/:id must 404 for unknown ids

`getOrder(id)` returns `undefined` for unknown orders (in-memory Map).
The route previously accessed `order.id` directly, causing a TypeError
in production. Always check `if (!order) return res.status(404)...`
before reading properties off a lookup result.
