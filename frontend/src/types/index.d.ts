import { alertVariants } from "@/components/ui/alert";
import { propertySchema, pSchema } from "@/zodSchema/propertySchema";
import { VariantProps } from "class-variance-authority";
import { z } from "zod";
import { type ClientUploadedFileData } from "uploadthing/types";
import { propertyFormContent } from "@/content/propertyFormContent";
import { searchPropertiesSchema } from "@/zodSchema/searchSchema";

export type AlertVarientT = VariantProps<typeof alertVariants>["variant"];

export type PageProps = {
  params: { [key: string]: string };
  searchParams: SearchParams;
};

export type SearchParams = {
  [key: string]: string | number | boolean | undefined;
};

export type SearchParamsPromise = Promise<{ [key: string]: string }>;
export type ParamsPromise = Promise<{ [key: string]: string }>;

export type PagePropsPromise = {
  params: ParamsPromise;
  searchParams: SearchParamsPromise;
};

export type Children = {
  children: React.ReactNode;
};

export type PropertyFormSchemaT = z.infer<typeof propertySchema>;
// export type DetailedPropertyType = PropertyFormSchemaT["detailedPropertyType"];
// export type BhkTypeE = PropertyFormSchemaT["bhk"];

export type AddPropertyFormConditionRendering = {
  [key in keyof PropertyFormSchemaT]?: key extends "propertyDetails"
    ? {
        bhk?: {
          dependsOn: () => boolean;
        };
      }
    : {
        dependsOn: () => boolean;
      };
};

export type FileUploaderDropzoneT = {
  files: (File | string)[];
  onValueChange: (value: FileUploaderDropzoneT["files"]) => void;
  fileMessage?: string;
};

export type SignatureReturnT = {
  timestamp: number;
  upload_preset: string;
  source: string;
  signature: string;
};

export type UploadedFile<T = unknown> = ClientUploadedFileData<T>;

export type PropertyFormContentKey = keyof typeof propertyFormContent;

export type PSchemaT = z.infer<typeof pSchema>;

export type SearchPropertiesSchemaT = z.infer<typeof searchPropertiesSchema>;

export type RevalidationType = "tag" | "path";

export type FunctionRuntimePlaceT = "client" | "server";

export type PaginationProps = {
  // currentPage: number;
  total: number;
  limit: number;
  page: number;
  currentPage: number;
};
