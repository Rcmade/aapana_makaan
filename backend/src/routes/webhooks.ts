import { Hono } from "hono";
import { productPaymentSucceeded } from "@/controllers/webhooks/productPaymentSucceeded";
import { HTTPException } from "hono/http-exception";

const webhooks = new Hono().post("/order-payment", async (c) => {
  const data = await c.req.text();
  const sig = c.req.header("stripe-signature")!;

  const res = await productPaymentSucceeded(data, sig);

  if (res.error) {
    throw new HTTPException(400, { message: res.error });
  }

  return c.json(res);});

export default webhooks;
