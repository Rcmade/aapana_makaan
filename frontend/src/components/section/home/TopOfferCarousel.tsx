"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TopOfferPropertyResponseT } from "@/types/apiResponse";
import PropertyCard from "@/components/card/PropertyCard";

interface TopOfferCarouselProps extends TopOfferPropertyResponseT {}
const TopOfferCarousel = ({ properties }: TopOfferCarouselProps) => {
  return (
    <div>
      <Carousel>
        <div className="my-2 flex w-full justify-between">
          <h1 className="text-3xl font-semibold">Top Offers</h1>
          <div className="flex items-center gap-4">
            <CarouselPrevious
              showDisableLoaders={false}
              className="static translate-y-0"
            />
            <CarouselNext
              showDisableLoaders={false}
              className="static translate-y-0"
            />
          </div>
        </div>
        <CarouselContent className="gap-4">
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="h-56 basis-full bg-red-500 md:basis-1/3"
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopOfferCarousel;
