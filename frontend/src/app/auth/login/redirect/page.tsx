import { type SearchParamsPromise } from "@/types";
import { cookies } from "next/headers";
import React from "react";

// Helper function to retrieve the redirect URL from cookies
const getRedirectUrl = async (): Promise<string | undefined> => {
  const redirectUrl = (await cookies()).get(
    process.env.AUTH_CALLBACK_COOKIE_NAME!,
  )?.value;
  return redirectUrl?.startsWith("http")
    ? redirectUrl
    : `${process.env.NEXT_PUBLIC_URL}${redirectUrl?.endsWith("/") ? redirectUrl : `/${redirectUrl}`}`;
};

// Helper function to build a complete callback URL
const buildCallbackUrl = (callbackUrl: string): URL => {
  return callbackUrl.startsWith("http")
    ? new URL(callbackUrl)
    : new URL(`${process.env.NEXT_PUBLIC_URL}${callbackUrl}`);
};

// Main page function to handle redirection based on search params and cookies
const page = async ({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) => {
  // const resolvedParams = await searchParams;
  const redirectUrl = await getRedirectUrl();
  // console.log({ redirectUrl });
  // redirect(redirectUrl||homeUrl);
  // if (redirectUrl) {
  //   const url = new URL(redirectUrl);
  //   const callbackUrl = url.searchParams.get("callbackUrl");

  //   url.searchParams.delete("callbackUrl");
  //   // // Generate query string if callback URL with params exists
  //   // const searchStr = resolvedParams?.callbackUrl
  //   //   ? buildCallbackUrl(resolvedParams.callbackUrl).searchParams.toString()
  //   //   : "";
  //   const redirectCallUrl = callbackUrl
  //     ? `${callbackUrl}?callbackUrl=${resolvedParams?.callbackUrl}`
  //     : resolvedParams.callbackUrl || homeUrl;
  //     console.log({ redirectCallUrl });
  //   // Redirect to the resolved callback URL or default home URL
  //   // return redirect(redirectCallUrl);
  // } else {
  //   const callbackPath = resolvedParams?.callbackUrl || homeUrl;
  //   const queryString = resolvedParams?.callbackUrl
  //     ? createQueryString(resolvedParams, { callbackUrl: "" })
  //     : "";
  //   const redirectCall = callbackPath + queryString;
  //   console.log({ redirect2: redirectCall, queryString, callbackPath });
  //   // return redirect(redirectCall);
  // }

  return <p>page</p>;
};

export default page;
