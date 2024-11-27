"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      onClick={() => setTheme(() => (theme === "dark" ? "light" : "dark"))}
      variant="ghost"
      className={"text-primary"}
      size="icon"
    >
      {theme === "dark" ? <Moon className="" /> : <Sun className="" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
