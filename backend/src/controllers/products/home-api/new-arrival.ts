import { db } from "@/db/db";
import { categories, products } from "@/db/schema";
import { and, desc, eq, gt } from "drizzle-orm"; // Import necessary query helpers

export const getNewARrival = async () => {
  const latestProducts = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      discountedPrice: products.discountedPrice,
      primaryImage: products.primaryImage,
      stock: products.stock,
      brand: products.brand,
      categoryName: products.categoryName,
    })
    .from(products)
    // .innerJoin(categories, eq(products.categoryId, categories.id)) // Joining products with categories table
    .where(
      and(
        eq(products.isAvailable, true), // Product is available
        gt(products.stock, 0) // Stock greater than 0
      )
    )
    .orderBy(desc(products.createdAt)) // Sorting by latest createdAt
    .limit(20);
  return latestProducts;
};
