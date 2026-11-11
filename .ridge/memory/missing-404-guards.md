# Missing 404 guards cause TypeErrors in production

`src/orders.js#getOrder` returns `undefined` for unknown ids (it's just a `Map.get`).
`GET /api/orders/:id` in `src/app.js` did not check for this before destructuring
`order.id`, causing `TypeError: Cannot read properties of undefined (reading 'id')`
in production for any request to an order id that doesn't exist.

Fix pattern: always add an explicit `if (!entity) return res.status(404)...`
guard right after any `getX(id)` / `findX(id)` lookup, mirroring the pattern
already used in `GET /api/products/:id`. Check all id-lookup routes for this
when auditing, not just the one reported.
