"use client";

import {type SearchParams } from "@/types";
import React from "react";
import AutoCompletePlaceSearchInput from "./AutoCompletePlaceSearchInput";
import { usePropertySearchForm } from "@/hooks/usePropertySearchForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FilterIcon,
  MapPin,
  Search,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react";
import { detailedPropertyType } from "@/zodSchema/propertySchema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { type SearchPropertyResponseT } from "@/types/apiResponse";
interface SearchPageSearchInputProps {
  searchParams: SearchParams;
  pagination: SearchPropertyResponseT["pagination"];
}

const SearchPageSearchInput = ({
  searchParams,
  pagination,
}: SearchPageSearchInputProps) => {
  const { form, onSubmit } = usePropertySearchForm();

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:flex-row"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field: { onChange: _, ref: __, ...rest } }) => (
              <FormItem className="relative flex-1">
                <FormControl>
                  <AutoCompletePlaceSearchInput
                    isApiNeedToLoad
                    onChange={(a) => {
                      form.setValue("lat", a.lat);
                      form.setValue("lng", a.lng);
                      form.setValue("search", a.completeAddress);
                    }}
                    className="pl-8 pr-10"
                    type="search"
                    // autoFocus
                    {...rest}
                  />
                </FormControl>
                <span className="pointer-events-none absolute bottom-2 left-2">
                  <MapPin className="" />
                </span>
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute bottom-0 right-0 px-2"
                >
                  <Search />
                </Button>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="detailedPropertyType"
              render={({ field }) => (
                <FormItem className="flex flex-1">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-1 border-0 bg-transparent hover:bg-accent">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {detailedPropertyType.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button type="button" size="icon">
              <SlidersHorizontal className="size-4 rotate-90" />
            </Button>
          </div>
          {/* <Button type="submit" variant="destructive">
            Search <SearchIcon className="ml-2 h-4 w-4" />
          </Button> */}
        </form>
      </Form>

      <div>Showing {pagination.total} results</div>
    </div>
  );
};

export default SearchPageSearchInput;
