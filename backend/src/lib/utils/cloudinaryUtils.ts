import { CLOUDINARY_REGEX } from "@/constants";

export const getCloudinaryId = (link: string) => {
  const parts = CLOUDINARY_REGEX.exec(link);
  return parts && parts.length > 2 ? parts[parts.length - 2] : link;
};
