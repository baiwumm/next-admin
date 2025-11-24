/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 17:21:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 18:00:32
 * @Description: 全局状态
 */
'use client'
import { semanticColors } from "@heroui/theme";
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ROUTE_TRANSITION, type RouteTransitionValue } from '@/lib/constant'
import { HexToHSLValue } from '@/lib/utils'

type AppState = {
  isMobile: boolean; // 是否移动端
  setIsMobile: (value: boolean) => void; // 设置移动端
  primaryColor: string; // 主题色
  setPrimaryColor: (color: string) => void; // 设置主题色
  transition: RouteTransitionValue; // 路由过渡类型
  setTransition: (type: RouteTransitionValue) => void; // 设置路由过渡类型
  fixedHeader: boolean; // 是否固定顶栏
  setFixedHeader: (val: boolean) => void; // 设置是否固定顶栏,
  showTabs: boolean; // 是否显示标签页
  setShowTabs: (val: boolean) => void; // 设置是否显示标签页
  showFooter: boolean; // 是否显示底部
  setShowFooter: (val: boolean) => void; // 设置是是否显示底部
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      isMobile: false,
      setIsMobile: (value) => set({ isMobile: value }),
      primaryColor: (semanticColors.light.primary as { DEFAULT: string }).DEFAULT, // 默认主题色
      setPrimaryColor: (color) => {
        set({ primaryColor: color })
        if (typeof document !== 'undefined') {
          document.documentElement.style.setProperty('--heroui-primary', HexToHSLValue(color))
        }
      },
      transition: ROUTE_TRANSITION.BLUR_SLIDE,
      setTransition: (value) => set({ transition: value }),
      fixedHeader: true,
      setFixedHeader: (value) => set({ fixedHeader: value }),
      showTabs: true,
      setShowTabs: (value) => set({ showTabs: value }),
      showFooter: true,
      setShowFooter: (value) => set({ showFooter: value }),
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
