"use client";
import React from "react";
import { type PagePropsPromise } from "@/types";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import LoginButton from "@/components/buttons/LoginButton";
import { createQueryString } from "@/lib/utils/stringUtils";
import { homeUrl } from "@/config/routesConfig";

export const dynamic = "force-dynamic";
const Page = ({ searchParams }: PagePropsPromise) => {
  const searchParamsP = React.use(searchParams);
  const callbackUrl = (searchParamsP?.callbackUrl || homeUrl) as string;
  const searchParamsStr = createQueryString(searchParamsP, {
    callbackUrl: "",
  });

  return (
    <>
      <LoginButton />
      <RevokeLogin
        searchParamsStr={searchParamsStr}
        callbackUrl={callbackUrl}
      />
    </>
  );
};

const RevokeLogin = ({
  callbackUrl,
  searchParamsStr,
}: {
  callbackUrl: string;
  searchParamsStr: string;
}) => {
  useEffect(() => {
    signIn("rauth", {
      callbackUrl: `${callbackUrl}${searchParamsStr}`,
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
export default Page;
