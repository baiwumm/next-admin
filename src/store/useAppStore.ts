/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 17:21:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 14:23:34
 * @Description: 全局状态
 */
'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { type Direction } from '@/components/animate-ui/primitives/effects/theme-toggler';
import { COLOR_STYLE, ROUTE_TRANSITION, TABS_STYLE } from '@/lib/enums';

type AppState = {
  isMobile: boolean; // 是否移动端
  setIsMobile: (value: boolean) => void; // 设置移动端
  primaryColor: string; // 主题色
  setPrimaryColor: (color: string) => void; // 设置主题色
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
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      isMobile: false,
      setIsMobile: (value) => set({ isMobile: value }),
      primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#000000", // 默认主题色
      setPrimaryColor: (color) => {
        set({ primaryColor: color })
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
        if (typeof document !== 'undefined') {
          const html = document.documentElement;
          html.classList.remove(`color-${COLOR_STYLE.GREY}`, `color-${COLOR_STYLE.INVERT}`);
          if (value !== COLOR_STYLE.DEFAULT) {
            html.classList.add(`color-${value}`);
          }
        }
      },
      tabStyle: TABS_STYLE.GOOGLE,
      setTabStyle: (value) => set({ tabStyle: value }),
      themeModeDirection: "ltr"
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
