import { searchPropertiesGetApi } from "@/constant/apiRoutes";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { SearchPropertyResponseT } from "@/types/apiResponse";

export const getPropertiesAction = async (
  searchParamsStr: string,
  authorization: RequestInit = {},
  apiPath = searchPropertiesGetApi,
) => {
  // const {
  //   limit = "10", // Default limit if not provided
  //   page = "1", // Default page if not provided
  //   search = "", // Search keyword from query params
  //   sortBy = "createdAt", // Sorting field, default to createdAt
  //   priceFilter = "", // Optional price filter
  //   lat = "", // lat for geolocation
  //   lng = "", // lng for geolocation
  // } = searchParams;
  // const category = pageParams.category || ""; // Handle category if missing

  // // Build query parameters
  // const params = new URLSearchParams({
  //   limit: String(limit),
  //   page: String(page),
  //   search: String(search),
  //   sortBy: String(sortBy),
  // });

  // if (priceFilter) {
  //   params.append("priceFilter", String(priceFilter));
  // }
  // if (lat && lng) {#Resumebuilder@1
  //   params.append("lat", String(lat));
  //   params.append("lng", String(lng));
  // }
  // if (category) {
  //   params.append("category", String(category));
  // }

  try {
    // Generate backend URL with query params
    const url = getBackendUrl(`${apiPath}${searchParamsStr}`);

    console.log({ url });

    // Fetch property data from backend
    const response: SearchPropertyResponseT = await fetcher(url, {
      next: {
        revalidate: 0,
      },
      ...authorization,
    });

    return response; // Return the fetched response
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties. Please try again.");
  }
};
