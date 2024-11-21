import AddUpdatePropertyForm from "@/components/form/_AddUpdatePropertyForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <AddUpdatePropertyForm />
    </Suspense>
  );
};

export default page;
