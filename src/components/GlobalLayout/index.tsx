/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:37:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-11 09:18:55
 * @Description: 全局布局
 */
"use client"
import { type FC, type ReactNode, useMemo } from 'react';
import { useShallow } from "zustand/react/shallow";

import SidebarLayout from './SidebarLayout';
import TopbarLayout from './TopbarLayout';

import { SidebarProvider } from '@/components/ui'
import { LAYOUT_MODE } from '@/enums';
import { pick } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

type GlobalLayoutProps = {
  children?: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
  const { layoutMode, showTabs, showFooter, navHeight, tabsHeight, footerHeight } = useAppStore(
    useShallow((s) => pick(s, ['layoutMode', 'showTabs', 'showFooter', 'navHeight', 'tabsHeight', 'footerHeight'])
    ))

  // 计算 main 的 min-h
  const mainMinH = useMemo(() => {
    let result = navHeight; // 菜单固定高度
    if (showTabs) {
      result += tabsHeight; // 标签页高度
    }
    if (showFooter) {
      result += footerHeight; // 底部高度
    }
    return result;
  }, [showTabs, showFooter, navHeight, tabsHeight, footerHeight]);

  return (
    <SidebarProvider>
      {/* 默认侧栏布局 */}
      {layoutMode === LAYOUT_MODE.TOPBAR ? (
        <TopbarLayout mainMinH={mainMinH}>{children}</TopbarLayout>
      ) : (
        <SidebarLayout mainMinH={mainMinH}>{children}</SidebarLayout>
      )}
    </SidebarProvider>
  )
}
export default GlobalLayout;