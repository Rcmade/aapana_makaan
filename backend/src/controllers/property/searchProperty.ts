// helper.ts
import { properties } from "@/db/schema/properties";
import { HTTPException } from "hono/http-exception";
import { and, count, eq, lte, sql } from "drizzle-orm";
import { db } from "@/db/db";
import { propertySearchDistance } from "@/constants";
import {type PropertyFetchParams } from "@/types";

// Define type for pagination parameters and filtering options

// Helper function to handle property fetching with filters
export async function handlePropertyFetch(
  params: Record<string, string>,
  userId = ""
) {
  const {
    limit = 10,
    page = 1,
    search = "",
    priceFilter,
    sortBy = "createdAt",
    category,
    lat,
    lng,
  } = params;

  const parsedLimit = parseInt(limit.toString(), 10) || 10;
  const parsedPage = parseInt(page.toString(), 10) || 1;
  const parsedPriceFilter = priceFilter ? +priceFilter : undefined;
  const parsedLat = lat ? parseFloat(lat) : undefined;
  const parsedLng = lng ? parseFloat(lng) : undefined;

  const propertiesList = await getProperties({
    limit: parsedLimit,
    page: parsedPage,
    search: search?.trim(),
    priceFilter: parsedPriceFilter,
    sortBy: sortBy as any,
    category,
    userId,
    lat: parsedLat,
    lng: parsedLng,
  });

  return propertiesList;
}

export const getProperties = async (params: PropertyFetchParams) => {
  const {
    limit = 10,
    page = 1,
    search = "",
    priceFilter,
    sortBy = "createdAt",
    category,
    userId,
    lat,
    lng,
  } = params;

  let formattedSearchTerm = "";
  if (search) {
    // Sanitize the search term to remove non-alphanumeric characters (except spaces, hyphens, and apostrophes)
    const sanitizedSearchTerm = search.replace(/[^a-zA-Z0-9\s'-]/g, "");
    formattedSearchTerm = sanitizedSearchTerm.split(" ").join(" | ");
  }

  // Search query using text search on relevant fields
  const searchQuery = formattedSearchTerm
    ? sql`
      (
        to_tsvector('english', 
          coalesce(${properties.name}, '') || ' ' || 
          coalesce(${properties.completeAddress}, '')
        ) @@ to_tsquery('english', ${formattedSearchTerm})
      )
    `
    : undefined;

  const categoryFilter = category
    ? sql`${properties.detailedPropertyType} = ${category}`
    : undefined;

  const priceFilterQuery =
    priceFilter !== undefined && !isNaN(priceFilter)
      ? lte(properties.price, priceFilter.toString())
      : undefined;

  const userFilter = userId ? eq(properties.userId, userId) : undefined;

  // GeoSpatial filter for 50km radius if lat and lng are provided
  const radiusFilter =
    lat && lng
      ? sql`ST_DWithin(
          ${properties.location}, 
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326), 
          ${propertySearchDistance}
        )`
      : undefined;

  const filters = [
    searchQuery,
    categoryFilter,
    priceFilterQuery,
    userFilter,
    radiusFilter,
  ].filter(Boolean);
  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  // Query to fetch properties based on filters and pagination
  const propertyList = await db
    .select({
      id: properties.id,
      // name: properties.name,
      completeAddress: properties.completeAddress,
      price: properties.price,
      primaryImage: properties.primaryImage,
      location: properties.location,
      verified: properties.verified,
      createdAt: properties.createdAt,
      propertyFor: properties.propertyFor,
      sqFt: sql`${properties.length} * ${properties.width}`.as("sqFt"),
    })
    .from(properties)
    .where(whereClause)
    .limit(limit)
    .offset((page - 1) * limit)
    .orderBy((properties[sortBy] || properties.createdAt) as any);

  const totalProperties = await db
    .select({ count: count() })
    .from(properties)
    .where(whereClause);

  return {
    properties: propertyList,
    pagination: {
      total: totalProperties[0]?.count || 0,
      limit,
      page,
    },
  };
};
