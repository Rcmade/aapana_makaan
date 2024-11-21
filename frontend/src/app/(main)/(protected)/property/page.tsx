import { currentUserDetails } from "@/action/currentUser";
import UserPhoneButton from "@/components/buttons/UserPhoneButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { webName } from "@/constant";
import { getRelativeTime } from "@/lib/utils/dateUtils";
import { CheckCircle, User } from "lucide-react";
import Image from "next/image";
import UserProperty from "./_UserProperty";

export default async function Page() {
  const userDetails = await currentUserDetails();
  return (
    <div className="py-8">
      <Image
        src="/images/cover-image.png"
        alt="Cover Image"
        width={1920}
        height={340}
        className="object-cover"
      />
      <Card className="bg-primary-foreground text-primary">
        <CardHeader className="flex flex-col items-start gap-4 sm:flex-row">
          <div className="relative">
            {userDetails?.image ? (
              <Image
                src={userDetails?.image}
                alt="Profile photo"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            ) : (
              <User className="size-20" />
            )}
            <Badge className="absolute -right-2 -top-2 gap-1 bg-teal-500 font-normal text-white">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-semibold">
                {userDetails?.name || "Unknown"}
              </h2>
              {/* <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {userDetails?.phone || "Not added"}
                </span>
              </Button>
            </div> */}
              {userDetails?.id && (
                <UserPhoneButton
                  id={userDetails?.id}
                  phone={userDetails?.phone || null}
                />
              )}
            </div>
            {/* <div className="text-sm text-muted-foreground">
            <span>New York, Brooklyn</span>
            <span className="mx-2">•</span>
            <span>Imperial Property Agency</span>
          </div> */}
            {/* <p className="pt-2 text-sm text-muted-foreground">
            Extensive experience in rentals and a vast database means I can
            quickly find the options that are right for you. Looking for a
            seamless and exciting rental experience? Contact me today - I
            promise it won&apos;t be boring! Your perfect home is just a call
            away.
          </p> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-between gap-4 border-t pt-4">
            <div className="space-y-1">
              <p className="text-2xl font-semibold">
                {getRelativeTime(
                  userDetails?.createdAt || new Date().toISOString(),
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Works with {webName}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-semibold">
                {userDetails?.propertyCount}
              </p>
              <p className="text-sm text-muted-foreground">
                Properties published
              </p>
            </div>
            {/* <div className="space-y-1">
            <p className="text-2xl font-semibold">12</p>
            <p className="text-sm text-muted-foreground">Properties sold</p>
          </div> */}
            {/* <div className="space-y-1">
            <div className="flex items-center gap-1 text-2xl font-semibold">
              4.9
              <Star className="h-5 w-5 fill-primary text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Finder overall rating
            </p>
          </div> */}
          </div>
          {/* <p className="mt-4 text-sm text-muted-foreground">
          Last visited 2 hours ago
        </p> */}
        </CardContent>
      </Card>
      <UserProperty />
    </div>
  );
}
