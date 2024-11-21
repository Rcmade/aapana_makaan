import cloudinaryService from "@/service/uploadService";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: any) => {
  const { paramsToSign, ...rest } = (await req.json()) as {
    paramsToSign: Record<string, string>;
  };

  if (!paramsToSign) {
    return Response.json(
      { error: "No files received." },
      {
        status: 400,
      },
    );
  }

  const signature = await cloudinaryService.signUploadRequest(paramsToSign);
  return Response.json({ signature });
};

export const GET = async () => {
  return Response.json({ message: "Uploads pdf route" });
};
