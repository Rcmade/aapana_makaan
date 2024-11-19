import { db } from "@/db/db";
import { products, users } from "@/db/schema";
import { PaginationParams } from "@/types";
import { and, count, eq, like, lte, sql } from "drizzle-orm";

export const getProducts = async (
  paginationParams: PaginationParams & {
    sortBy?: keyof typeof products;
    category?: string;
    priceFilter?: number;
    userId?: string;
  }
) => {
  const {
    limit = 10,
    page = 1,
    search = "",
    priceFilter,
    sortBy = "createdAt",
    category,
  } = paginationParams;

  // Build the search query
  const searchQuery = search
    ? sql`
      (
        to_tsvector('english', 
          coalesce(${products.name}, '') || ' ' || 
          coalesce(${products.categoryName}, '') || ' ' || 
          coalesce(${products.description}, '')
        ) @@ websearch_to_tsquery('english', ${search})
        OR ${products.name} % ${search}
      )
    `
    : undefined;

  const categoryFilter = category
    ? like(products.categoryName, `%${category}%`)
    : undefined;

  const priceFilterQuery =
    priceFilter !== undefined && !isNaN(priceFilter)
      ? lte(products.price, priceFilter.toString())
      : undefined;

  const userId = paginationParams.userId
    ? eq(products.userId, paginationParams.userId)
    : undefined;

  const filters = [
    searchQuery,
    categoryFilter,
    priceFilterQuery,
    userId,
  ].filter(Boolean);
  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const productList = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      discountedPrice: products.discountedPrice,
      primaryImage: products.primaryImage,
      stock: products.stock,
      brand: products.brand,
      categoryName: products.categoryName,
    })
    .from(products)
    .where(whereClause)
    .limit(limit)
    .offset(Math.max(page - 1, 0) * limit)
    .orderBy((products[sortBy] || products.createdAt) as any);

  const totalProducts = await db
    .select({ count: count() })
    .from(products)
    .where(whereClause);

  return {
    products: productList,
    pagination: {
      total: totalProducts[0]?.count || 0,
      limit: limit,
      page: page,
    },
  };
};

// Fetch a single product by ID
export const getProductById = async (id: string) => {
  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (product.length === 0) {
    throw new Error("Product not found");
  }

  return product[0];
};
