# The storefront UI is a single static file

Everything the shop page does — markup, CSS and the module script that talks
to `/api/products`, `/api/cart/total`, `/api/orders` — lives in
`public/index.html`, served by `express.static` from `src/app.js`.

There is no bundler, no framework and no external font/CDN request: keep the
page self-contained. UI tests therefore assert on the served HTML (status,
content-type, presence of the `#products` / `#lines` / `#totals` / `#checkout`
hooks the script depends on) rather than on rendered DOM.
