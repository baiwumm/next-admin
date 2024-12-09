/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 16:54:06
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:21:18
 * @Description: 全局状态
 */
import { create } from 'zustand';

type Store = {
  userInfo: Record<string, any>; // 用户信息
};

const useStore = create<Store>((set, get) => ({
  userInfo: {},
}));

export default useStore;
