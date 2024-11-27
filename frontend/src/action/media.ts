import { deleteMediaPostApi } from "@/constant/apiRoutes";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import {
  type DeleteMediaRequestT,
  type DeleteMediaResponseT,
} from "@/types/apiResponse";
import axios from "axios";

export const deleteMedia = async (
  mediaInfo: DeleteMediaRequestT & { authorization: string },
) => {
  try {
    const { data } = await axios.post<DeleteMediaResponseT>(
      getBackendUrl(deleteMediaPostApi),
      mediaInfo,
      {
        headers: {
          Authorization: mediaInfo.authorization,
        },
      },
    );
    return data;
  } catch (error) {
    return getAxiosErrorMessage(error);
  }
};
