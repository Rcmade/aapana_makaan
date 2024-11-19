// "use client";
import React from "react";
import { Button } from "../ui/button";
// import { useSearchParams } from "next/navigation";
// import { getCallbackUrl } from "@/lib/utils/stringUtils";
// import { signIn } from "next-auth/react";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

const AddPropertyButton = () => {
  //   const searchParams = useSearchParams();
  //   const user = useCurrentUser();
  return (
    <Button
      size="sm"
      //   onClick={() =>
      //     !user &&
      //     signIn("google", {
      //       redirectTo: getCallbackUrl(searchParams.toString()),
      //     })
      //   }
      variant="destructive"
      className="relative"
    >
      Add property
      <Link href="/add-property" className="absolute inset-0"></Link>
    </Button>
  );
};

export default AddPropertyButton;
