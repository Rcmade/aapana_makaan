import { getUserProperties } from "@/action/property";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const UserProperty = async () => {
  const properties = await getUserProperties();
  return (
    <div className="flex flex-wrap justify-between gap-y-8 py-4">
      {(properties || []).map((p) => (
        <Card key={p.id} className="relative max-w-xs overflow-hidden">
          <div className="">
            {/* <div className="absolute left-3 top-3 z-20 flex gap-2">
          <Badge className="bg-teal-600 hover:bg-teal-700">Featured</Badge>
          <Badge className="bg-pink-600 hover:bg-pink-700">New</Badge>
        </div> */}
            <div className="relative overflow-hidden">
              <Image
                alt={p.id}
                className="object-contain"
                height="400"
                src={p.primaryImage}
                width="600"
              />
            </div>
          </div>
          <CardContent className="space-y-4 p-4">
            <Badge
              variant="secondary"
              className="bg-zinc-800 text-white hover:bg-zinc-700"
            >
              For {p.propertyFor}
            </Badge>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">₹{p.price}</h3>
              <p className="text-lg">{p.completeAddress}</p>
            </div>
            <div className="text-lg font-semibold text-zinc-400">
              {p.length * p.width} sq ft
            </div>
            {/* <div className="flex gap-4 text-zinc-400">
          <div className="flex items-center gap-2">
            <BedDouble className="h-5 w-5" />
            <span>2</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5" />
            <span>1</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            <span>1</span>
          </div>
        </div> */}
          </CardContent>
          <Link href={`/property/${p.id}`} className="absolute inset-0"></Link>
        </Card>
      ))}
    </div>
  );
};

export default UserProperty;
