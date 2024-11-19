"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/components/ui/button";
interface LoginButtonProps {}
const LoginButton = ({}: LoginButtonProps) => {
  return (
    <Button onClick={() => signIn("google")} size="lg">
      Sign In
    </Button>
  );
};

export default LoginButton;
