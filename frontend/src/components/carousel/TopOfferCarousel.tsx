"use client";
import React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type TopOfferPropertyResponseT } from "@/types/apiResponse";
import PropertyCard from "@/components/card/PropertyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarouselDotButton, { useDotButton } from "../buttons/CarouselDotButton";
import { cn } from "@/lib/utils";

interface TopOfferCarouselProps extends TopOfferPropertyResponseT {}
const TopOfferCarousel = ({ properties }: TopOfferCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);
  return (
    <div>
      <Carousel setApi={setApi} className="space-y-4">
        <div className="my-4 flex w-full justify-between">
          <h1 className="text-3xl font-semibold">Top Offers</h1>
          <div className="flex items-center gap-4">
            <CarouselPrevious
              showDisableLoaders={false}
              className="static translate-y-0 border-primary/30"
              Ic={ChevronLeft}
            />
            <CarouselNext
              showDisableLoaders={false}
              className="static translate-y-0 border-primary/30"
              Ic={ChevronRight}
            />
          </div>
        </div>
        <CarouselContent className="gap-4">
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <CarouselDotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              // className={"embla__dot".concat(
              //   index === selectedIndex ? "embla__dot--selected" : "",
              // )}
              className={cn(
                "h-3 w-3 rounded-full border border-primary/30 bg-accent",
                index === selectedIndex
                  ? "border-destructive bg-destructive"
                  : "",
              )}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default TopOfferCarousel;
