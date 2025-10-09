import type { Metadata } from "next";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";

export const metadata: Metadata = {
  title: "Next Admin",
  description: "Middle and back-end templates based on Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css"
        />
      </head>
      <body>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
