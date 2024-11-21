import { buildCookieString } from "@/lib/utils/stringUtils";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const allCookies = (await cookies()).getAll();
    const mergedCookies = allCookies.reduce(
      (acc, c) => ({ ...acc, [c.name]: c.value }),
      {},
    );
    const cookieString = buildCookieString(mergedCookies);

    return Response.json({ Authorization: cookieString });
  } catch (error) {
    return Response.json(
      { error: "Failed to retrieve cookies" },
      { status: 500 },
    );
  }
};
