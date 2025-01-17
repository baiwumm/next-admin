/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:05:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-03 17:09:47
 * @Description: 布局文件
 */
import './globals.scss';

import { HeroUIProvider } from '@heroui/react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import UmamiAnalytics from '@/components/Analytics/UmamiAnalytics'; // Umami Analytics
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import GlobalLayout from '@/components/GlobalLayout'; // 全局布局
import ThemeProvider from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME,
  description: process.env.NEXT_PUBLIC_PROJECT_DESC,
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
      {/* umami - 站点统计分析 */}
      <UmamiAnalytics />
      <body>
        <HeroUIProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="light">
              {/* 全局 Loading */}
              <FullLoading />
              <GlobalLayout>{children}</GlobalLayout>
            </ThemeProvider>
          </NextIntlClientProvider>
          <Toaster position="top-center" />
        </HeroUIProvider>
      </body>
    </html>
  );
}
