/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 15:35:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-06 16:01:01
 * @Description: 菜单状态
 */
'use client'
import { create } from 'zustand';

import { isSuccess } from '@/lib/utils';
import { getMenuList } from '@/services/system-settings/menu-manage';

interface MenuState {
  menuList: App.SystemSettings.Menu[]
  loading: boolean
  setMenuList: (list: App.SystemSettings.Menu[]) => void
  fetchMenuList: () => Promise<void>
}

export const useMenuStore = create<MenuState>((set) => ({
  menuList: [], // 菜单数据
  loading: false, // 请求状态

  setMenuList: (list) => set({ menuList: list }),

  /**
   * @description: 请求菜单列表
   */
  async fetchMenuList() {
    try {
      set({ loading: true })
      const res = await getMenuList();
      if (isSuccess(res.code)) {
        set({ menuList: res.data })
      }
    } finally {
      set({ loading: false })
    }
  },
}))