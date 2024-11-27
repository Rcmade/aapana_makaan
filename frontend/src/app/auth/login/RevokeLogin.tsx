"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

const RevokeLogin = ({
  callbackUrl,
  searchParamsStr,
}: {
  callbackUrl: string;
  searchParamsStr: string;
}) => {
  const callback = `${callbackUrl || ""}${searchParamsStr || ""}`;  
  console.log({ callback });
  useEffect(() => {
    signIn("google", {
      callbackUrl: callback,
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default RevokeLogin;
