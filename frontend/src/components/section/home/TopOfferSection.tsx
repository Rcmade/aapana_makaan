import { getTopOfferProperties } from "@/action/property";
import TopOfferCarousel from "@/components/carousel/TopOfferCarousel";
import React, { Suspense } from "react";

const TopOfferSection = () => {
  return (
    <Suspense>
      <TopOfferSectionSuspense />
    </Suspense>
  );
};

export default TopOfferSection;

const TopOfferSectionSuspense = async () => {
  const data = await getTopOfferProperties();
  return <TopOfferCarousel properties={data.properties} />;
};
