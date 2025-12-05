/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:20:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 18:05:23
 * @Description: 顶部菜单布局
 */
"use client";
import { AnimatePresence, motion } from 'motion/react'
import { createContext, type FC, type ReactNode, useContext, useMemo, useState } from 'react';

import Navbar from './components/Navbar';

import DynamicTabs from '@/components/DynamicTabs';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

type TopMenuLayoutProps = {
  children?: ReactNode;
}

// 👇 创建 Context，让子组件能触发刷新
const RefreshContext = createContext<() => void>(() => { });

export const useRefreshPage = () => useContext(RefreshContext);

const TopMenuLayout: FC<TopMenuLayoutProps> = ({ children }) => {
  const fixedHeader = useAppStore((s) => s.fixedHeader);
  const showTabs = useAppStore((s) => s.showTabs);
  const showFooter = useAppStore((s) => s.showFooter);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // 计算 main 的 min-h
  const mainMinH = useMemo(() => {
    let result = 60; // 菜单固定高度
    if (showTabs) {
      result += 40; // 标签页高度
    }
    if (showFooter) {
      result += 72; // 底部高度
    }
    return `min-h-[calc(100vh-${result}px)]`;
  }, [showTabs, showFooter]);
  return (
    <RefreshContext.Provider value={handleRefresh}>
      <div className={cn('top-0 z-10', fixedHeader ? 'sticky' : 'static')}>
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
      <main className={cn("container mx-auto p-4", mainMinH)} key={refreshKey}>
        {children}
      </main>
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