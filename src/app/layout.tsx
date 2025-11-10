import { ToastProvider } from "@heroui/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Providers } from "./Providers";

import "./globals.css";
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import GlobalLayout from '@/components/GlobalLayout'; // 全局布局
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
          <Providers locale={locale}>
            <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME}>
              <ToastProvider placement='top-center' toastOffset={40} />
              {/* 全局 Loading */}
              <FullLoading />
              <GlobalLayout locale={locale}>
                {children}
              </GlobalLayout>
            </NextThemesProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
