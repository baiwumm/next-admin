/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 16:24:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 16:32:16
 * @Description: 全局布局
 */
'use client';

import { cn } from "@heroui/react";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import DynamicTabs from '@/components/DynamicTabs'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import { type Locale } from '@/i18n/config'
import { setupAppStore, useAppStore } from '@/store/useAppStore';

type GlobalLayoutProps = {
  children: React.ReactNode;
  locale: Locale;
};

export default function GlobalLayout({ children, locale }: GlobalLayoutProps) {
  const fixedHeader = useAppStore((s) => s.fixedHeader);
  const pathname = usePathname();
  // 受保护的路由，不需要 RootLayout
  const protectedRoutes = ['/login']
  // 数据初始化
  useEffect(() => {
    const cleanup = setupAppStore()
    return () => cleanup?.()
  }, [])

  return protectedRoutes.includes(pathname) ? children : (
    <>
      <div className={cn('top-0 z-90', fixedHeader ? 'sticky' : 'static')}>
        <Header locale={locale} />
        <DynamicTabs />
      </div>
      <div className='container mx-auto p-4 min-h-[calc(100vh-6.5rem)] flex flex-col justify-between gap-4'>
        <PageContainer>
          {children}
        </PageContainer>
        <Footer />
      </div>
    </>
  );
}