import { bhkArr, propertyForArr, propertyTypeArr } from "@/constants";
import { z } from "zod";

export const propertiesSchema = z.object({
  lat: z.number({
    invalid_type_error: "Latitude must be a number",
  }),
  lng: z.number({
    invalid_type_error: "Longitude must be a number",
  }),

  streetNumber: z.string().nullable().optional(),
  street: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  completeAddress: z
    .string()
    .min(1, { message: "Complete address is required" }),
  name: z.string().min(1),
  phone: z.string().min(1),
  price: z
    .number()
    .min(100000, { message: "Price should be greater than 1 lakh" }),
  bhk: z.enum(bhkArr).nullable().optional(),
  propertyFor: z.enum(propertyForArr).nullable().optional(),
  width: z.number().min(5, "Length should be greater than or equal to 5 sq ft"),
  length: z
    .number()
    .min(5, "Length should be greater than or equal to 5 sq ft"),
  primaryImage: z.string(),
  detailedPropertyType: z.enum(propertyTypeArr),
  images: z.array(z.string()),
  id: z.string().optional(),
});

// export const propertiesSchema = createSelectSchema(properties, {
//   // location: z.object({
//   //   lat: z.number({
//   //     invalid_type_error: "Latitude must be a number",
//   //   }),
//   //   lng: z.number({
//   //     invalid_type_error: "Longitude must be a number",
//   //   }),
//   // }),
// });
// // .omit({
// //   userId: true,
// //   createdAt: true,
// //   updatedAt: true,
// //   bhk: true,
// //   propertyType: true,
// // })
// // .and(
// //   // z.object({
// //   //   images: z.array(z.string()),
// //   // })
// // );
