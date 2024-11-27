import { db } from "@/db/db";
import { propertyInquiries } from "@/db/schema";
import { PropertyInquiriesT } from "@/types";
import { eq } from "drizzle-orm";

export async function sendInquiryMessageByClientCreateUpdate(
  input: PropertyInquiriesT
) {
  const { id, ...data } = input;
  if (id) {
    // Update the PropertyInquiries
    const updated = await db
      .update(propertyInquiries)
      .set({ ...data })
      .where(eq(propertyInquiries.id, id))
      .returning();
    if (updated.length > 0) {
      return {
        message: "PropertyInquiries updated successfully",
        data: updated[0],
        type: "UPDATE",
      };
    } else {
      return { message: "No PropertyInquiries found to update", data: null };
    }
  } else {
    // Create a new PropertyInquiries
    const [created] = await db
      .insert(propertyInquiries)
      .values({ ...data })
      .returning();
    // TODO:Add email notification to the seller and buyer
    return {
      message: "PropertyInquiries created successfully",
      data: created,
      type: "CREATE",
    };
  }
}
