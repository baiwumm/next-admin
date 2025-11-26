/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-10 17:56:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-26 14:39:19
 * @Description: 多标签页
 */
"use client";
import { useRouter } from '@bprogress/next/app'
import { Button, ScrollShadow } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { find } from "es-toolkit/compat";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import ButtonStyle from './_components/ButtonStyle';
import TabsStyle from './_components/TabsStyle';

import { useRefreshPage } from '@/components/GlobalLayout'
import { TABS_STYLE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from "@/store/useMenuStore";
import { useTabsStore } from "@/store/useTabsStore";

export default function DynamicTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const tabStyle = useAppStore((s) => s.tabStyle);
  const refreshPage = useRefreshPage();
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
    list: App.SystemSettings.Menu[],
    path: string
  ): App.SystemSettings.Menu | null {
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

  const dashboardTab = find(menuList, { path: "/dashboard" });
  return (
    <div className="flex gap-1 items-center px-2 pt-1 border-b border-divider h-10">
      {/* 左侧：自适应宽度的可滚动标签区 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tabStyle}
          className="flex-grow min-w-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: .3 }}>
          <ScrollShadow orientation="horizontal" className="h-full pb-1">
            {/* 按钮风格 */}
            {tabStyle === TABS_STYLE.BUTTON ? (
              <ButtonStyle dashboardTab={dashboardTab} />
            ) : null}

            {/* 标签风格 */}
            {tabStyle === TABS_STYLE.TAG ? (
              <TabsStyle dashboardTab={dashboardTab} />
            ) : null}
          </ScrollShadow>
        </motion.div>
      </AnimatePresence>
      {/* 刷新按钮 */}
      <Button isIconOnly aria-label="restart" variant="light" size='sm' className="mb-1" onPress={refreshPage}>
        <Icon icon="ri:restart-line" className="text-lg" />
      </Button>
    </div>
  );
}