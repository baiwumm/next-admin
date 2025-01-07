/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-03 17:06:15
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-06 11:32:50
 * @Description: 全局布局
 */
'use client';
import { SessionProvider } from 'next-auth/react';

import AppSideBar from '@/components/AppSideBar';
import GlobalFooter from '@/components/GlobalFooter'; // 底部版权
import GlobalHeader from '@/components/GlobalHeader'; // 头部布局
import PageAnimatePresence from '@/components/PageAnimatePresence';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useLayoutStore } from '@/store/layoutStore';

type GlobalLayoutProps = {
  children: React.ReactNode;
};

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  // 是否跳过全局布局
  const skipGlobalLayout = useLayoutStore((state) => state.skipGlobalLayout);

  return skipGlobalLayout ? (
    <>{children}</>
  ) : (
    <SessionProvider>
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset>
          {/* 头部布局 */}
          <GlobalHeader />
          <PageAnimatePresence>{children}</PageAnimatePresence>
          {/* 底部版权 */}
          <GlobalFooter />
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
