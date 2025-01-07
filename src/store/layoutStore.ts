/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-03 16:57:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-03 16:58:08
 * @Description: 是否跳过全局布局
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
