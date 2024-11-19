import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BhkTypeE } from "@/types/apiResponse";

interface BhkTypeTabsProps {
  onChange: (value: BhkTypeE) => void;
  disabled?: boolean;
  defaultValue?: BhkTypeE;
}
const BhkTypeTabs = ({ onChange, ...rest }: BhkTypeTabsProps) => {
  return (
    <ToggleGroup
      {...rest}
      defaultValue={rest.defaultValue as unknown as string}
      onValueChange={(value) => onChange(value as BhkTypeE)}
      type="single"
      className="gap-4"
    >
      {propertyTabContent.map((tab, index) => (
        <ToggleGroupItem
          className="aspect-square border py-16"
          value={tab.title!}
          aria-label={`Toggle ${tab.title}`}
          key={index}
        >
          {tab.title}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export const propertyTabContent: {
  title: BhkTypeE;
}[] = [
  {
    title: "1 BHK",
  },
  {
    title: "2 BHK",
  },
  {
    title: "3 BHK",
  },
  {
    title: "3+ BHK",
  },
];
export default BhkTypeTabs;
