"use client";

import { UserIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LoginButton from "@/components/buttons/LoginButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <>
      {user?.id ? (
        <Button size="icon" variant="ghost" className="relative">
          <UserIcon />
          <Link href="/user" className="absolute inset-0" />
        </Button>
      ) : (
        <LoginButton />
      )}
    </>
  );
};
