import LoginButton from "@/components/buttons/LoginButton";
import { createQueryString } from "@/lib/utils/stringUtils";
import { PageProps, SearchParamsPromise } from "@/types";
import React from "react";
import RevokeLogin from "./RevokeLogin";

const page = async ({ searchParams }: { searchParams: SearchParamsPromise }) => {
  const searchParamsAwait = await searchParams;
  const callbackUrl = searchParamsAwait?.callbackUrl;

  const searchParamsStr = createQueryString(searchParamsAwait, {
    callbackUrl: "",
  });

  return (
    <div>
      <LoginButton />
      <RevokeLogin
        searchParamsStr={searchParamsStr}
        callbackUrl={callbackUrl}
      />
    </div>
  );
};

export default page;
