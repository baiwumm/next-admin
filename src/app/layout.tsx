/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:16:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-26 17:07:27
 * @Description: 根布局
 */
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { headers } from 'next/headers';
import { type Messages, NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import { Providers } from "./Provider";

import "@/styles/globals.css";
import { ClarityAnalytics, GoogleAnalytics, PlausibleAnalytics, UmamiAnalytics } from '@/components/Analytics';
import FullLoading from '@/components/FullLoading'; // 全局 Loading
import { INTL_LOCALES } from '@/enums';
import pkg from "#/package.json";

type MetaProps = {
  params: { locale: typeof INTL_LOCALES.valueType };
};

// 动态生成 Metadata
export async function generateMetadata({ params: { locale } }: MetaProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Route' });
  // 获取路由 pathname
  const headersList = await headers();
  const pathname = headersList.get('x-current-pathname') || '/';

  // 提取最后一段
  const segments = pathname.split('/').filter(Boolean);
  const pageKey = segments[segments.length - 1] as keyof Messages['Route'];
  // 如果路由不存在对应的翻译，则使用应用描述作为标题
  let pageTitle = process.env.NEXT_PUBLIC_APP_DESC!;
  if (pageKey && t.has(pageKey)) {
    pageTitle = t(pageKey);
  }

  return {
    title: {
      template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
      absolute: `${pageTitle} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
    },
    description: process.env.NEXT_PUBLIC_APP_DESC,
    generator: process.env.NEXT_PUBLIC_APP_NAME,
    applicationName: process.env.NEXT_PUBLIC_APP_NAME,
    referrer: 'origin-when-cross-origin',
    keywords: [process.env.NEXT_PUBLIC_APP_NAME!, 'Next.js', 'Shadcn UI', 'Tailwindcss', '模板', "Template", "Motion"],
    authors: [{ name: process.env.NEXT_PUBLIC_AUTHOR_NAME, url: pkg.author.url }],
    creator: process.env.NEXT_PUBLIC_AUTHOR_NAME,
    publisher: process.env.NEXT_PUBLIC_AUTHOR_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: process.env.NEXT_PUBLIC_APP_NAME,
      description: process.env.NEXT_PUBLIC_APP_DESC,
      url: process.env.NEXT_PUBLIC_APP_DOMAIN,
      siteName: process.env.NEXT_PUBLIC_APP_NAME,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/og.png`,
          width: 1200,
          height: 630,
        }
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: process.env.NEXT_PUBLIC_APP_NAME,
      description: process.env.NEXT_PUBLIC_APP_DESC,
      creator: 'baiwumm',
      images: [`${process.env.NEXT_PUBLIC_APP_DOMAIN}/og.png`],
    },
  };
}

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
        <meta name="version" content={pkg.version} />
        <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_APP_NAME} />
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
