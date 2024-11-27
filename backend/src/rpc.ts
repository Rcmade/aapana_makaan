import {
  PropertyFetchParams,
  PropertyInquiriesT,
  ScheduleSchemaT,
} from "./types/index.d";
import { AppType } from ".";
import { hc, InferResponseType, InferRequestType } from "hono/client";
import {
  PropertiesSchemaT,
  UpsertUserT,
  BhkTypeE as BhkTypeBackendE,
  PropertyTypeE as PropertyTypeBackendE,
  DeleteMediaRequestT as DeleteMediaRequest,
} from "./types";
const client = hc<AppType>("http://localhost:4000");

// // products
// export type NewArrivalResponseT = InferResponseType<
//   (typeof client.api.products)["home-api"]["new-arrival"]["$get"]
// >;

// export type ProductResponseT = InferResponseType<
//   typeof client.api.products.$get
// >;

// export type ProductDetailsResponseT = InferResponseType<
//   (typeof client.api.products)["product-details"][":id"]["$get"]
// >;

// Uploads
export type SignatureResponseT = InferResponseType<
  (typeof client.api.uploads)["signature"]["$post"]
>;

export type SignatureRequestT = InferRequestType<
  typeof client.api.uploads.signature.$post
>;

// user
export type UpsertUserResponseT = InferResponseType<
  typeof client.api.user.$post
>;
export type UpsertUserRequestT = UpsertUserT;
// export type UpsertUserRequestT = InferRequestType<typeof client.api.user.$post>

export type UserBasicInfoResponseT = InferResponseType<
  (typeof client.api.user)["info"]["$get"]
>;

export type UserDetailedInfoResponseT = InferResponseType<
  typeof client.api.user.info.details.$get
>;

export type UserPropertyResponseT = InferResponseType<
  typeof client.api.user.properties.$get
>;

// Properties
export type AddPropertyResponseT = InferResponseType<
  (typeof client.api.property)["add-property"]["$post"]
>;
export type PropertyDetailsResponseT = InferResponseType<
  (typeof client.api.property.p)[":propertyId"]["$get"]
>;

export type AddPropertyRequestT = PropertiesSchemaT;

export type PropertyTypeE = PropertyTypeBackendE;
export type BhkTypeE = BhkTypeBackendE;

export type SearchPropertyResponseT = InferResponseType<
  typeof client.api.property.search.$get
>;

export type TopOfferPropertyResponseT = InferResponseType<
  (typeof client.api.property)["top-offer"]["$get"]
>;

export type GetPropertyResponseT = InferResponseType<
  (typeof client.api.property)["details"][":propertyId"]["$get"]
>;

export type SearchPropertyRequestParamsT = PropertyFetchParams;

// Media
export type DeleteMediaResponseT = InferResponseType<
  (typeof client.api.media)["delete-media"]["$post"]
>;
export type DeleteMediaRequestT = Omit<DeleteMediaRequest, "userId">;

// ScheduleTour
export type ScheduleTourResponseT = InferResponseType<
  (typeof client.api)["schedule-tour"]["create-update-tour"]["$post"]
>;
export type ScheduleTourRequestT = ScheduleSchemaT;

// InquiryMessage
export type InquiryMessageResponseT = InferResponseType<
  (typeof client.api)["schedule-tour"]["create-update-property-inquiry-message"]["$post"]
>;
export type InquiryMessageRequestT = PropertyInquiriesT;
