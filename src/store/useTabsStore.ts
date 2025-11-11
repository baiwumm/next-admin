/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-10 17:49:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-11 14:52:42
 * @Description: 多标签页
 */
"use client";

import { filter, find, findIndex, get, last, slice } from 'es-toolkit/compat'
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TabsState = {
  tabs: App.SystemSettings.Menu[];
  activeKey: string;
  setActiveKey: (key: string) => void;
  addTab: (tab: App.SystemSettings.Menu) => void;
  removeTab: (key: string) => void;
  closeLeftTabs: () => void;
  closeRightTabs: () => void;
  closeAllTabs: () => void;
}

export const useTabsStore = create(
  persist<TabsState>(
    (set) => ({
      tabs: [],
      activeKey: "/dashboard",
      setActiveKey: (key) => set({ activeKey: key }),

      // 新增标签
      addTab: (tab) =>
        set((state) => {
          // 检查标签是否已存在
          const exists = find(state.tabs, { path: tab.path });

          if (exists) {
            return { activeKey: tab.path };
          } else {
            return { tabs: [...state.tabs, tab], activeKey: tab.path };
          }
        }),

      // 移除标签
      removeTab: (key) =>
        set((state) => {
          const newTabs = filter(state.tabs, (t) => t.path !== key);
          const newActiveKey = get(last(newTabs), 'path', '/dashboard');
          return { tabs: newTabs, activeKey: newActiveKey };
        }),

      // 关闭当前标签左侧的所有标签
      closeLeftTabs: () =>
        set((state) => {
          const activeIndex = findIndex(state.tabs, { path: state.activeKey });
          const newTabs = slice(state.tabs, activeIndex);
          return { tabs: newTabs };
        }),

      // 关闭当前标签右侧的所有标签
      closeRightTabs: () =>
        set((state) => {
          const activeIndex = findIndex(state.tabs, { path: state.activeKey });
          const newTabs = slice(state.tabs, 0, activeIndex + 1);
          return { tabs: newTabs };
        }),

      // 关闭所有标签（除了当前标签）
      closeAllTabs: () =>
        set((state) => {
          const currentTab = find(state.tabs, { path: state.activeKey });
          return { tabs: currentTab ? [currentTab] : [] };
        }),
    }), {
    name: 'tabs-storage'
  }));
