import {type PageProps } from "@/types";
import axios from "axios";

export const createQueryString = (
  searchParams: PageProps["searchParams"],
  changeParams?: PageProps["searchParams"],
): string => {
  if (changeParams) {
    searchParams = { ...searchParams, ...changeParams };
  }
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value.toString());
    }
  });

  if (params.toString() === "") {
    return "";
  }
  return `?${params.toString()}`;
};

export function searchParamsToObject(
  searchString: string,
  changeParams?: PageProps["searchParams"],
) {
  const params = new URLSearchParams(searchString);

  // Add or replace parameters from changeParams
  if (changeParams) {
    for (const [key, value] of Object.entries(changeParams)) {
      params.set(key, String(value));
    }
  }

  // Convert params back to an object
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    if (value) {
      result[key] = value;
    }
  });

  return result;
}

export function isValidObjectId(id: string) {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}

export const getBackendUrl = (route: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${route?.startsWith("/") ? route : `/${route}`}`;
};

export const getFrontedApiUrl = (route: string) => {
  return `${process.env.NEXT_PUBLIC_URL}${route?.startsWith("/") ? route : `/${route}`}`;
};

export function getAxiosErrorMessage(error: any): { error: string } {
  const isObj = typeof error?.response?.data === "object";
  // Check if it's an Axios error
  if (axios.isAxiosError(error)) {
    const errStr = String(
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.response?.data,
    );
    const err = {
      ...(isObj ? error.response?.data : {}),
      error: errStr === "undefined" ? undefined : errStr,
    };
    return err;
  }

  return {
    error: String(error?.error || "An error occurred"),
  };
}

export function buildCookieString(cookies: Record<string, string>): string {
  return Object.entries(cookies)
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");
}

export const getProductNavigateString = (
  categoryName: string,
  productId: string,
) => {
  return `/shop/${categoryName}/${productId}`;
};

export const getAdminProductNavigateString = (productId: string) => {
  return `/admin/dashboard/products/${productId}`;
};

export const getInitials = (name: string | undefined) => {
  if (!name) return "U"; // Default fallback for missing names
  const [firstName, lastName] = name.trim().split(" ");
  return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
};

export const getCallbackUrl = (route: string) => {
  const searchParams = new URLSearchParams(route);
  const callbackUrl = searchParams.get("callbackUrl") || "";
  searchParams.delete("callbackUrl");
  return `/${callbackUrl}?${searchParams.toString()}`;
};

/**
 * Generates a Google Maps URL for a given location.
 *
 * @param location - An object containing latitude (y) and longitude (x).
 * @returns The full URL string for the Google Maps location.
 */
export function getGoogleMapsUrl(location: {
  x: number; // Longitude
  y: number; // Latitude
}): string {
  const { x: longitude, y: latitude } = location;

  // if (!latitude || !longitude) {
  //   throw new Error(
  //     "Invalid location data: Latitude and Longitude are required.",
  //   );
  // }

  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}


