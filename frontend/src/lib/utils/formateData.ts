import { PropertyFormSchemaT } from "@/types";

export const extractAddressComponents = (
  place: any,
  latLng: { lat: number; lng: number },
): PropertyFormSchemaT["address"] => {
  return place.address_components.reduce(
    (acc: any, curr: any) => {
      if (curr.types.includes("street_number")) {
        acc.streetNumber = curr.long_name;
      }
      if (curr.types.includes("route")) {
        acc.street = curr.long_name;
      }
      if (curr.types.includes("locality")) {
        acc.city = curr.long_name;
      }
      if (curr.types.includes("administrative_area_level_1")) {
        acc.state = curr.long_name;
      }
      if (curr.types.includes("country")) {
        acc.country = curr.long_name;
      }
      if (curr.types.includes("postal_code")) {
        acc.postalCode = curr.long_name;
      }
      return acc;
    },
    {
      streetNumber: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      lat: latLng.lat,
      lng: latLng.lng,
      completeAddress: place.formatted_address || "",
    },
  );
};

export const separateFilesAndStrings = (fileOrStr: (string | File)[]) => {
  const { file, strUrl } = fileOrStr.reduce(
    (acc, image) => {
      if (image instanceof File) {
        acc.file.push(image);
      } else if (typeof image === "string") {
        acc.strUrl.push(image);
      }
      return acc;
    },
    { file: [] as File[], strUrl: [] as string[] },
  );

  return { file, strUrl };
};
