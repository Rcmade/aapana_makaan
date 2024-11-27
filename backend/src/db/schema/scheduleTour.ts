import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
import { scheduleTypeArr } from "@/constants";

export const scheduleType = pgEnum("schedule_type", scheduleTypeArr);
export const scheduleSchema = pgTable("schedule", {
  id: commonCreatedField.id,
  type: scheduleType("type").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  time: varchar("time", { length: 10 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  createdAt: commonCreatedField.createdAt,
});


