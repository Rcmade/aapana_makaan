import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
import { scheduleTypeArr } from "@/constants";
import { properties } from "./properties";

export const scheduleType = pgEnum("schedule_type", scheduleTypeArr);
const common = {
  id: commonCreatedField.id,
  createdAt: commonCreatedField.createdAt,
  propertyId: text("property_id")
    .references(() => properties.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
};
export const scheduleSchema = pgTable("schedule", {
  type: scheduleType("type").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  time: varchar("time", { length: 10 }).notNull(),
  ...common,
});

export const propertyInquiries = pgTable("property_inquiries", {
  message: text("message").notNull(),
  ...common,
});
