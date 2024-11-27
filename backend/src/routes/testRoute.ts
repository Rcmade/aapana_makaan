import { deleteMedia } from "@/controllers/media";
import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const testRoute = new Hono().get("/", async (c) => {
  const params = c.req.query();
  return c.json(params);
});
export default testRoute;
