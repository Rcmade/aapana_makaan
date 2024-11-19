// helper.ts
import { getProducts } from "@/controllers/products/get-product";

export async function handleProductFetch(
  params: Record<string, string>,
  userId = ""
) {
  // Extract and parse query parameters with defaults
  const {
    limit = 10,
    page = 1,
    search = "",
    priceFilter,
    sortBy = "createdAt",
    category,
  } = params;

  const parsedPriceFilter = priceFilter ? +priceFilter : undefined;
  // Fetch products with parsed parameters
  const product = await getProducts({
    limit: +limit,
    page: +page,
    search,
    priceFilter: parsedPriceFilter,
    sortBy: sortBy as any,
    category,
    userId: userId,
  });

  return product;
}
