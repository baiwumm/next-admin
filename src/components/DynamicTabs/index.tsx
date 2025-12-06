/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-05 15:43:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-06 13:34:58
 * @Description: 
 */
"use client";
import { useRouter } from '@bprogress/next/app';
import { RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { type FC, useCallback, useEffect } from 'react';
import { useShallow } from "zustand/react/shallow";

import ButtonStyle from './components/ButtonStyle';

import { useRefreshPage } from '@/components/TopMenuLayout';
import { Button } from '@/components/ui';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TABS_STYLE } from '@/enums';
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from "@/store/useMenuStore";
import { useTabsStore } from "@/store/useTabsStore";

const DynamicTabs: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const refreshPage = useRefreshPage();
  const tabStyle = useAppStore((s) => s.tabStyle);
  const tabsHeight = useAppStore((s) => s.tabsHeight);
  const { activeKey, setActiveKey, addTab } = useTabsStore(
    useShallow((s) => ({
      activeKey: s.activeKey,
      setActiveKey: s.setActiveKey,
      addTab: s.addTab,
    }))
  );

  const menuList = useMenuStore((s) => s.menuList);
  const menuLoading = useMenuStore((s) => s.loading);

  // 递归查找菜单项
  const findMenuByPath = useCallback(function findMenuByPath(
    list: System.Menu[],
    path: string
  ): System.Menu | null {
    for (const item of list) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findMenuByPath(item.children, path); // ✅ 可以递归
        if (found) return found;
      }
    }
    return null;
  }, []);

  /**
   * pathname 改变 → 需要确保 tab 存在
   */
  useEffect(() => {
    if (!pathname || !menuList.length) return;

    // 🚫 不要把 dashboard 放进 tabs
    if (pathname === "/dashboard") {
      setActiveKey("/dashboard");
      return;
    }

    const menuItem = findMenuByPath(menuList, pathname);

    if (menuItem) {
      addTab(menuItem);
    }
  }, [pathname, menuList, addTab, setActiveKey, findMenuByPath]);

  /**
   * 仅当 activeKey 变化时才跳转
   */
  useEffect(() => {
    router.push(activeKey);
  }, [activeKey, router]);

  if (menuLoading) return null;

  const dashboardTab = menuList.find(item => item.path === "/dashboard");
  return (
    <div className="flex gap-1 items-center px-4 py-2 border-b border-default backdrop-blur-lg" style={{ height: tabsHeight }}>
      {/* 左侧：自适应宽度的可滚动标签区 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tabStyle}
          className="relative grow min-w-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: .3 }}>
          <ScrollArea>
            {/* 按钮风格 */}
            {tabStyle === TABS_STYLE.BUTTON ? (
              <ButtonStyle dashboardTab={dashboardTab} />
            ) : null}
            <ScrollBar orientation="horizontal" className="z-21 h-1.5" />
          </ScrollArea>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/20 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/20 bg-linear-to-l"></div>
        </motion.div>
      </AnimatePresence>
      <Button size="icon" aria-label="Refresh Route" variant="ghost" className="rounded-full" onClick={refreshPage}>
        <RotateCcw />
      </Button>
    </div>
  )
}
export default DynamicTabs;