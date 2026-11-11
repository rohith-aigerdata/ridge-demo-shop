// Entry point. Error tracking turns on when the platform provides a DSN
// (Temps injects SENTRY_DSN into every app it deploys).
import * as Sentry from "@sentry/node";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV ?? "production",
    release: process.env.GIT_COMMIT ?? undefined,
  });
}

const { createApp } = await import("./app.js");
const app = createApp();

if (process.env.SENTRY_DSN) Sentry.setupExpressErrorHandler(app);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`ridge-demo-shop listening on :${port}`));
