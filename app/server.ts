import { serveStatic as honoServeStatic } from "@hono/node-server/serve-static";
import { createApp } from "@sonikjs/react";
import { serveStatic } from "hono/cloudflare-pages";

const app = createApp();
app.use("/static/*", serveStatic());
// The `serveStatic` exposed by "hono/cloudflare-pages" does not take a parameter.
app.use(
  "/assets/*",
  honoServeStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets/, "/assets"),
  }),
);

export default app;
