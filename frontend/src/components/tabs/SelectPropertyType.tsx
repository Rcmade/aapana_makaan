import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Building, House, LandPlot, LucideIcon } from "lucide-react";
import { PropertyTypeE } from "@/types/apiResponse";

interface SelectPropertyTypeProps {
  onChange: (value: PropertyTypeE) => void;
  disabled?: boolean;
  defaultValue?: PropertyTypeE;
}
const SelectPropertyType = ({ onChange, ...rest }: SelectPropertyTypeProps) => {
  return (
    <ToggleGroup
      {...rest}
      onValueChange={onChange}
      type="single"
      className="gap-8"
    >
      {propertyTabContent.map((tab, index) => (
        <ToggleGroupItem
          className="aspect-square border py-16"
          value={tab.title}
          aria-label={`Toggle ${tab.title}`}
          key={index}
        >
          <span>
            <tab.Icon className="size-20" />
            <span className="text-sm">{tab.title}</span>
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export const propertyTabContent: {
  title: PropertyTypeE;
  Icon: LucideIcon;
}[] = [
  {
    title: "Flat",
    Icon: Building,
  },
  {
    title: "House",
    Icon: House,
  },
  {
    title: "Plot",
    Icon: LandPlot,
  },
];
export default SelectPropertyType;
