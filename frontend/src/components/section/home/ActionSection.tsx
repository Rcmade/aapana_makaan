import Image from "next/image";
import React from "react";

const ActionSection = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="scrollbar relative flex max-h-fit w-full max-w-full snap-x snap-mandatory justify-between gap-4 overflow-x-auto md:h-[28.75rem]">
        {actionSectionContent.map((img) => (
          <div
            key={img.img}
            className="relative max-h-fit min-w-full max-w-full snap-start overflow-hidden md:min-w-[300px]"
          >
            <Image
              src={img.img}
              alt={img.label}
              width={416}
              height={460}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionSection;
const actionSectionContent = [
  {
    img: "/images/BuyRealEstateCategoryCard.png",
    label: "Buy",
  },
  {
    img: "/images/SellRealEstateCategoryCard.png",
    label: "Sell",
  },
  {
    img: "/images/RentRealEstateCategoryCard.png",
    label: "Rent",
  },
];
