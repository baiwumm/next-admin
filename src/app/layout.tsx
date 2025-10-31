import { HeroUIProvider } from "@heroui/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "./globals.css";
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import Header from '@/components/Header'; // 头部布局
import PageAnimatePresence from '@/components/PageAnimatePresence'
import { type Locale } from '@/i18n/config'

export const metadata: Metadata = {
  title: "Next Admin",
  description: "Middle and back-end templates based on Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale() as Locale;

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <HeroUIProvider>
            <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME}>
              {/* 全局 Loading */}
              <FullLoading />
              <Header locale={locale} />
              <PageAnimatePresence>
                {children}
              </PageAnimatePresence>
            </NextThemesProvider>
          </HeroUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
