import { PropertyFormSchemaT } from "@/types";

export const extractAddressComponents = (
  place: google.maps.places.PlaceResult,
  latLng: { lat: number; lng: number },
): PropertyFormSchemaT["address"] => {
  return place?.address_components?.reduce(
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
    } satisfies PropertyFormSchemaT["address"],
  );
};

// export const extractAddressComponents = (
//   place: google.maps.places.PlaceResult,
//   latLng: { lat: number; lng: number },
// ) => {
//   // Extract address components
//   const addressComponents = place.address_components || [];

//   // Extract individual components (you can adjust as needed)
//   const streetNumber =
//     addressComponents.find((component) =>
//       component.types.includes("street_number"),
//     )?.long_name || ""; // Default to empty string if not found

//   const street =
//     addressComponents.find((component) => component.types.includes("route"))
//       ?.long_name || "";

//   const city =
//     addressComponents.find((component) => component.types.includes("locality"))
//       ?.long_name || "";

//   const state =
//     addressComponents.find((component) =>
//       component.types.includes("administrative_area_level_1"),
//     )?.long_name || "";

//   const postalCode =
//     addressComponents.find((component) =>
//       component.types.includes("postal_code"),
//     )?.long_name || "";

//   const country =
//     addressComponents.find((component) => component.types.includes("country"))
//       ?.long_name || "";

//   // Construct the complete address in the desired format
//   const completeAddress = `${streetNumber ? `${streetNumber}, ` : ""}${street}, ${city}, ${state} ${postalCode}, ${country}`;

//   return {
//     streetNumber,
//     street,
//     city,
//     state,
//     postalCode,
//     country,
//     lat: latLng.lat,
//     lng: latLng.lng,
//     completeAddress, // Return the properly formatted address
//   };
// };

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

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {},
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`;
}