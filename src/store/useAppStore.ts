/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 17:21:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-10 11:06:28
 * @Description: 全局状态
 */
'use client'
import { semanticColors } from "@heroui/theme";
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { HexToHSLValue } from '@/lib/utils'

type AppState = {
  isMobile: boolean
  setIsMobile: (value: boolean) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
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
