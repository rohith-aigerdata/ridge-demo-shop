# cartTotal ignores item quantity

`cartTotal()` in `src/app.js` loops the cart items and adds `product.price`
once per line, never multiplying by `item.qty`. So `POST /api/cart/total`
and `POST /api/orders` under-charge for any line with qty > 1, even though
the page sends and displays the quantity.

Confirmed while redesigning the storefront (SHOP-16, UI-only scope), so it
was deliberately left unfixed there. Needs its own ticket + regression test
("cart total multiplies price by quantity").
