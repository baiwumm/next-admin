/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-15 15:54:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-15 15:57:00
 * @Description: 用户相关信息
 */
import { create } from 'zustand';

type UserState = {
  menuList: App.SystemManage.Menu[];
  setMenuList: (list: App.SystemManage.Menu[]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  menuList: [],
  setMenuList: (list) => set({ menuList: list }),
}));
