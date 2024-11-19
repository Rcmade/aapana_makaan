"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { SessionProvider } from "next-auth/react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="system"
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
        <ProgressBar
          height="2px"
          color="hsl(var(--primary))"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </SessionProvider>
    </NextThemesProvider>
  );
}
