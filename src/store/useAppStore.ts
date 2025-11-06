/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 17:21:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-06 17:21:50
 * @Description: 全局状态
 */
'use client'

import { create } from 'zustand'

interface AppState {
  isMobile: boolean
  setIsMobile: (value: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
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
