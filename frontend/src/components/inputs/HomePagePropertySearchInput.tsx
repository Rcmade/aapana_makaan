"use client";
import React from "react";
import { ChevronDown, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  searchParamsToObject,
} from "@/lib/utils/stringUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchPropertyRequestParamsT } from "@/types/apiResponse";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { detailedPropertyType } from "@/zodSchema/propertySchema";
import { Form } from "../ui/form";
import AutoCompletePlaceSearchInput from "./AutoCompletePlaceSearchInput";
import { handlePopoverOpenChange } from "@/lib/utils";
import { usePropertySearchForm } from "@/hooks/usePropertySearchForm";

const HomePagePropertySearchInput = () => {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  // const searchParamsObj: SearchPropertyRequestParamsT = searchParamsToObject(
  //   searchParams.toString(),
  // );

  const { form, onSubmit } = usePropertySearchForm();

  // const { push } = useRouter();

  // const form = useForm<SearchPropertiesSchemaT>({
  //   resolver: zodResolver(searchPropertiesSchema),
  //   defaultValues: {
  //     detailedPropertyType: searchParamsObj.category || "",
  //     lat: searchParamsObj.lat || 0,
  //     lng: searchParamsObj.lng || 0,
  //     search: searchParamsObj.search || "",
  //   },
  // });

  // const onSubmit = async (data: SearchPropertiesSchemaT) => {
  //   const str = createQueryString({
  //     ...data,
  //     category: data?.detailedPropertyType,
  //   });
  //   push(`/search${str}`);
  // };

  const searchInput = form.watch("search");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-between gap-4 rounded-md bg-primary-foreground px-4 py-4 text-foreground shadow-sm md:flex-row"
      >
        <div className="flex w-full flex-col items-center md:flex-row">
          <Popover
            modal
            open={open}
            onOpenChange={(open) =>
              handlePopoverOpenChange(open, setOpen, ".pac-container")
            }
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full flex-1 justify-between border-0 bg-transparent px-3 hover:bg-accent md:w-[180px] md:px-4"
                key={form.getValues("search")}
              >
                <span>
                  {form.getValues("search")
                    ? `${form.getValues("search")?.substring(0, 20)}...`
                    : "Location"}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              onEscapeKeyDown={(e) => {
                e;
              }}
              align="start"
              className="mx-auto -ml-4 mt-4 w-[26rem] max-w-full p-0 px-2 md:px-0"
            >
              <AutoCompletePlaceSearchInput
                isApiNeedToLoad
                onChange={(a) => {
                  form.setValue("lat", a.lat);
                  form.setValue("lng", a.lng);
                  form.setValue("search", a.completeAddress);
                  setTimeout(() => {
                    setOpen(false);
                  }, 0);
                }}
                value={searchInput}
                autoFocus
              />
            </PopoverContent>
          </Popover>

          <span className="hidden h-6 w-[1px] bg-primary/20 md:block"></span>
          <Select
            onValueChange={(e) => form.setValue("detailedPropertyType", e)}
          >
            <SelectTrigger className="flex-1 border-0 bg-transparent hover:bg-accent md:w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {detailedPropertyType.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" variant="destructive" className="w-full">
          Search <SearchIcon className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default HomePagePropertySearchInput;
