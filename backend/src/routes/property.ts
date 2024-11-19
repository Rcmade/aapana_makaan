import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { PropertiesSchemaT } from "@/types";
import { propertiesSchema } from "@/zodSchema/propertiesSchema";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { media } from "@/db/schema/properties";
import { getUserPropertyDetails } from "@/controllers/user/properties";
import { handlePropertyFetch } from "@/controllers/property/searchProperty";

const property = new Hono()
  .post("/add-property", verifyAuth, async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.token?.sub!;

    if (!userId) throw new HTTPException(401, { message: "UnAuthorized" });

    const data: PropertiesSchemaT = await c.req.json();
    const parseData = propertiesSchema.safeParse(data);

    if (!parseData.success) {
      throw new HTTPException(400, { message: "Invalid data" });
    }
    const [insert] = await db
      .insert(properties)
      .values({
        ...parseData.data,
        userId: userId,
        price: parseData.data.price?.toString(),
        location: {
          x: parseData.data.lng, // longitude
          y: parseData.data.lat, // latitude
        },
      })
      .returning({ id: properties.id });

    if (parseData?.data?.images?.length) {
      const formateImgs = parseData.data.images.map((img) => ({
        propertyId: insert.id,
        mediaUrl: img,
        mediaType: "image" as const,
      }));
      await db.insert(media).values(formateImgs);
    }

    return c.json({ message: "Property added successfully", data: insert });
  })
  .get("/search", async (c) => {
    const params = c.req.query();
    console.log({ params });
    const product = await handlePropertyFetch(params);
    return c.json(product);
  })
  .get("/p/:propertyId", verifyAuth, async (c) => {
    const propertyId = c.req.param("propertyId") || "";

    const auth = c.get("authUser");

    const userId = auth?.token?.sub;
    if (!userId) {
      return c.json(null);
    }
    const propertyDetails = await getUserPropertyDetails(propertyId, userId);
    return c.json(propertyDetails);
  });

export default property;
