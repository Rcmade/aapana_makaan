import cloudinaryConfig from "@/config/cloudinaryConfig";
import { getCloudinaryId } from "@/lib/utils/cloudinaryUtils";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
// import { getCloudinaryId } from "@/lib/utils/cloudinaryUtils";
// import { generateSHA1, generateSignature } from "@/lib/utils/cryptoUtils";

/**
 * Service class for interacting with Cloudinary.
 */
export class CloudinaryService {
  /**
   * Signs the upload request with Cloudinary API secret.
   * @param {Record<string, string>} paramsToSign - Parameters to be signed.
   * @returns {string} - The signature of the signed request.
   */
  async signUploadRequest(paramsToSign: Record<string, string>) {
    // Sign the request using Cloudinary API secret
    // console.log(process.env.CLOUDINARY_API_SECRET);
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return signature;
  }

  
  async deleteCloudinaryFile(fileUrl: string[]) {
    const ids = fileUrl.map((url) => {
      return getCloudinaryId(url);
    });

    const res = await cloudinaryConfig.api.delete_resources(ids);
    return res;
  }
}

// Create an instance of the CloudinaryService
const cloudinaryService = new CloudinaryService();

// Export the CloudinaryService instance
export default cloudinaryService;
