import {
  pgTable,
  text,
  varchar,
  numeric,
  integer,
  timestamp,
  boolean,
  json,
  pgEnum,
  AnyPgColumn,
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { nId } from "@/lib/utils/dbUtils";
// import { users } from "./userSchema";
import { commonCreatedField } from "./commonSchemaFields";

// Table for Categories
export const categories = pgTable("categories", {
  ...commonCreatedField,
  // id: text("id").primaryKey().$defaultFn(nId),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  image: text("image"),
  parentCategoryId: text("parent_category_id"), // For sub-categories
});

// Table for Products
export const products = pgTable(
  "products",
  {
    ...commonCreatedField,
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    sku: varchar("sku", { length: 50 }).unique().notNull(), // Stock Keeping Unit
    rating: numeric("rating", { precision: 10, scale: 2 }),
    categoryId: text("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    categoryName: varchar("category_name", { length: 255 }),
    // userId: text("user_id")
    //   .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    //   .notNull(),
    isAvailable: boolean("is_available").default(true),
    currentVariantType: varchar("variant_type", { length: 50 }),
    variantValue: varchar("variant_value", { length: 50 }),
    brand: varchar("brand", { length: 100 }),
    parentId: text("parent_id").references((): AnyPgColumn => products.id, {
      onDelete: "set null",
    }), // Self-referencing Foreign Key
    primaryImage: text("primary_image").notNull(),
    stock: integer("stock").default(0).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    discountedPrice: numeric("discounted_price", { precision: 10, scale: 2 }),
    sortDescription: varchar("sort_description", { length: 300 }).notNull(),
    meta: json("meta"), // JSON for additional product-specific attributes
  },
  (table) => ({
    nameSearchIndex: index("name_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.name})`
    ),
    categorySearchIndex: index("category_search_index").using(
      "gin",
      sql`to_tsvector('english', ${table.categoryName})`
    ),
  })
);

export const imageType = pgEnum("ImageType", [
  "BANNER",
  "PRIMARY",
  "SUB_IMAGES",
]);

// Product Images (multiple images per product)
export const productImages = pgTable("product_images", {
  id: text("id").primaryKey().$defaultFn(nId),
  productId: text("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  role: imageType("image_type").notNull().default("SUB_IMAGES"),
});

// Table for Reviews
export const reviews = pgTable("reviews", {
  id: text("id").primaryKey().$defaultFn(nId),
  productId: text("product_id")
    .references(() => products.id)
    .notNull(),
  // userId: text("user_id")
  //   .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
  //   .notNull(),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  reviewText: text("review_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Table for Inventory Logs
export const inventoryLogs = pgTable("inventory_logs", {
  id: text("id").primaryKey().$defaultFn(nId),
  productId: text("product_id")
    .references(() => products.id)
    .notNull(),
  // userId: text("user_id")
  //   .references(() => users.id)
  //   .notNull(), // User who made the inventory change
  changeType: varchar("change_type", { length: 50 }).notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations for Products
export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  // user: one(users, {
  //   fields: [products.userId],
  //   references: [users.id],
  // }),
}));

// Relations for Reviews
export const reviewRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  // user: one(users, {
  //   fields: [reviews.userId],
  //   references: [users.id],
  // }),
}));

// Relations for Inventory Logs
export const inventoryLogRelations = relations(inventoryLogs, ({ one }) => ({
  product: one(products, {
    fields: [inventoryLogs.productId],
    references: [products.id],
  }),
  // user: one(users, {
  //   fields: [inventoryLogs.userId],
  //   references: [users.id],
  // }),
}));
