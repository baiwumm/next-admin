/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 10:04:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-31 17:33:00
 * @Description: 登录页布局
 */
'use client';

import { useMount, useUnmount } from 'ahooks';
import { useLocale } from 'next-intl'

import LangSwitch from '@/components/LangSwitch'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { type Locale } from '@/i18n/config'
import { useLayoutStore } from '@/store/layoutStore';

type LoginLayoutProps = {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  const locale = useLocale() as Locale; // ✅ next-intl 内置 hook

  useMount(() => {
    useLayoutStore.setState({ skipGlobalLayout: true });
  });

  useUnmount(() => {
    // 如果需要在离开页面时重置状态
    useLayoutStore.setState({ skipGlobalLayout: false });
  });
  return (
    <div className="relative flex h-screen w-screen overflow-hidden justify-center items-center">
      {children}
      <div className="flex justify-center items-center fixed top-2 right-2">
        <ThemeSwitcher />
        <LangSwitch locale={locale} />
      </div>
    </div>
  );
}