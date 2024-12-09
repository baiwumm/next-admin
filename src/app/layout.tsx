/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:05:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-09 09:51:17
 * @Description: 布局文件
 */
import './globals.scss';

import type { Metadata } from 'next';

import AppSideBar from '@/components/AppSideBar';
import ThemeModeButton from '@/components/ThemeModeButton';
import ThemeProvider from '@/components/ThemeProvider';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SidebarProvider>
            <AppSideBar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b justify-between px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <ThemeModeButton />
              </header>
              <main className="p-4">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
