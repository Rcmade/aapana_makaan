import { createOrUpdateScheduleTour } from "@/controllers/schedule/createUpdateScheduleTour";
import { sendInquiryMessageByClientCreateUpdate } from "@/controllers/schedule/sendInquiryMessageByClient";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const scheduleTour = new Hono()
  .post("/create-update-tour", async (c) => {
    try {
      const data = await c.req.json();
      const result = await createOrUpdateScheduleTour(data);
      return c.json(result, 201);
    } catch (error: any) {
      // Handle any other unexpected errors
      throw new HTTPException(500, {
        message: error?.message || "An unknown error occurred",
      });
    }
  })
  .post("/create-update-property-inquiry-message", async (c) => {
    try {
      const data = await c.req.json();
      const result = await sendInquiryMessageByClientCreateUpdate(data);
      return c.json(result, 201);
    } catch (error: any) {
      // Handle any other unexpected errors
      throw new HTTPException(500, {
        message: error?.message || "An unknown error occurred",
      });
    }
  });
export default scheduleTour;
