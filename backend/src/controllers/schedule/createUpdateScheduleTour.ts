import { db } from "@/db/db";
import { scheduleSchema } from "@/db/schema";
import { ScheduleSchemaT } from "@/types";
import { eq } from "drizzle-orm";

export async function createOrUpdateScheduleTour(input: ScheduleSchemaT) {
  const { id, date: dateI, ...data } = input;
  const date = new Date(dateI);
  if (id) {
    // Update the schedule
    const updated = await db
      .update(scheduleSchema)
      .set({ ...data, date })
      .where(eq(scheduleSchema.id, id))
      .returning();
    if (updated.length > 0) {
      return {
        message: "Schedule updated successfully",
        data: updated[0],
        type: "UPDATE",
      };
    } else {
      return { message: "No schedule found to update", data: null };
    }
  } else {
    // Create a new schedule
    const [created] = await db
      .insert(scheduleSchema)
      .values({ ...data, date })
      .returning();
    // TODO:Add email notification to the seller and buyer
    return {
      message: "Schedule created successfully",
      data: created,
      type: "CREATE",
    };
  }
}
