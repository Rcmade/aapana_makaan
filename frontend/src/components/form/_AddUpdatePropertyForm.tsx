"use client";

import DefaultMaps from "@/components/maps/DefaultMaps";
import BhkTypeTabs from "@/components/tabs/BhkTypeTabs";
import SelectPropertyType from "@/components/tabs/SelectPropertyType";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/extension/file-uploader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { currentFormStateSearchParams } from "@/constant";
import { propertyFormContent } from "@/content/propertyFormContent";
import { extractAddressComponents } from "@/lib/utils/formateData";
import { type PropertyFormContentKey, type PSchemaT } from "@/types";
import { pSchema, pSchemaObj } from "@/zodSchema/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Marker } from "@react-google-maps/api";
import {
  ArrowRight,
  Circle,
  CircleArrowRightIcon,
  CircleCheckBig,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryUtils";
import {
  AddPropertyRequestT,
  AddPropertyResponseT,
  PropertyDetailsResponseT,
} from "@/types/apiResponse";
import axios from "axios";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { addPropertyPostApi } from "@/constant/apiRoutes";
import { useAuthorization } from "@/hooks/useAuthorization";
import { toast } from "sonner";
import { useUserInfo } from "@/hooks/useUserInfo";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DeleteMediaButton from "@/components/buttons/DeleteMediaButton";
import useMapLoader from "@/hooks/useMapLoader";
import AutoCompletePlaceSearchInput from "../inputs/AutoCompletePlaceSearchInput";

interface AddUpdatePropertyFormProps {
  initialValues?: PropertyDetailsResponseT;
}
const AddUpdatePropertyForm = ({
  initialValues,
}: AddUpdatePropertyFormProps) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const form = useForm<PSchemaT>({
    resolver: zodResolver(pSchema),
    defaultValues: {
      "property-type": {
        detailedPropertyType: initialValues?.detailedPropertyType,
        // detailedPropertyType: "",
      },
      location: {
        completeAddress: initialValues?.completeAddress || "",
        lat: initialValues?.location.lat || 0,
        lng: initialValues?.location.lng || 0,
        streetNumber: initialValues?.streetNumber || "",
        street: initialValues?.street || "",
        state: initialValues?.state || "",
        city: initialValues?.city || "",
        postalCode: initialValues?.postalCode || "",
        country: initialValues?.country || "",
      },
      photos: {
        images: initialValues?.primaryImage
          ? [initialValues.primaryImage, ...initialValues?.images]
          : [],
      },
      "property-details": {
        // size: 0,
        length: initialValues?.length || 0,
        width: initialValues?.width || 0,
      },

      price: {
        price: initialValues?.price ? +initialValues.price : 0,
      },
      "contact-info": {
        phone: initialValues?.phone || "",
        name: initialValues?.name || "",
      },
    },
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded } = useMapLoader();

  const { authorization } = useAuthorization();

  const { data: userInfoData, updateUserInfo } = useUserInfo();

  const currentFormState: PropertyFormContentKey = (searchParams.get(
    currentFormStateSearchParams,
  ) || "property-type") as PropertyFormContentKey;

  // Get the index of the current form state to compare with each item
  const contentKeys = Object.keys(
    propertyFormContent,
  ) as PropertyFormContentKey[];
  const currentIndex = contentKeys.indexOf(currentFormState);

  const detailedPropertyType = form.watch("property-type.detailedPropertyType");

  const handleNext = async () => {
    const isCurrentFormIsValidate = await form.trigger(currentFormState);
    if (isCurrentFormIsValidate) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < contentKeys.length) {
        const nextFormState = contentKeys[nextIndex];
        router.push(`?${currentFormStateSearchParams}=${nextFormState}`);
      } else {
        // form.handleSubmit(onSubmit)();
      }
    }
  };

  const handleUpdateFormAddress = (data: PSchemaT["location"]) => {
    form.setValue("location", data);
  };

  const updateAddressFromLatLng = (position: { lat: number; lng: number }) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const address = extractAddressComponents(results[0], position);
        handleUpdateFormAddress(address);
      }
    });
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    if (latLng) {
      const newPosition = { lat: latLng.lat(), lng: latLng.lng() };
      setMarkerPosition(newPosition);
      updateAddressFromLatLng(newPosition);
    }
  };

  const validateAllFields = async () => {
    let verified = true;
    for (let i = 0; i < contentKeys.length; i++) {
      const element = contentKeys[i];
      const isCurrentFormIsValidate = await form.trigger(element);
      if (!isCurrentFormIsValidate) {
        verified = false;

        router.push(`?${currentFormStateSearchParams}=${element}`);
        break;
      }
    }
    return verified;
  };

  const onSubmit = async (values: PSchemaT) => {
    try {
      const imgs = [...values.photos.images];
      const uploadedFiles = await uploadToCloudinary({ files: imgs });
      if (uploadedFiles) {
        const primaryImage = uploadedFiles[0];
        const images = uploadedFiles.slice(1);
        const formateData = {
          ...values["location"],
          ...values["contact-info"],
          ...values["price"],
          ...values["property-details"],
          ...values["property-type"],
          // location: values.location,
          // propertyType: values["property-type"].detailedPropertyType,
          price: values.price.price,
          // ...values["photos"],
          primaryImage,
          images: images,
        } satisfies AddPropertyRequestT;
        const { data } = await axios.post<AddPropertyResponseT>(
          getBackendUrl(addPropertyPostApi),
          formateData,
          {
            headers: {
              Authorization: authorization,
            },
          },
        );
        if (data?.message) {
          toast.success(data.message);
          updateUserInfo({
            propertyCount: (userInfoData?.propertyCount || 0) + 1,
          });
          router.push(`/property/${data.data.id}`);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(getAxiosErrorMessage(error).error);
    }
  };

  const location = form.watch("location");
  const latLng = {
    lat: location.lat || 22.719568,
    lng: location.lng || 75.857727,
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-x-24 gap-y-4 px-4 py-8 md:flex-row md:gap-y-0">
      <div className="scrollbar flex snap-x gap-4 overflow-x-auto py-2 md:flex-col">
        {contentKeys.map((key, index) => {
          const isValid = pSchemaObj[key].safeParse(
            form.getValues(key),
          ).success;
          const isCurrent = key === currentFormState;
          const isDisabled = (!isValid && index > currentIndex) || isCurrent;
          return (
            <Link
              key={key}
              href={
                isDisabled ? "#" : `?${currentFormStateSearchParams}=${key}`
              }
              className={`flex snap-center items-center gap-2 whitespace-nowrap ${
                isCurrent ? "font-bold" : ""
              } `}
              // ${!isValid && index > currentIndex ? "cursor-not-allowed opacity-50" : ""}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              {isCurrent ? (
                <CircleArrowRightIcon />
              ) : isValid ? (
                <CircleCheckBig />
              ) : (
                <Circle />
              )}
              {propertyFormContent[key].title}
            </Link>
          );
        })}
      </div>

      <Form {...form}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const isValidate = await validateAllFields();
            if (isValidate) form.handleSubmit(onSubmit)();
          }}
          className="space-y-8"
        >
          {currentFormState === "property-type" && (
            <>
              <FormField
                control={form.control}
                name="property-type.detailedPropertyType"
                render={({ field }) => (
                  <FormItem className="space-y-6">
                    <FormLabel isRequiredField className="px-0 text-2xl">
                      Property Type
                    </FormLabel>
                    <SelectPropertyType
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                    <FormDescription>
                      Which type of property do you want to sell?
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}

          {currentFormState === "location" && (
            <FormField
              control={form.control}
              name="location.completeAddress"
              render={({ field: { onChange: _, ...rest } }) => (
                <FormItem>
                 
                  <FormLabel isRequiredField>Property Address</FormLabel>
                  <FormControl key={rest.value}>
                    {isLoaded && (
                      <AutoCompletePlaceSearchInput
                        isApiNeedToLoad={false}
                        {...rest}
                        onChange={(data) => {
                          form.setValue("location", data); // Update the form field with the selected location data
                          const { lat, lng } = data;
                          if (lat && lng) {
                            const latLng = { lat, lng };
                            setMarkerPosition(latLng); // Update marker position on the map
                          }
                        }}
                        placeholder="Find Property Location"
                        disabled={isLoading}
                        onKeyDown={(e) =>
                          e.key === "Enter" && e.preventDefault()
                        }
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Enter the address of the property. We will use this
                    information to display the property on our map.
                  </FormDescription>

                  {isLoaded && (
                    <div className="overflow-hidden rounded-md">
                      <DefaultMaps
                        center={markerPosition || latLng}
                        onClick={handleMapClick}
                      >
                        <Marker position={markerPosition || latLng} />
                      </DefaultMaps>
                      <FormDescription>
                        Mark your property location in the map which will be
                        displayed in the property listing.
                      </FormDescription>
                    </div>
                  )}
                </FormItem>
              )}
            />
          )}
          {currentFormState === "photos" && (
            <>
              <FormField
                control={form.control}
                name="photos.images"
                render={({ field }) => (
                  <div className="space-y-6">
                    <FormItem className="w-full">
                      <FormLabel>Upload Properties Images</FormLabel>

                      <div className="flex flex-wrap items-center gap-4">
                        {(field.value || []).map((file, i) => {
                          return (
                            <div
                              key={`${i}-image-preview`}
                              className="relative max-w-fit"
                            >
                              <Image
                                src={file}
                                width={265}
                                height={265}
                                alt="Preview"
                              />
                              {i === 0 && (
                                <Badge className="absolute left-2 top-2">
                                  Cover Image
                                </Badge>
                              )}
                              <DeleteMediaButton
                                mediaUrlOrId={file}
                                propertyId={initialValues?.id}
                                authorization={authorization!}
                                onDelete={(deletedFile) => {
                                  field.onChange(
                                    field.value.filter(
                                      (f) => f !== deletedFile,
                                    ),
                                  );
                                }}
                                className="absolute right-2 top-2"
                              />
                            </div>
                          );
                        })}

                        <FormControl>
                          <FileUploader
                            value={(field.value || []).map((value) => ({
                              preview: value,
                            }))}
                            onValueChange={(e) => {
                              field.onChange(e.map((value) => value.preview));
                            }}
                            maxFileCount={10}
                            disabled={isLoading}
                            maxSize={5 * 1024 * 1024}
                            preview={false}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </>
          )}

          {currentFormState === "property-details" && (
            <>
              {detailedPropertyType !== "Plot" && (
                <FormField
                  control={form.control}
                  name="property-details.bhk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel isRequiredField className="px-0">
                        BHK
                      </FormLabel>
                      <BhkTypeTabs
                        defaultValue={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                      <FormDescription>
                        How many bedrooms, hall, and kitchen do you have?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="property-details.length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequiredField className="px-0">
                      Length
                      {detailedPropertyType && ` of ${detailedPropertyType}`} in
                      ft
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                        value={field.value || ""}
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      For example, if the length is 40 ft and the width is 15
                      ft, the area would be 600 sq  (calculated as 40 ft x 15
                      ft).
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="property-details.width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequiredField className="px-0">
                      Width
                      {detailedPropertyType && ` of ${detailedPropertyType}`} in
                      ft
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                        value={field.value || ""}
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      For example, if the length is 40 ft and the width is 15
                      ft, the area would be 600 sq  (calculated as 40 ft x 15
                      ft).
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {currentFormState === "price" && (
            <>
              <FormField
                control={form.control}
                name="price.price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequiredField className="px-0">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                        value={field.value || ""}
                        type="number"
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Enter the price you wish to sell this property for (in
                      INR). Note that our platform charges a <strong>2%</strong>{" "}
                      brokerage fee based on the total price.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}

          {currentFormState === "contact-info" && (
            <>
              <FormField
                control={form.control}
                name="contact-info.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequiredField className="px-0">
                      Your name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Please enter your name so that we can contact you.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact-info.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequiredField className="px-0">
                      Your phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        type="tel"
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Please enter your correct phone number so that we can
                      contact you.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-end">
            {currentIndex + 1 < contentKeys.length ? (
              <Button
                disabled={isLoading}
                size="lg"
                onClick={handleNext}
                type="button"
              >
                Next <ArrowRight />
              </Button>
            ) : (
              <Button disabled={isLoading} type="submit" size="lg">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddUpdatePropertyForm;
