import { ToastProvider } from "@heroui/react";
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Providers } from "./Providers";

import "./globals.css";
import { ClarityAnalytics, GoogleAnalytics, PlausibleAnalytics, UmamiAnalytics } from '@/components/Analytics'; // 统计代码
import BackTop from '@/components/BackTop'; // 回到顶部
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import GlobalLayout from '@/components/GlobalLayout'; // 全局布局

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESC,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.baiwumm.com/fonts/MapleMono-CN-Regular/result.css"
        />
        {/* umami - 站点统计分析 */}
        <UmamiAnalytics />
        {/* Microsoft Clarity 统计代码 */}
        <ClarityAnalytics />
        {/* Google 统计 */}
        <GoogleAnalytics />
        {/* Plausible 统计代码 */}
        <PlausibleAnalytics />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers locale={locale}>
            <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME}>
              <ToastProvider placement='top-center' toastOffset={40} />
              {/* 全局 Loading */}
              <FullLoading />
              {/* 回到顶部 */}
              <BackTop />
              {/* vercel Web Analytics */}
              <Analytics />
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
