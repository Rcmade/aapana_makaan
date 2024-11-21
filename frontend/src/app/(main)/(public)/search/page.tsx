import { getPropertiesAction } from "@/action/searchProperty";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PagePropsPromise } from "@/types";
import React from "react";
import Container from "@/components/layouts/Container";
import PropertyPagination from "@/components/pagination/Pagination";
import PropertyCard from "@/components/card/PropertyCard";
const page = async ({ searchParams }: PagePropsPromise) => {
  const searchParamsAwait = await searchParams;

  const { pagination, properties } = await getPropertiesAction(
    createQueryString(searchParamsAwait),
  );

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {properties.map((property) => {
          return <PropertyCard key={property.id} property={property} />;
        })}
      </div>
      {pagination && (
        <div className="mt-8">
          <PropertyPagination
            pagination={pagination}
            searchParams={searchParamsAwait}
            navigationPath="/search"
          />
        </div>
      )}
    </Container>
  );
};

export default page;
