/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:51:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-09 11:26:33
 * @Description: 顶栏布局
 */
"use client";
import { AnimatePresence, motion } from 'motion/react'
import { type FC, type ReactNode, ViewTransition } from 'react';
import { useShallow } from "zustand/react/shallow";

import NavHeader from '../components/NavHeader';

import DynamicTabs from '@/components/DynamicTabs';
import Footer from '@/components/Footer';
import { LAYOUT_MODE } from '@/enums';
import { cn, pick } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

type TopMenuLayoutProps = {
  children: ReactNode;
  refreshKey: number; // 用于刷新路由
  mainMinH: number; // 主体内容最小高度
}

const TopMenuLayout: FC<TopMenuLayoutProps> = ({ children, refreshKey, mainMinH }) => {
  const { fixedHeader, showTabs, showFooter, transition, layoutMode } = useAppStore(
    useShallow((s) => pick(s, ['fixedHeader', 'showTabs', 'showFooter', 'transition', 'layoutMode'])
    ))
  // 是否侧栏布局
  const isSidebarLayout = layoutMode === LAYOUT_MODE.SIDEBAR;
  return (
    <div className="w-full">
      <div className={cn('top-0 z-10 backdrop-blur-lg bg-sidebar/80', fixedHeader ? 'sticky' : 'static')}>
        <NavHeader />
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
        <main
          className={cn("p-4", isSidebarLayout ? "w-full" : "container mx-auto")}
          key={refreshKey}
          style={{ minHeight: `calc(100vh - ${mainMinH}px)` }}
        >
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
    </div>
  );
};
export default TopMenuLayout;