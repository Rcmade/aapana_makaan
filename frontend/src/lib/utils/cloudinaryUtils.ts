import { CLOUDINARY_REGEX, CLOUDINARY_UPLOAD_URL } from "@/constant";
import axios from "axios";
import { getSignature } from "./axiosUtils";

export const getCloudinaryId = (link: string) => {
  if (!link) return null;
  if (link.startsWith("blob")) return null;
  const parts = CLOUDINARY_REGEX.exec(link);
  return parts && parts.length > 2 ? parts[parts.length - 2] : link;
};

export const uploadToCloudinary = async (fileInfo: { files: string[] }) => {
  const signature = await getSignature();
  if (!signature) return [];

  const uploadPromises = fileInfo.files.map(async (file) => {
    const isCloudinaryFile = getCloudinaryId(file);
    if (isCloudinaryFile) return file;

    try {
      const fileBlob = await fetch(file).then((response) => response.blob());
      const formData = new FormData();
      formData.append("file", fileBlob);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("timestamp", signature.timestamp.toString());
      formData.append("upload_preset", signature.upload_preset);
      formData.append("source", signature.source);
      formData.append("signature", signature.signature);

      const { data } = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Failed to upload image to Cloudinary.");
      }
    } catch (error) {
      console.error("Upload failed for file:", file, error);
      return null; // Skip the failed upload
    }
  });

  // Wait for all uploads to complete
  const results = await Promise.all(uploadPromises);
  // Filter out any failed uploads (null results)
  return results.filter((url): url is string => url !== null);
};

