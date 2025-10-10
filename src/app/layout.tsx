import { HeroUIProvider } from "@heroui/react";
import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "./globals.css";
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import Header from '@/components/Header'; // 头部布局

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
          <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME}>
            {/* 全局 Loading */}
            <FullLoading />
            <Header />
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
