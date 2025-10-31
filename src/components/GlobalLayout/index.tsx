/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 16:24:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-31 16:30:04
 * @Description: 全局布局
 */
'use client';

import Header from '@/components/Header'; // 头部布局
import PageAnimatePresence from '@/components/PageAnimatePresence'
import { type Locale } from '@/i18n/config'
import { useLayoutStore } from '@/store/layoutStore';

type GlobalLayoutProps = {
  children: React.ReactNode;
  locale: Locale;
};

export default function GlobalLayout({ children, locale }: GlobalLayoutProps) {
  // 是否跳过全局布局
  const skipGlobalLayout = useLayoutStore((state) => state.skipGlobalLayout);

  return skipGlobalLayout ? (
    <>{children}</>
  ) : (
    <>
      <Header locale={locale} />
      <PageAnimatePresence>
        {children}
      </PageAnimatePresence>
    </>
  );
}