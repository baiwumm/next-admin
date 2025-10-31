/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 16:27:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-31 16:27:13
 * @Description: 全局布局状态
 */
import { create } from 'zustand';

type LayoutState = {
  skipGlobalLayout: boolean;
  setSkipGlobalLayout: (skip: boolean) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  skipGlobalLayout: false,
  setSkipGlobalLayout: (skip) => set({ skipGlobalLayout: skip }),
}));