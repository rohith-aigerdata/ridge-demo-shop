# Project memory (SHOP / ridge-demo-shop)

- [cart-total-ignores-qty.md](cart-total-ignores-qty.md) — `cartTotal` adds each product price once and ignores `item.qty` (open bug, not fixed by the UI issue).
- [storefront-is-one-static-file.md](storefront-is-one-static-file.md) — the whole UI lives in `public/index.html`; no build step, no external assets.
- [running-tests.md](running-tests.md) — run `node --test test/app.test.js`; bare `node --test test/` fails on this Node version.
