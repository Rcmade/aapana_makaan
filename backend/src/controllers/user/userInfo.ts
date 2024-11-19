// import { getUserCartCount } from "@/queries/getUserCartCount";

import { db } from "@/db/db";
import { properties, users } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export const userBasicInfo = async (userId: string) => {
  const [userPropertyCount] = await db
    .select({
      propertyCount: count(),
    })
    .from(properties)
    .where(eq(properties.userId, userId));

  return {
    ...userPropertyCount,
  };
};

export const userDetailedInfo = async (userId: string) => {
  const [userPropertyCount] = await db
    .select({
      propertyCount: count(),
    })
    .from(properties)
    .where(eq(properties.userId, userId));
  updatedAt: Date;
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      role: users.role,
      email: users.email,
      phone: users.phone,
      image: users.image,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId));
  return {
    ...userPropertyCount,
    ...user,
  };
};
