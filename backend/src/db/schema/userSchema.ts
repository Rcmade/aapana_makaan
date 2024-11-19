import { pgTable, text, varchar, pgEnum } from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
export const userRole = pgEnum("UserRole", ["ADMIN", "USER", "SELLER"]);

export const users = pgTable("user", {
  ...commonCreatedField,
  role: userRole("role").notNull().default("USER"),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  image: text("image"),
});
