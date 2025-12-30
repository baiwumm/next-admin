/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:37:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 13:56:42
 * @Description: 全局布局
 */
"use client"
import { type FC, type ReactNode, useEffect } from 'react';

import SidebarLayout from './SidebarLayout';
import TopbarLayout from './TopbarLayout';

import { SidebarProvider } from '@/components/ui'
import { LAYOUT_MODE } from '@/enums';
import { useAvailableHeight } from '@/hooks/use-available-height';
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore';

type GlobalLayoutProps = {
  children?: ReactNode;
}

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
  const layoutMode = useAppStore((s) => s.layoutMode);
  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);

  // 计算主体内容高度
  const mainHeight = useAvailableHeight({
    elementIds: ['header', 'footer'],
    debounceMs: 150,
  });

  useEffect(() => {
    if (!menuList?.length) {
      // 加载菜单数据
      fetchMenuList()
    }
  }, [fetchMenuList, menuList])

  if (layoutMode === LAYOUT_MODE.TOPBAR) {
    return (
      <TopbarLayout mainMinH={mainHeight}>{children}</TopbarLayout>
    )
  }
  return (
    <SidebarProvider>
      {/* 默认侧栏布局 */}
      <SidebarLayout mainMinH={mainHeight}>{children}</SidebarLayout>
    </SidebarProvider>
  )
}
export default GlobalLayout;