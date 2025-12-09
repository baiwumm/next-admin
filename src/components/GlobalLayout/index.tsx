/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:37:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-09 09:00:00
 * @Description: 全局布局
 */
"use client"
import { AnimatePresence, motion } from 'motion/react';
import { createContext, type FC, type ReactNode, useContext, useMemo, useState } from 'react';
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

// 👇 创建 Context，让子组件能触发刷新
const RefreshContext = createContext<() => void>(() => { });

export const useRefreshPage = () => useContext(RefreshContext);

const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => {
  const { layoutMode, showTabs, showFooter, navHeight, tabsHeight, footerHeight } = useAppStore(
    useShallow((s) => pick(s, ['layoutMode', 'showTabs', 'showFooter', 'navHeight', 'tabsHeight', 'footerHeight'])
    ))

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };



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
    <RefreshContext.Provider value={handleRefresh}>
      <AnimatePresence mode="wait">
        <motion.div
          key={layoutMode}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: .3 }}
        >
          <SidebarProvider>
            {/* 默认侧栏布局 */}
            {layoutMode === LAYOUT_MODE.TOPBAR ? (
              <TopbarLayout refreshKey={refreshKey} mainMinH={mainMinH}>{children}</TopbarLayout>
            ) : (
              <SidebarLayout refreshKey={refreshKey} mainMinH={mainMinH}>{children}</SidebarLayout>
            )}
          </SidebarProvider>
        </motion.div>
      </AnimatePresence>
    </RefreshContext.Provider>
  )
}
export default GlobalLayout;