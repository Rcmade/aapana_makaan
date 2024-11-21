import { searchPropertiesGetApi } from "@/constant/apiRoutes";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { SearchPropertyResponseT } from "@/types/apiResponse";

export const getPropertiesAction = async (
  searchParamsStr: string,
  authorization: RequestInit = {},
  apiPath = searchPropertiesGetApi,
) => {

  try {
    // Generate backend URL with query params
    const url = getBackendUrl(`${apiPath}${searchParamsStr}`);

    // console.log({ url });

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
    return {
      properties: [],
      pagination: {
        total: 0,
        limit: 0,
        page: 0,
      },
    };
    // throw new Error("Failed to fetch properties. Please try again.");
  }
};
