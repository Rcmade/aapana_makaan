import { getPropertiesAction } from "@/action/searchProperty";
import { createQueryString } from "@/lib/utils/stringUtils";
import {type PagePropsPromise } from "@/types";
import React from "react";
import PropertyPagination from "@/components/pagination/Pagination";
import PropertyCard from "@/components/card/PropertyCard";
import SearchPropertyMap from "@/components/maps/SearchPropertyMap";
import SearchPageSearchInput from "@/components/inputs/SearchPageSearchInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Page = async ({ searchParams }: PagePropsPromise) => {
  const searchParamsAwait = await searchParams;

  const { pagination, properties } = await getPropertiesAction(
    createQueryString(searchParamsAwait),
  );

  return (
    <>
      <div className="relative flex flex-col-reverse gap-6 md:grid md:grid-cols-2">
        {properties.length > 0 && (
          <div className="max-h-fit md:sticky md:top-0">
            <SearchPropertyMap
              properties={properties}
              pagination={pagination}
            />
          </div>
        )}
        <div>
          <SearchPageSearchInput
            searchParams={searchParamsAwait}
            pagination={pagination}
          />
          {properties.length === 0 ? (
            <Alert variant="default" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No properties found</AlertTitle>
              <AlertDescription>
                Try adjusting your search criteria to find more properties.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {properties.map((property) => (
                <PropertyCard
                  target="_blank"
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {pagination && properties.length > 0 && (
        <div className="mt-8">
          <PropertyPagination
            pagination={pagination}
            searchParams={searchParamsAwait}
            navigationPath="/search"
          />
        </div>
      )}
    </>
  );
};

export default Page;
