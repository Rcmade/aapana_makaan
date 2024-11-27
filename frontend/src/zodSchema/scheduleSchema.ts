import { scheduleType } from "@/content/webContent";
import { z } from "zod";

export const scheduleSchema = z.object({
  type: z.enum(scheduleType),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  propertyId: z.string(),
});

export const propertyInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  message: z.string().min(1, "Message is required"),
  propertyId: z.string(),
});
