# Running the test suite

`npm test` runs `node --test` (no path), which discovers `test/*.test.js`.
Running `node --test test/` directly fails with MODULE_NOT_FOUND on the Node
version in this image — pass the file instead: `node --test test/app.test.js`.
