/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:16:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 15:57:40
 * @Description: 根布局
 */
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import pkg from "../../package.json";
import { Providers } from "./Provider";

import "@/styles/globals.css";
import { ClarityAnalytics, GoogleAnalytics, PlausibleAnalytics, UmamiAnalytics } from '@/components/Analytics';
import FullLoading from '@/components/FullLoading'; // 全局 Loading

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
        {/* 插入版本 meta */}
        <meta name="version" content={pkg.version} />
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
          {/* 全局 Loading */}
          <FullLoading />
          <Providers>
            {children}
            {/* vercel Web Analytics */}
            <Analytics />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
