/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-03 17:09:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-05 09:40:31
 * @Description: 布局文件
 */
import './globals.scss';
import 'antd/dist/reset.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';

import BasicLayout from '@/components/BasicLayout'; // 全局布局

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PROJECT_NAME,
  description: process.env.NEXT_PUBLIC_PROJECT_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <BasicLayout>{children}</BasicLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
