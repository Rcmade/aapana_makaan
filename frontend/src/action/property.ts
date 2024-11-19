import "server-only"
import {
  getPropertyDetailsGetApi,
  getUserPropertiesGetApi,
} from "@/constant/apiRoutes";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import {
  PropertyDetailsResponseT,
  UserPropertyResponseT,
} from "@/types/apiResponse";
import { headers } from "next/headers";

export const getUserProperties =
  async (): Promise<UserPropertyResponseT | null> => {
    try {
      const header = await headers();
      const data: UserPropertyResponseT = await fetcher(
        `${getBackendUrl(getUserPropertiesGetApi)}`,
        {
          headers: header,
          next: {
            revalidate: 60 * 5,
            tags: [getUserPropertiesGetApi],
          },
        },
      );
      return data;
    } catch (error) {
      console.error("Error fetching user properties", error);
      return [];
    }
  };

export const getUserPropertyDetails = async (
  propertyId: string,
): Promise<PropertyDetailsResponseT | null> => {
  try {
    const header = await headers();
    const data: PropertyDetailsResponseT = await fetcher(
      `${getBackendUrl(getPropertyDetailsGetApi)}/${propertyId}`,
      {
        headers: header,
        next: {
          revalidate: 0,
          tags: [getPropertyDetailsGetApi],
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching property details", error);
    return null;
  }
};
