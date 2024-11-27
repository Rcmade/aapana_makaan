"use client";
import { cn } from "@/lib/utils";
import { type GetPropertyResponseT } from "@/types/apiResponse";
import { CircleDot } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface PropertyImageViewProps {
  images: GetPropertyResponseT["images"];
}
const PropertyImageView = ({ images }: PropertyImageViewProps) => {
  const [selectedImage, setSelectedImage] = useState({
    ...images[0],
    index: 0,
  });

  return (
    <div className="relative flex flex-col gap-6 md:flex-row">
      {/* Main Image */}
      <div className="md:sticky top-0 max-h-fit md:w-2/3">
        <Image
          src={selectedImage?.url || ""}
          alt="Property"
          height={486}
          width={709}
          className="min-w-full rounded-3xl object-contain"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="scrollbar overflow-auto md:w-2/6">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-2">
          {images.map((image, index) => (
            <div
              role="button"
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onClick={() => {
                setSelectedImage({ ...image, index });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src={image?.url || ""}
                alt={`Property view ${index + 2}`}
                fill
                className={cn(
                  "object-cover transition-opacity hover:opacity-60",
                  selectedImage.index === index && "opacity-60",
                )}
              />

              {selectedImage.index === index && (
                <span className="absolute left-2 top-2 z-10 flex size-3 items-center justify-center rounded-full bg-accent backdrop-blur-md md:left-4 md:top-4 md:size-5">
                  <CircleDot className="size-2 md:size-4" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyImageView;
