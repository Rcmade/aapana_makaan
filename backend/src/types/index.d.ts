import { orderItems, properties } from "@/db/schema";
import { addressSchema } from "@/zodSchema";
import { cartInput } from "@/zodSchema/cartSchema";
import {
  _orderAddressSchema,
  _orderItemsSchema,
} from "@/zodSchema/orderSchema";
import { paymentIntentRequest } from "@/zodSchema/paymentSchema";
import { upsertUserSchema, userSchema } from "@/zodSchema/userInfoSchema";
import { wishlistInput } from "@/zodSchema/wishListSchema";
import { z } from "zod";
import {} from "drizzle-orm";
import { propertiesSchema } from "@/zodSchema/propertiesSchema";
export type UploadFileT = {
  public_id: string;
  secure_url: string;
};

export type PaginationParams = {
  limit?: number;
  page?: number;
  search?: string;
  priceFilter?: number;
};

export type SubImage = {
  image: string | null;
};

export type PropertiesSchemaT = z.infer<typeof propertiesSchema>;
export type UpsertUserT = z.infer<typeof upsertUserSchema>;
export type PropertyTypeE = PropertiesSchemaT["detailedPropertyType"];
export type BhkTypeE = PropertiesSchemaT["bhk"];
export type UserRole = z.infer<typeof userSchema>["role"];
export type TempOrderRequestT = {
  shippingId: string;
  clientSecret: string;
  shippingMethodId: string;
};

export type OrderItemsT = {
  orderItemId: string;
  productId: string;
  name: string;
  qty: number;
  price: string;
  primaryImage: string;
};

export type DeleteMediaRequestT = {
  mediaUrlOrId: string;
  userId: string;
  propertyId?: string;
};

export type PropertyFetchParams = {
  limit?: number;
  page?: number;
  search?: string;
  priceFilter?: number;
  sortBy?: keyof typeof properties;
  category?: string;
  userId?: string;
  lat?: number;
  lng?: number;
};