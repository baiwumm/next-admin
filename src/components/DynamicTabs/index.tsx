/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-10 17:56:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 13:45:30
 * @Description: 多标签页
 */
"use client";

import { ScrollShadow, Tab, Tabs } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { find, map } from "es-toolkit/compat";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useMenuStore } from "@/store/useMenuStore";
import { useTabsStore } from "@/store/useTabsStore";

export default function DynamicTabs() {
  const t = useTranslations('Route');
  const pathname = usePathname();
  const router = useRouter();

  const { tabs, activeKey, setActiveKey, addTab, removeTab } = useTabsStore(
    useShallow((s) => ({
      tabs: s.tabs,
      activeKey: s.activeKey,
      setActiveKey: s.setActiveKey,
      addTab: s.addTab,
      removeTab: s.removeTab,
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

  const renderTab = (menu: App.SystemSettings.Menu, canClose = true) => (
    <Tab
      key={menu.path}
      title={
        <div className="flex items-center gap-1">
          <Icon icon={menu.icon} className="text-base" />
          <span>{t(menu.label)}</span>

          {canClose && (
            <Icon
              icon="ri:close-line"
              className="cursor-pointer text-base"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(menu.path);
              }}
            />
          )}
        </div>
      }
    />
  );

  return (
    <ScrollShadow orientation="horizontal">
      <Tabs
        size="sm"
        selectedKey={activeKey}
        onSelectionChange={(key) => setActiveKey(String(key))}
        color="primary"
      >
        {dashboardTab && renderTab(dashboardTab, false)}
        {tabs.length > 0 && map(tabs, (menu) => renderTab(menu))}
      </Tabs>
    </ScrollShadow>
  );
}