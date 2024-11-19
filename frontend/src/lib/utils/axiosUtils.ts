// import { SignatureReturnT } from "@/types";
import axios from "axios";
import { getBackendUrl } from "./stringUtils";
import { uploadImageSignaturePostApi } from "@/constant/apiRoutes";
import { SignatureRequestT, SignatureResponseT } from "@/types/apiResponse";

export const getSignature = async () => {
  const { data } = await axios.post<SignatureResponseT>(
    getBackendUrl(uploadImageSignaturePostApi),
    {} satisfies SignatureRequestT,
  );
  return data;
};
