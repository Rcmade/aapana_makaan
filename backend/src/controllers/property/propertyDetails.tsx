import { db } from "@/db/db";
import { media, properties, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPropertyDetails = async (propertyId: string) => {
  const result = await db
    .select({
      property: properties,
      images: {
        url: media.mediaUrl,
      },
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        image: users.image,
      },
    })
    .from(properties)
    .leftJoin(media, eq(properties.id, media.propertyId))
    .leftJoin(users, eq(properties.userId, users.id))
    .where(eq(properties.id, propertyId));

  // Transform the result for easier use
  const property = result[0]?.property;
  const mediaItems = result.map((row) => row.images).filter(Boolean);
  const userInfo = result[0]?.user; // Since user info will be the same across rows

  return {
    ...property,
    images: mediaItems,
    user: userInfo,
  };
};
