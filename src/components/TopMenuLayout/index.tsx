/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:20:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-08 11:31:08
 * @Description: 顶部菜单布局
 */
"use client";
import { AnimatePresence, motion } from 'motion/react'
import { createContext, type FC, type ReactNode, useContext, useMemo, useState, ViewTransition } from 'react';
import { useShallow } from "zustand/react/shallow";
import Navbar from './components/Navbar';

import DynamicTabs from '@/components/DynamicTabs';
import Footer from '@/components/Footer';
import { cn, pick } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

type TopMenuLayoutProps = {
  children?: ReactNode;
}

// 👇 创建 Context，让子组件能触发刷新
const RefreshContext = createContext<() => void>(() => { });

export const useRefreshPage = () => useContext(RefreshContext);

const TopMenuLayout: FC<TopMenuLayoutProps> = ({ children }) => {
  const { fixedHeader, showTabs, showFooter, navHeight, tabsHeight, footerHeight, transition } = useAppStore(
    useShallow((s) => pick(s, ['fixedHeader', 'showTabs', 'showFooter', 'navHeight', 'tabsHeight', 'footerHeight', 'transition'])
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
    return `calc(100vh - ${result}px)`;
  }, [showTabs, showFooter, navHeight, tabsHeight, footerHeight]);
  return (
    <RefreshContext.Provider value={handleRefresh}>
      <div className={cn('top-0 z-10 backdrop-blur-lg bg-primary-foreground/80', fixedHeader ? 'sticky' : 'static')}>
        <Navbar />
        <AnimatePresence mode="wait">
          {showTabs ? (
            <motion.div
              key="tabs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .5 }}
            >
              <DynamicTabs />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <ViewTransition name={transition}>
        <main className="container mx-auto p-4" key={refreshKey} style={{ minHeight: mainMinH }}>
          {children}
        </main>
      </ViewTransition>
      <AnimatePresence mode="wait">
        {showFooter && (
          <motion.div
            key="footer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </RefreshContext.Provider>
  );
};
export default TopMenuLayout;