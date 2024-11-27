import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isNewlyListed } from "@/lib/utils/dateUtils";
import { type SearchPropertyResponseT } from "@/types/apiResponse";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: SearchPropertyResponseT["properties"][0];
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}
const PropertyCard = ({ property, className, target }: PropertyCardProps) => {
  const isNew = isNewlyListed(property.createdAt);
  return (
    <Card
      key={property.id}
      className={cn("relative max-h-fit overflow-hidden", className)}
    >
      <div className="p-0">
        <div className="relative">
          {/* h-[18.75rem] */}
          <Image
            src={property.primaryImage}
            alt={property.completeAddress}
            height={300}
            width={438}
            className="mx-auto max-h-[18.75rem] max-w-full object-contain"
          />

          <div className="absolute left-3 top-3 flex gap-2">
            {property.verified && (
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium dark:text-primary-foreground">
                <CheckCircle className="h-3 w-3 text-primary dark:text-primary-foreground" />
                Verified
              </div>
            )}

            {isNew && (
              <Badge variant="destructive" className="rounded-md uppercase">
                {isNew}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <CardContent className="flex flex-col p-4">
        {property.propertyFor && (
          <Badge variant="secondary" className="w-fit rounded-md uppercase">
            {property.propertyFor}
          </Badge>
        )}
        <CardTitle className="mb-2 text-xl">
          ₹{parseFloat(property.price).toLocaleString("en-IN")}
        </CardTitle>
        <p className="mb-2 text-sm text-muted-foreground">
          {property.completeAddress}
        </p>
        <strong>{property.sqFt} sq.ft</strong>
      </CardContent>
      <Link
        href={`/p/${property.id}`}
        target={target}
        className="absolute inset-0"
      ></Link>
    </Card>
  );
};

export default PropertyCard;
