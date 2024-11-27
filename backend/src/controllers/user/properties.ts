import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { media } from "@/db/schema/properties";
import { and, eq, sql } from "drizzle-orm";

export const getUserProperties = async (userId: string) => {
  const userProperties = await db
    .select({
      id: properties.id,
      propertyFor: properties.propertyFor,
      price: properties.price,
      completeAddress: properties.completeAddress,
      length: properties.length,
      width: properties.width,
      primaryImage: properties.primaryImage,
    })
    .from(properties)
    .where(eq(properties.userId, userId));

  return userProperties;
};

export const getUserPropertyDetails = async (
  propertyId: string,
  userId: string
) => {
  const [propertyDetails] = await db
    .select({
      // Property fields
      id: properties.id,
      location: properties.location,
      phone: properties.phone,
      name: properties.name,
      streetNumber: properties.streetNumber,
      street: properties.street,
      state: properties.state,
      city: properties.city,
      postalCode: properties.postalCode,
      country: properties.country,
      completeAddress: properties.completeAddress,
      primaryImage: properties.primaryImage,
      detailedPropertyType: properties.detailedPropertyType,
      bhk: properties.bhk,
      propertyFor: properties.propertyFor,
      length: properties.length,
      width: properties.width,
      images: sql`array_agg(${media.mediaUrl})`.as("images"),
      createdAt: properties.createdAt,
      updatedAt: properties.updatedAt,
      price: properties.price,
    })
    .from(properties)
    .leftJoin(media, eq(properties.id, media.propertyId))
    .where(and(eq(properties.id, propertyId), eq(properties.userId, userId)))
    .groupBy(properties.id);

  return {
    ...propertyDetails,
    location: {
      lat: propertyDetails.location.y,
      lng: propertyDetails.location.x,
    },
    images: (propertyDetails.images || []) as string[],
  };
};


