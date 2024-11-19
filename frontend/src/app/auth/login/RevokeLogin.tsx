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
  useEffect(() => {
    signIn("google", {
      callbackUrl: `${callbackUrl || ""}${searchParamsStr || ""}`,
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default RevokeLogin;
