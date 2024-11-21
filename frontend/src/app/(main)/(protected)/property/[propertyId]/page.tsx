import { getUserPropertyDetails } from "@/action/property";
import AddUpdatePropertyForm from "@/components/form/_AddUpdatePropertyForm";
import { PagePropsPromise } from "@/types";
import React, { Suspense } from "react";

const page = async ({ params }: PagePropsPromise) => {
  const { propertyId } = await params;
  const property = await getUserPropertyDetails(propertyId);
  return (
    <Suspense>
      <AddUpdatePropertyForm initialValues={property} />
    </Suspense>
  );
};

export default page;
