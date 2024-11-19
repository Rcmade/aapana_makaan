import { z } from "zod";

export const searchPropertiesSchema = z.object({
  search: z.string().optional(),
  detailedPropertyType: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
