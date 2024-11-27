import {
  pgTable,
  integer,
  text,
  varchar,
  decimal,
  pgEnum,
  geometry,
  index,
  customType,
  boolean,
} from "drizzle-orm/pg-core";
import { commonCreatedField } from "./commonSchemaFields";
import {
  bhkArr,
  mediaTypeArr,
  propertyForArr,
  propertyTypeArr,
} from "../../constants/index";
import { users } from "./userSchema";
import { SQL, sql } from "drizzle-orm";

export const propertyType = pgEnum("property_type", propertyTypeArr);
export const bhk = pgEnum("bhk", bhkArr);
export const propertyFor = pgEnum("property_for", propertyForArr);
export const mediaType = pgEnum("media_type", mediaTypeArr);
// export const properties = pgTable("properties", {
//   ...commonCreatedField,
//   title: varchar("title", { length: 255 }).notNull(),
//   description: text("description"),
//   price: decimal("price", { precision: 12, scale: 2 }).notNull(),
//   propertyType: varchar("property_type", { length: 50 }),
//   status: varchar("status", { length: 20 }),
// });

// export const locations = pgTable("locations", {
//   id: commonCreatedField.id,
//   propertyId: integer("property_id").references(() => properties.id, {
//     onDelete: "cascade",
//     onUpdate: "cascade",
//   }),
//   addressLine: varchar("address_line", { length: 255 }),
//   city: varchar("city", { length: 100 }),
//   state: varchar("state", { length: 100 }),
//   country: varchar("country", { length: 100 }),
//   postalCode: varchar("postal_code", { length: 20 }),
//   latitude: decimal("latitude", { precision: 9, scale: 6 }),
//   longitude: decimal("longitude", { precision: 9, scale: 6 }),
// });

// export const propertyFeatures = pgTable("property_features", {
//   id: commonCreatedField.id,
//   propertyId: integer("property_id").references(() => properties.id, {
//     onDelete: "cascade",
//   }),
//   bedrooms: integer("bedrooms"),
//   bathrooms: integer("bathrooms"),
//   squareFootage: integer("square_footage"),
//   lotSize: integer("lot_size"),
//   yearBuilt: integer("year_built"),
//   floors: integer("floors"),
//   garage: boolean("garage"),
//   petFriendly: boolean("pet_friendly"),
// });

// export const propertyAmenities = pgTable("property_amenities", {
//   id: commonCreatedField.id,
//   propertyId: integer("property_id").references(() => properties.id, {
//     onDelete: "cascade",
//   }),
//   amenity: varchar("amenity", { length: 50 }),
// });

export const tsVector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});
export const properties = pgTable(
  "properties",
  {
    ...commonCreatedField,
    // Location field using PostGIS geometry
    location: geometry("location", {
      type: "Point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
    // user info
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    phone: text("phone").notNull(),
    name: text("name").notNull(),
    // Address fields
    streetNumber: varchar("street_number", { length: 100 }),
    street: varchar("street", { length: 100 }),
    state: varchar("state", { length: 100 }),
    city: varchar("city", { length: 100 }),
    postalCode: varchar("postal_code", { length: 20 }),
    country: varchar("country", { length: 100 }),
    completeAddress: text("complete_address").notNull(),
    // Property details
    primaryImage: text("primary_image").notNull(),
    detailedPropertyType: propertyType("property_type").notNull(),
    bhk: bhk("bhk"),
    propertyFor: propertyFor("property_for").default("Sell"),
    // Size fields
    length: integer("length").notNull(),
    width: integer("width").notNull(),
    verified: boolean("verified").notNull().default(false),
    // Pricing
    price: decimal("price", { precision: 12, scale: 2 }).notNull(),
    contentSearch: tsVector("content_search").generatedAlwaysAs(
      (): SQL =>
        sql`to_tsvector('english', ${properties.completeAddress} || ' ' || ${properties.name})`
    ),
  },
  (t) => ({
    // Spatial index on location for fast geospatial querying
    locationIndex: index("location_index").using("gist", t.location),
    fulltextIndex: index("properties_fulltext_idx").using(
      "gin",
      t.contentSearch
    ),
  })
);

export const media = pgTable("media", {
  id: commonCreatedField.id,
  propertyId: text("property_id").references(() => properties.id, {
    onDelete: "cascade",
  }),
  mediaUrl: text("media_url").notNull(),
  mediaType: mediaType("media_type").default("image"),
});

/* 






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
    images: z.array(z.instanceof(File)).min(1, {
      message: "At least one image is required",
    }),
  }),

  "property-details": z.object({
    bhk: z.enum(bhk, {
      errorMap: () => ({ message: "Invalid BHK type selected" }),
    }),
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

*/
