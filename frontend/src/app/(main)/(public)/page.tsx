import ActionSection from "@/components/section/home/ActionSection";
import HeroSection from "@/components/section/home/HeroSection";
import TopOfferSection from "@/components/section/home/TopOfferSection";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6 pb-8">
      <HeroSection />
      <ActionSection />
      <TopOfferSection />
    </div>
  );
};

export default page;
