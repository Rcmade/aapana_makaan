import { z } from "zod";

export const propertyType = ["Residential", "Commercial"] as const;
export const detailedPropertyType = ["Plot", "Flat", "House"] as const;
const bhk = ["1 BHK", "2 BHK", "3 BHK", "3+ BHK"] as const;
const furnishType = [
  "Fully Furnished",
  "Semi Furnished",
  "Unfurnished",
] as const;

const propertySchemaObj = {
  // propertyType: z.enum(propertyType),
  propertyDetails: z.object({
    detailedPropertyType: z.enum(detailedPropertyType),
    bhk: z.enum(bhk),
    bathroom: z.number().optional(),
    // .min(0, { message: "Number of bathrooms cannot be negative" }),
    furnishType: z.enum(furnishType).optional(),
    size: z
      .number()
      .min(10, { message: "Size should be greater than or equal to 10 sq ft" }), // Size in sq ft
    price: z
      .number()
      .min(100000, { message: "Price should be greater than 1 lakh" }),
  }),
  address: z.object({
    lat: z.number(),
    lng: z.number(),
    streetNumber: z.string(),
    // .min(1, { message: "Street number is required" }),
    // .min(1, { message: "Street is required" }),
    street: z.string(),
    city: z.string(),
    // .min(1, { message: "City is required" }),
    postalCode: z.string(),
    state: z.string(),
    // .min(1, { message: "Postal code is required" }),
    country: z.string(),
    // .min(1, { message: "Country is required" }),
    completeAddress: z
      .string()
      .min(1, { message: "Complete address is required" }),
  }),
  // images: z.array(z.string()).min(1, {
  //   message: "At least one image is required",
  // }),
  images: z.array(z.instanceof(File)).min(1, {
    message: "At least one image is required",
  }),

  userInfo: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z.string().min(10, { message: "Invalid phone number" }),
  }),
};
export const propertySchema = z.object(propertySchemaObj);

// /**Keys should be belong to @type PropertyFormContentKey */
// export const pSchemaObj = {
//   "property-type": z.object({
//     detailedPropertyType: z.enum(detailedPropertyType),
//   }),
//   location: z.object({
//     lat: z.number(),
//     lng: z.number(),
//     streetNumber: z.string(),
//     street: z.string(),
//     city: z.string(),
//     postalCode: z.string(),
//     country: z.string(),
//     completeAddress: z
//       .string()
//       .min(1, { message: "Complete address is required" }),
//   }),

//   photos: z.object({
//     images: z.array(z.instanceof(File)).min(1, {
//       message: "At least one image is required",
//     }),
//   }),

//   "property-details": z.object({
//     bhk: z.enum(bhk),
//     bathroom: z.number().optional(),
//     furnishType: z.enum(furnishType).optional(),
//     size: z
//       .number()
//       .min(10, { message: "Size should be greater than or equal to 10 sq ft" }), // Size in sq ft
//   }),

//   price: z.object({
//     price: z
//       .number()
//       .min(100000, { message: "Price should be greater than 1 lakh" }),
//   }),
//   "contact-info": z.object({
//     name: z.string().min(1, { message: "Name is required" }),
//     email: z.string().email({ message: "Invalid email address" }).optional(),
//     phone: z.string().min(10, { message: "Invalid phone number" }),
//   }),
// };

// export const pSchema = z.object(pSchemaObj);

/** Keys should belong to @type PropertyFormContentKey */
export const pSchemaObj = {
  "property-type": z.object({
    detailedPropertyType: z.enum(detailedPropertyType, {
      errorMap: () => ({ message: "Invalid property type selected" }),
    }),
  }),
  location: z.object({
    lat: z.number({
      invalid_type_error: "Latitude must be a number",
    }),
    lng: z.number({
      invalid_type_error: "Longitude must be a number",
    }),
    streetNumber: z.string(),
    // .min(1, { message: "Street number is required" }),
    street: z.string(),
    state: z.string(),
    // .min(1, { message: "Street name is required" }),
    city: z.string(),
    // .min(1, { message: "City is required" }),
    postalCode: z.string(),
    // .min(1, { message: "Postal code is required" }),
    country: z.string(),
    // .min(1, { message: "Country is required" }),
    completeAddress: z
      .string()
      .min(1, { message: "Complete address is required" }),
  }),

  photos: z.object({
    // images: z
    //   .array(z.union([z.instanceof(File), z.string()]))
    //   .min(1, { message: "At least one image is required" }),
    images: z
      .array(z.string())
      .min(1, { message: "At least one image is required" }),
  }),

  "property-details": z.object({
    bhk: z
      .enum(bhk, {
        errorMap: () => ({ message: "Invalid BHK type selected" }),
      })
      .optional(),
    bathroom: z
      .number()
      .min(0, { message: "Number of bathrooms must be at least 0" })
      .optional(),

    furnishType: z
      .enum(furnishType, {
        errorMap: () => ({ message: "Invalid furnish type selected" }),
      })
      .optional(),
    length: z
      .number()
      .min(5, "Length should be greater than or equal to 5 sq ft"),
    width: z
      .number()
      .min(5, "Length should be greater than or equal to 5 sq ft"),
  }),

  price: z.object({
    price: z
      .number()
      .min(100000, { message: "Price should be greater than 1 lakh" }),
  }),

  "contact-info": z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters" }),
  }),
};

export const pSchema = z.object(pSchemaObj);
