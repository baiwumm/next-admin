/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-10 17:56:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 10:03:46
 * @Description: 多标签页
 */
"use client";
import { ScrollShadow, Tab, Tabs } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { find, get, last, map } from 'es-toolkit/compat';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow'

import { useMenuStore } from '@/store/useMenuStore';
import { useTabsStore } from "@/store/useTabsStore";

export default function DynamicTabs() {
  const t = useTranslations('Route');
  const pathname = usePathname();
  const { tabs, activeKey, setActiveKey, removeTab, addTab } = useTabsStore(
    useShallow((s) => ({
      tabs: s.tabs,
      activeKey: s.activeKey,
      setActiveKey: s.setActiveKey,
      addTab: s.addTab,
      removeTab: s.removeTab,
    })
    ));
  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const menuLoading = useMenuStore((state) => state.loading);
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      if (pathname === '/dashboard') {
        setActiveKey(pathname);
      } else {
        // 递归查找菜单项
        const findMenuByPath = (menuList: App.SystemSettings.Menu[], path: string): App.SystemSettings.Menu | null => {
          for (const menu of menuList) {
            if (menu.path === path) return menu;
            if (menu.children) {
              const found = findMenuByPath(menu.children, path);
              if (found) return found;
            }
          }
          return null;
        };
        // 过滤出当前菜单项
        const menuItem = findMenuByPath(menuList, pathname);
        if (menuItem) {
          // 添加标签
          addTab(menuItem);
          setActiveKey(menuItem.path);
        }
      }
    }
  }, [pathname, menuList, addTab, setActiveKey])

  useEffect(() => {
    if (activeKey) {
      router.push(activeKey);
    }
  }, [activeKey, router])

  if (menuLoading) {
    return null;
  }

  const dashboardTab = find(menuList, { path: '/dashboard' });

  // 渲染标签页
  const renderTab = (menu: App.SystemSettings.Menu, hasClose = true) => (
    <Tab
      key={menu.path}
      title={(
        <div className="flex justify-center items-center space-x-0.5">
          <Icon icon={menu.icon} className="text-base" />
          <span>{t(menu.label)}</span>
          {hasClose ? (
            <Icon icon="ri:close-line" className="text-base cursor-pointer" onClick={() => removeTab(menu.path)} />
          ) : null}
        </div>
      )} />
  )
  return (
    <div className="container mx-auto px-4">
      <ScrollShadow className="max-w-full" orientation="horizontal">
        <Tabs
          selectedKey={activeKey}
          onSelectionChange={(key) => setActiveKey(key as string)}
          aria-label="Dynamic Tabs"
          color="primary"
          size='sm'
        >
          {dashboardTab ? renderTab(dashboardTab, false) : null}
          {tabs.length ? map(tabs, v => renderTab(v)) : null}
        </Tabs>
      </ScrollShadow>
    </div>
  );
}
