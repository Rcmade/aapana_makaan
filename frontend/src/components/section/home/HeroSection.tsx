import PropertySearchInput from "@/components/inputs/PropertySearchInput";
import Image from "next/image";
import React, { Suspense } from "react";

const HeroSection = () => {
  return (
    <div className="relative my-8">
      <div className="flex justify-between gap-8">
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex h-full min-h-32 flex-col items-center justify-center p-4 sm:p-8 md:min-h-64 md:py-2">
            <div className="space-y-4 p-4 md:static">
              <h1 className="text-3xl font-bold sm:text-3xl md:text-4xl lg:text-6xl">
                <span className="whitespace-nowrap">Easy way to find a </span>
                <br />
                <span className="whitespace-nowrap">perfect property</span>
              </h1>
              <p className="font-medium text-muted-foreground">
                We provide a complete service for the sale, purchase or rental
                of real estate.
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <Image
              src="/images/buy.png"
              alt="Buy"
              className="object-contain"
              width={768}
              height={328}
            />
          </div>
        </div>
        <div className="hidden h-full flex-col self-start sm:flex">
          <div>
            <Image
              src="/images/sell.png"
              alt="Buy"
              className="object-contain"
              width={306}
              height={443}
            />
          </div>
        </div>

        <div className="hidden h-full flex-col justify-center self-center sm:flex">
          <div>
            <Image
              src="/images/rent.png"
              alt="Buy"
              className="object-contain"
              width={438}
              height={446}
            />
          </div>
        </div>
      </div>

      <div className="md:absolute inset-0 md:inset-auto md:bottom-16 md:left-16">
        <Suspense>
          <PropertySearchInput />
        </Suspense>
      </div>
    </div>
  );
};

export default HeroSection;
