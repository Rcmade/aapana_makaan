import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {  Heart, MapPin, Phone, Mail, Square } from "lucide-react";
import { type PagePropsPromise } from "@/types";
import { getPropertyById } from "@/action/property";
import PropertyImageView from "./_PropertyImageView";
import {
  getBackendUrl,
  getGoogleMapsUrl,
  getInitials,
} from "@/lib/utils/stringUtils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ShareButton } from "@/components/buttons/ShareButton";
import { Metadata } from "next";
import ScheduleTourDialog from "@/components/dialogs/ScheduleTourDialog";

const page = async ({ params }: PagePropsPromise) => {
  const { propertyId } = await params;
  const property = await getPropertyById(propertyId);

  if (!property)
    return <p className="text-center text-2xl">No Property Found</p>;

  console.dir(
    { property },
    {
      depth: Infinity,
    },
  );
  return (
    <>
      <div className="space-y-4">
        <div className="mt-4 px-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">HomePage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/property-for">
                  {property.propertyFor}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{property.completeAddress}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* PropertyImages */}
        <PropertyImageView
          images={
            property?.images
              ? [{ url: property.primaryImage }, ...property.images]
              : []
          }
        />
        {/* Property Details */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="space-y-4 md:w-2/3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary">{property.propertyFor}</Badge>
                  <Badge variant="outline">
                    {property.detailedPropertyType}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold">
                  ₹{parseInt(property.price).toLocaleString()}
                </h1>
                <Link
                  href={getGoogleMapsUrl(property.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-8 w-8" />
                  <p>{property.completeAddress}</p>
                </Link>
              </div>
              <div className="flex gap-2">
                <ShareButton
                  url={getBackendUrl(`/p/${propertyId}`)}
                  title={`Check out this ${property.detailedPropertyType} for ${property.propertyFor} at ₹${parseInt(
                    property.price,
                  ).toLocaleString()}`}
                />

                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Square className="h-4 w-4" />
                <span>
                  {property.length} x {property.width} sq.ft
                </span>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="space-y-6 rounded-lg bg-muted p-6 md:w-2/6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={property.user?.image || ""} />
                <AvatarFallback>
                  {property.user ? getInitials(property.user.name) : ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {property.user?.name || "Unknown"}
                </h3>
                <p className="text-sm text-muted-foreground">Property Owner</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* <Button className="w-full" size="lg">
                Schedule a visit
              </Button> */}

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {property.user?.phone ? property.user.phone : "N/A"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {property.user?.email ? property.user.email : "N/A"}
                </Button>
                <ScheduleTourDialog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({
  params,
}: PagePropsPromise): Promise<Metadata> {
  const { propertyId } = await params;
  const property = await getPropertyById(propertyId);

  if (!property) return {};

  // Generate the property URL using getBackendUrl
  const propertyUrl = getBackendUrl(`/p/${propertyId}`);
  return {
    title: `${property.detailedPropertyType} for ${property.propertyFor} at ${property.completeAddress} - ₹${parseInt(property.price).toLocaleString()}`,
    description: `Discover this property listed for ${property.propertyFor}. Located at ${property.completeAddress}, priced at ₹${parseInt(
      property.price,
    ).toLocaleString()}. Schedule a visit today!`,
    openGraph: {
      title: `${property.detailedPropertyType} for ${property.propertyFor} - ₹${parseInt(property.price).toLocaleString()}`,
      description: `Located at ${property.completeAddress}. Schedule a visit today!`,
      url: propertyUrl, // Use the dynamic URL
      images: [
        {
          url: property.primaryImage,
          alt: `Image of property located at ${property.completeAddress}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.detailedPropertyType} for ${property.propertyFor} - ₹${parseInt(property.price).toLocaleString()}`,
      description: `Located at ${property.completeAddress}. Schedule a visit today!`,
      images: [property.primaryImage],
    },
  } satisfies Metadata;
}
