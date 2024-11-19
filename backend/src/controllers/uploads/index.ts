import cloudinaryService from "@/services/uploadService";

export const generateSignature = async () => {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const upload_preset = process.env.UPLOAD_PRESET!;
  const source = "uw";
  const preset = {
    timestamp,
    upload_preset,
    source,
  };

  const signature = await cloudinaryService.signUploadRequest(preset);
  return { signature, ...preset };
};
