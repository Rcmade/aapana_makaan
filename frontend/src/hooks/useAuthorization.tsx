import { fetcher } from "@/lib/utils/apiUtils";
import useSWR, { mutate } from "swr";

// Authorization hook
export const useAuthorization = () => {
  const { data, ...rest } = useSWR<{ Authorization: string }>(
    "/api/session",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // Cache data for 5 minutes
    },
  );

  // Function to invalidate the cache and remove data
  const invalidateAuthorization = () => {
    mutate("/api/session", null, { revalidate: false }); // Set cached data to null and don't revalidate
  };

  return {
    authorization: data?.Authorization || null,
    invalidateAuthorization, // Expose the function for use
    ...rest,
  };
};
