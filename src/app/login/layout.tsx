'use client';

import { useMount, useUnmount } from 'ahooks';

import LangSwitch from '@/components/LangSwitch';
import ThemeModeButton from '@/components/ThemeModeButton';
import { useLayoutStore } from '@/store/layoutStore';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  useMount(() => {
    useLayoutStore.setState({ skipGlobalLayout: true });
  });

  useUnmount(() => {
    // 如果需要在离开页面时重置状态
    useLayoutStore.setState({ skipGlobalLayout: false });
  });
  return (
    <div className="relative flex h-[calc(100vh_-_2rem)] w-[calc(100vw_-_2rem)] overflow-hidden justify-center items-center">
      {children}
      <div className="flex absolute top-0 right-0">
        <ThemeModeButton />
        <LangSwitch />
      </div>
    </div>
  );
}
