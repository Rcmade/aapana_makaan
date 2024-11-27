import { db } from "@/db/db";
import { users } from "@/db/schema";
import {type UpsertUserT } from "@/types";
import { eq } from "drizzle-orm";

export const upsertUser = async (user: UpsertUserT) => {
  const [existingUser] = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, user.email))
    .limit(1);

  const formateUser = {
    email: user.email!,
    name: user.name!,
    image: user.image!,
    id: existingUser?.id,
  };
  const [upsertUserDb] = await db
    .insert(users)
    .values(formateUser)
    .onConflictDoUpdate({
      target: users.id,
      set: formateUser,
    })
    .returning();

  return { ...upsertUserDb, isNewUser: !existingUser?.id };
};
