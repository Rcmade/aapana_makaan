import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { logger } from "hono/logger";
import "dotenv/config";
import product from "@/routes/product";
import { cors } from "hono/cors";
import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import uploads from "./routes/uploads";
import user from "./routes/user";
import property from "./routes/property";
import media from "./routes/media";
import testRoute from "./routes/testRoute";
import { hc } from "hono/client";
import scheduleTour from "./routes/scheduleTour";

const app = new Hono();

app.use(logger());

app.use("*", initAuthConfig(getAuthConfig));

const port = Number(process.env.PORT || 3000);

console.log(`Server is running on  http://localhost:${port}`);

app.use(
  "/*",
  cors({
    origin: [
      "https://three-legant.vercel.app",
      "http://localhost:3000",
      "https://three-legant.vercel.app",
    ],
    allowMethods: ["POST", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  })
);

export const routes = app
  .route("/api/only-test", testRoute)
  .route("/api/products", product)
  .route("/api/property", property)
  .route("/api/media", media)
  .route("/api/user", user)
  .route("/api/uploads", uploads)
  .route("/api/schedule-tour", scheduleTour);

export type AppType = typeof routes;

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [],
  };
}

// const client = hc<AppType>("http://localhost:4000");

// const a = client.api.property["top-offer"]["$url"];

// console.dir(a().toString(), {
//   depth: Infinity,
//   colors: true,
// });

serve({
  fetch: routes.fetch,
  port,
});
