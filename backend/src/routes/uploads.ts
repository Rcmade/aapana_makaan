import { generateSignature } from "@/controllers/uploads";
import cloudinaryService from "@/services/uploadService";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const uploads = new Hono().post("/signature", async (c) => {
  const signature = await generateSignature();
  return c.json(signature);
});

export default uploads;
