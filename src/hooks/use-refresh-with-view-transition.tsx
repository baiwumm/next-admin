'use client';

import { useCallback, useState, useTransition } from 'react';

// 定义一个 Hook 来处理局部刷新和 View Transition
export const useRefreshWithViewTransition = () => {
  // 1. 用于强制 children 刷新的 key
  const [refreshKey, setRefreshKey] = useState(0);
  // 2. React 18 的 useTransition
  const [isPending, startTransition] = useTransition();

  const refreshContent = useCallback(() => {
    // 检查浏览器是否支持 View Transition API
    const isSupported = typeof document !== 'undefined' && 'startViewTransition' in document;

    if (isSupported) {
      // 在 React Transition 内部，更新 key 来强制 children 重新挂载
      startTransition(() => {
        setRefreshKey(prev => prev + 1); // 递增 key
      });
    } else {
      // 不支持 View Transition，直接刷新 key
      startTransition(() => {
        setRefreshKey(prev => prev + 1);
      });
    }
  }, []);

  return { refreshKey, refreshContent, isPending };
};