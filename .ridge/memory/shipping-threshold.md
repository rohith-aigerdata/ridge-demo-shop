# Free shipping threshold

`cartTotal()` in `src/app.js` applies shipping: 499 cents ($4.99) flat fee
below a 5000 cent ($50) subtotal, free (0) at or above it. Both constants are
named (`FREE_SHIPPING_THRESHOLD`, `SHIPPING_FEE`) at the top of `cartTotal`.

The storefront page (`public/index.html`) already handled an optional
`shipping` field in its `render()` function before this field existed on the
API response — no frontend change was needed, only the API had to start
returning `shipping`.
