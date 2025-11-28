/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:16:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 09:55:59
 * @Description: 根布局
 */
import { Providers } from "./Provider";

import "./globals.css";
import 'rsuite/dist/rsuite-no-reset.min.css';

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
