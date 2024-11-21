import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isNewlyListed } from "@/lib/utils/dateUtils";
import { SearchPropertyResponseT } from "@/types/apiResponse";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface PropertyCardProps {
  property: SearchPropertyResponseT["properties"][0];
}
const PropertyCard = ({ property }: PropertyCardProps) => {
  const isNew = isNewlyListed(property.createdAt);
  return (
    <Card key={property.id} className="relative overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={property.primaryImage}
            alt={property.completeAddress}
            layout="fill"
            className="object-contain"
          />

          <div className="absolute left-3 top-3 flex gap-2">
            {property.verified && (
              <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">
                <CheckCircle className="h-3 w-3 text-primary" />
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
      </CardHeader>
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
      <Link href={`/p/${property.id}`} className="absolute inset-0"></Link>
    </Card>
  );
};

export default PropertyCard;
