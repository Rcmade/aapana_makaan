import { getUserInfoGetApi } from "@/constant/apiRoutes";
import { fetcher } from "@/lib/utils/apiUtils";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { type UserBasicInfoResponseT } from "@/types/apiResponse";
import useSWR from "swr";
import { useAuthorization } from "./useAuthorization";

export const useUserInfo = () => {
  const { authorization } = useAuthorization();

  const { data, mutate, ...rest } = useSWR<UserBasicInfoResponseT>(
    authorization ? getBackendUrl(getUserInfoGetApi) : null, // Fetch only if authorization exists
    (url) => fetcher(url, { headers: { authorization: authorization || "" } }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    },
  );

  // Function to invalidate the cache and remove data
  const invalidateUserInfo = () => {
    mutate(null, { revalidate: false }); // Set cached data to null without revalidation
  };

  // Function to update specific fields in user data without refetching
  const updateUserInfo = (updatedData: Partial<UserBasicInfoResponseT>) => {
    mutate((currentData) => {
      if (!currentData) return null;
      return { ...currentData, ...updatedData };
    }, false); // Set `revalidate` to false to avoid refetching
  };

  return {
    data: data,
    updateUserInfo,
    invalidateUserInfo, // Expose the function for use
    ...rest,
  };
};
