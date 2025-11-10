/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 10:04:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-10 14:25:50
 * @Description: 登录页布局
 */
'use client';

import { useLocale } from 'next-intl'

import LangSwitch from '@/components/LangSwitch'
import PrimaryColorPicker from '@/components/PrimaryColorPicker'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { type Locale } from '@/i18n/config'

type LoginLayoutProps = {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  const locale = useLocale() as Locale; // ✅ next-intl 内置 hook
  return (
    <div className="relative flex h-screen w-screen overflow-hidden justify-center items-center">
      {children}
      <div className="flex justify-center items-center fixed top-2 right-2">
        <PrimaryColorPicker />
        <ThemeSwitcher />
        <LangSwitch locale={locale} />
      </div>
    </div>
  );
}