"use server";

import { auth, signOut } from "@/config/authConfig";

import { getUserDetailsInfoGetApi, getUserPropertiesGetApi } from "@/constant/apiRoutes";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { type RevalidationType } from "@/types";
import { UserDetailedInfoResponseT } from "@/types/apiResponse";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export const currentUserDetails =
  async (): Promise<UserDetailedInfoResponseT | null> => {
    try {
      const header = await headers();
      const data = await fetcher(`${getBackendUrl(getUserDetailsInfoGetApi)}`, {
        headers: header,
        next: {
          revalidate: 60 * 5,
          tags: [getUserDetailsInfoGetApi],
        },
      });
      return data as UserDetailedInfoResponseT;
    } catch (error: any) {
      console.error("Error fetching user details", error);
      return null;
    }
  };

export const currentUser = async () => {
  const user = await auth();
  return user?.user;
};

const revalidateUserApis = [
  getUserDetailsInfoGetApi,
  getUserPropertiesGetApi,
] as const;

export type RevalidateUserApiType = (typeof revalidateUserApis)[number];
export type RevalidateApiInput =
  | RevalidateUserApiType
  | RevalidateUserApiType[]
  | "all";
export const revalidateUser = async (
  revalidateApi: RevalidateApiInput = "all",
  type: RevalidationType = "tag",
) => {
  if (revalidateApi === "all") {
    // Revalidate all APIs
    for (const api of revalidateUserApis) {
      type === "tag" ? revalidateTag(api) : revalidatePath(api);
    }
  } else if (Array.isArray(revalidateApi)) {
    // Revalidate each API in the array
    for (const api of revalidateApi) {
      type === "tag" ? revalidateTag(api) : revalidatePath(api);
    }
  } else {
    // Revalidate a single API
    type === "tag"
      ? revalidateTag(revalidateApi)
      : revalidatePath(revalidateApi);
  }
};

export const logout = async () => {
  await signOut();
  await revalidateUser("all");
};
