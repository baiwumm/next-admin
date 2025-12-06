/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 17:21:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-06 13:32:22
 * @Description: 全局状态
 */
'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { type Direction } from '@/components/animate-ui/primitives/effects/theme-toggler';
import { COLOR_STYLE, ROUTE_TRANSITION, TABS_STYLE, THEME_PRIMARY_COLOR } from '@/enums';
import { initializeColorStyle, initializePrimaryColor } from '@/lib/utils';

type AppState = {
  isMobile: boolean; // 是否移动端
  setIsMobile: (value: boolean) => void; // 设置移动端
  primaryColor: typeof THEME_PRIMARY_COLOR.valueType; // 主题色
  setPrimaryColor: (color: typeof THEME_PRIMARY_COLOR.valueType) => void; // 设置主题色
  transition: typeof ROUTE_TRANSITION.valueType; // 路由过渡类型
  setTransition: (type: typeof ROUTE_TRANSITION.valueType) => void; // 设置路由过渡类型
  fixedHeader: boolean; // 是否固定顶栏
  setFixedHeader: (val: boolean) => void; // 设置是否固定顶栏,
  showTabs: boolean; // 是否显示标签页
  setShowTabs: (val: boolean) => void; // 设置是否显示标签页
  showFooter: boolean; // 是否显示底部
  setShowFooter: (val: boolean) => void; // 设置是是否显示底部
  colorStyle: typeof COLOR_STYLE.valueType;// 色彩风格
  setColorStyle: (val: typeof COLOR_STYLE.valueType) => void; // 设置色彩风格
  tabStyle: typeof TABS_STYLE.valueType; // 标签页风格
  setTabStyle: (val: typeof TABS_STYLE.valueType) => void; // 设置标签页风格
  themeModeDirection: Direction; // 主题切换动画方向
  setThemeModeDirection: (val: Direction) => void; // 设置主题切换动画方向
  navHeight: number; // 菜单栏高度
  setNavHeight: (val: number) => void; // 设置菜单栏高度
  tabsHeight: number; // 标签页高度
  setTabsHeight: (val: number) => void; // 设置标签页高度
  footerHeight: number; // 底部高度
  setFooterHeight: (val: number) => void; // 设置底部高度
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      isMobile: false,
      setIsMobile: (value) => set({ isMobile: value }),
      primaryColor: THEME_PRIMARY_COLOR.DEFAULT, // 默认主题色
      setPrimaryColor: (color) => {
        set({ primaryColor: color })
        initializePrimaryColor(color);
      },
      transition: ROUTE_TRANSITION.BLUR_SLIDE,
      setTransition: (value) => set({ transition: value }),
      fixedHeader: true,
      setFixedHeader: (value) => set({ fixedHeader: value }),
      showTabs: true,
      setShowTabs: (value) => set({ showTabs: value }),
      showFooter: true,
      setShowFooter: (value) => set({ showFooter: value }),
      colorStyle: COLOR_STYLE.DEFAULT,
      setColorStyle: (value) => {
        set({ colorStyle: value })
        initializeColorStyle(value);
      },
      tabStyle: TABS_STYLE.BUTTON,
      setTabStyle: (value) => set({ tabStyle: value }),
      themeModeDirection: "ltr",
      setThemeModeDirection: (value) => set({ themeModeDirection: value }),
      navHeight: 60,
      setNavHeight: (value) => set({ navHeight: value }),
      tabsHeight: 40,
      setTabsHeight: (value) => set({ tabsHeight: value }),
      footerHeight: 72,
      setFooterHeight: (value) => set({ footerHeight: value }),
    }),
    {
      name: 'app-theme', // 用于存储在 localStorage 中的键名
      storage: createJSONStorage(() => localStorage)// 指定使用 localStorage 存储
    }))

// setup 函数（仅客户端执行一次）
export function setupAppStore() {
  const { setIsMobile } = useAppStore.getState()

  if (typeof window !== 'undefined') {
    const update = () => setIsMobile(window.innerWidth <= 768)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }
}
