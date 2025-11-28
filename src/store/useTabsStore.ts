/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-10 17:49:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 13:40:40
 * @Description: 多标签页
 */
"use client";

import { filter, find } from "es-toolkit/compat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TabsState = {
  tabs: App.SystemSettings.Menu[];
  setTabs: (tags: App.SystemSettings.Menu[]) => void;
  activeKey: string;
  setActiveKey: (key: string) => void;
  addTab: (tab: App.SystemSettings.Menu) => void;
  removeTab: (key: string) => void;
};

export const useTabsStore = create(
  persist<TabsState>(
    (set, get) => ({
      tabs: [],
      setTabs: (value) => set({ tabs: value }),
      activeKey: "/dashboard",
      setActiveKey: (key) => set({ activeKey: key }),
      addTab: (tab) =>
        set((state) => {
          const exists = find(state.tabs, { path: tab.path });
          if (exists) {
            return { activeKey: tab.path };
          }
          return {
            tabs: [...state.tabs, tab],
            activeKey: tab.path,
          };
        }),

      removeTab: (key) => {
        const { activeKey, tabs } = get();

        const newTabs = filter(tabs, (t) => t.path !== key);

        if (key === activeKey) {
          // 找上一个 tab → 兜底 /dashboard
          const index = tabs.findIndex((t) => t.path === key);
          const prevTab = tabs[index - 1] || tabs[index + 1]; // 上一个或下一个
          set({
            tabs: newTabs,
            activeKey: prevTab?.path || "/dashboard",
          });
        } else {
          // 删除非当前 → 仅更新 tabs
          set({ tabs: newTabs });
        }
      }
    }),
    { name: "tabs-storage" }
  )
);

