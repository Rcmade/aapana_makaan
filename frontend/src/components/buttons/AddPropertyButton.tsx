// "use client";
import React from "react";
import { Button } from "../ui/button";
// import { useSearchParams } from "next/navigation";
// import { getCallbackUrl } from "@/lib/utils/stringUtils";
// import { signIn } from "next-auth/react";
// import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { Plus } from "lucide-react";

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
      <span className="mr-2 sm:hidden">
        <Plus className="h-4 w-4" />
      </span>
      Add <span className="ml-2 hidden sm:block">property</span>
      <Link href="/add-property" className="absolute inset-0"></Link>
    </Button>
  );
};

export default AddPropertyButton;
