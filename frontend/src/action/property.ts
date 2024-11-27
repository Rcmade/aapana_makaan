import "server-only";
import {
  getUserPropertyDetailsGetAp,
  getTopOfferPropertyGetApi,
  getUserPropertiesGetApi,
  getPropertyDetailsGetApi,
} from "@/constant/apiRoutes";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import {
  GetPropertyResponseT,
  PropertyDetailsResponseT,
  TopOfferPropertyResponseT,
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
      `${getBackendUrl(getUserPropertyDetailsGetAp)}/${propertyId}`,
      {
        headers: header,
        next: {
          revalidate: 0,
          tags: [getUserPropertyDetailsGetAp],
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching property details", error);
    return null;
  }
};

export const getTopOfferProperties = async () => {
  try {
    const data: TopOfferPropertyResponseT = await fetcher(
      `${getBackendUrl(getTopOfferPropertyGetApi)}`,
      {
        next: {
          revalidate: 60 * 60 * 24,
          tags: [getTopOfferPropertyGetApi],
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching user properties", error);
    return {
      properties: [],
    };
  }
};

export const getPropertyById = async (propertyId: string) => {
  try {
    const url = `${getBackendUrl(getPropertyDetailsGetApi)}/${propertyId}`;
    const data: GetPropertyResponseT = await fetcher(url, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: [getPropertyDetailsGetApi],
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user properties", error);
    return null;
  }
};
