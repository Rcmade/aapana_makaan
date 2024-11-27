import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import {
  createQueryString,
  searchParamsToObject,
} from "@/lib/utils/stringUtils";
import { type SearchPropertiesSchemaT } from "@/types";
import { searchPropertiesSchema } from "@/zodSchema/searchSchema";
import { SearchPropertyRequestParamsT } from "@/types/apiResponse";

export const usePropertySearchForm = () => {
  const searchParams = useSearchParams();
  const searchParamsObj: SearchPropertyRequestParamsT = searchParamsToObject(
    searchParams.toString(),
  );

  const { push } = useRouter();

  const form = useForm<SearchPropertiesSchemaT>({
    resolver: zodResolver(searchPropertiesSchema),
    defaultValues: {
      detailedPropertyType: searchParamsObj.category || "",
      lat: searchParamsObj.lat || 0,
      lng: searchParamsObj.lng || 0,
      search: searchParamsObj.search || "",
    },
  });

  const onSubmit = async (data: SearchPropertiesSchemaT) => {
    const str = createQueryString({
      ...data,
      category: data?.detailedPropertyType,
    });
    push(`/search${str}`);
  };

  return { form, onSubmit };
};
