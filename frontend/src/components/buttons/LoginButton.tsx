"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
interface LoginButtonProps {}
const LoginButton = ({}: LoginButtonProps) => {
  return (
    <Button variant="ghost" onClick={() => signIn("google")} size="sm">
      Sign In
    </Button>
  );
};

export default LoginButton;
