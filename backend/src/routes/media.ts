import { deleteMedia } from "@/controllers/media";
import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const media = new Hono().post("/delete-media", verifyAuth, async (c) => {
  try {
    // Get authenticated user from context
    const auth = c.get("authUser");
    const userId = auth?.token?.sub;

    if (!userId) {
      throw new HTTPException(401, {
        message: "Unauthorized: User ID not found",
      });
    }

    // Parse JSON body to get mediaUrlOrId and propertyId
    const { mediaUrlOrId, propertyId } = await c.req.json();

    // Validate required fields
    if (!mediaUrlOrId || !propertyId) {
      throw new HTTPException(400, {
        message: "Media URL or ID and property ID are required.",
      });
    }

    // Call the deleteMedia function with parsed parameters
    const result = await deleteMedia({ mediaUrlOrId, userId, propertyId });

    // Return success message
    return c.json(result, 200);
  } catch (error: any) {
    // Handle any other unexpected errors
    throw new HTTPException(500, {
      message: error?.message || "An unknown error occurred",
    });
  }
});
export default media;
