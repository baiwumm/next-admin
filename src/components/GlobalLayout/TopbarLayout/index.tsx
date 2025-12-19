/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:51:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-19 09:38:18
 * @Description: 顶栏布局
 */
"use client";
import { AnimatePresence, motion } from 'motion/react';
import { type FC, type ReactNode, ViewTransition } from 'react';
import z from 'zod';
import { useShallow } from "zustand/react/shallow";

import BreadcrumbContainer from '../components/BreadcrumbContainer';
import NavHeader from '../components/NavHeader';

import DynamicTabs from '@/components/DynamicTabs';
import Footer from '@/components/Footer';
import { LAYOUT_MODE } from '@/enums';
import { useRefreshWithViewTransition } from '@/hooks/use-refresh-with-view-transition';
import { cn, pick } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

type TopMenuLayoutProps = {
  children: ReactNode;
  mainMinH: number; // 主体内容最小高度
}

const TopMenuLayout: FC<TopMenuLayoutProps> = ({ children, mainMinH }) => {
  // 引入刷新逻辑
  const { refreshKey, refreshContent, isPending } = useRefreshWithViewTransition();

  const { fixedHeader, showTabs, showFooter, transition, layoutMode } = useAppStore(
    useShallow((s) => pick(s, ['fixedHeader', 'showTabs', 'showFooter', 'transition', 'layoutMode'])
    ))
  // 是否侧栏布局
  const isSidebarLayout = layoutMode === LAYOUT_MODE.SIDEBAR;
  return (
    <div className="w-full">
      <div id="header" className={cn('top-0 z-20 backdrop-blur-lg bg-white/80 dark:bg-black/80', fixedHeader ? 'sticky' : 'static')}>
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
              <DynamicTabs onRefresh={refreshContent} isRefreshing={isPending} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <ViewTransition name={transition}>
        <main
          key={refreshKey}
          className={cn("p-4", isSidebarLayout ? "w-full" : "container mx-auto")}
          style={{ minHeight: mainMinH }}
        >
          {isSidebarLayout ? null : (
            <div className="mb-4">
              <BreadcrumbContainer />
            </div>
          )}
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