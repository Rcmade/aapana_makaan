import type { Metadata } from "next";
import "./globals.css";
import { webName } from "@/constant";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: webName,
  description: webName,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
