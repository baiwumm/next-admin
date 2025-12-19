/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:37:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-19 09:39:27
 * @Description: 全局布局
 */
"use client"
import { type FC, type ReactNode } from 'react';

import SidebarLayout from './SidebarLayout';
import TopbarLayout from './TopbarLayout';

import { SidebarProvider } from '@/components/ui'
import { LAYOUT_MODE } from '@/enums';
import { useAvailableHeight } from '@/hooks/use-available-height';
import { useAppStore } from '@/store/useAppStore';

type GlobalLayoutProps = {
  children?: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
  const layoutMode = useAppStore((s) => s.layoutMode);

  // 计算主体内容高度
  const mainHeight = useAvailableHeight({
    elementIds: ['header', 'footer'],
    debounceMs: 150,
  });
  return (
    <SidebarProvider>
      {/* 默认侧栏布局 */}
      {layoutMode === LAYOUT_MODE.TOPBAR ? (
        <TopbarLayout mainMinH={mainHeight}>{children}</TopbarLayout>
      ) : (
        <SidebarLayout mainMinH={mainHeight}>{children}</SidebarLayout>
      )}
    </SidebarProvider>
  )
}
export default GlobalLayout;