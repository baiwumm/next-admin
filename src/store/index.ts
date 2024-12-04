/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 16:54:06
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:21:18
 * @Description: 全局状态
 */
import storage from 'store';
import { create } from 'zustand';

import { LOCAL_KEY, THEME } from '@/enums';

type Store = {
  theme: App.ThemeMode; // 主题模式
  setTheme: (theme: App.ThemeMode) => void; // 设置主题模式
  isDark: () => boolean; // 是否为暗黑模式
};

const useStore = create<Store>((set, get) => ({
  theme: storage.get(LOCAL_KEY.THEME) || (process.env.NEXT_PUBLIC_THEME_MODE as App.ThemeMode) || THEME.LIGHT,
  setTheme: (theme) => {
    set(() => ({ theme }));
    storage.set(LOCAL_KEY.THEME, theme);
  },
  isDark: () => get().theme === THEME.DARK,
}));

export default useStore;
