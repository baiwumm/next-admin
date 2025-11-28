/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:16:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 10:02:57
 * @Description: 根布局
 */
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import { Providers } from "./Provider";

import "./globals.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import { ClarityAnalytics, GoogleAnalytics, PlausibleAnalytics, UmamiAnalytics } from '@/components/Analytics';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESC,
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
        <Providers>
          {children}
          {/* vercel Web Analytics */}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
