import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { sql } from "drizzle-orm";

export const getTopOfferProperty = async () => {
  const result = await db
    .select({
      id: properties.id,
      completeAddress: properties.completeAddress,
      price: properties.price,
      primaryImage: properties.primaryImage,
      location: properties.location,
      verified: properties.verified,
      createdAt: properties.createdAt,
      propertyFor: properties.propertyFor,
      sqFt: sql`${properties.length} * ${properties.width}`.as("sqFt"),
    })
    .from(properties)
    .limit(10);

  // only for Rpc file otherwise we get "never"
  // type ResultT = (typeof result)[0] & { sqFt: number };
  // return result as ResultT[];
  return result;
};
