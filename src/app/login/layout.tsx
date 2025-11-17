/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 10:04:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 10:29:47
 * @Description: 登录页布局
 */
'use client';

import { useLocale } from 'next-intl'
import { useTheme } from "next-themes";

import Footer from '@/components/Footer'
import LangSwitch from '@/components/LangSwitch'
import PrimaryColorPicker from '@/components/PrimaryColorPicker'
import Squares from '@/components/Squares';
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { type Locale } from '@/i18n/config'
import { THEME_MODE } from '@/lib/constant'

type LoginLayoutProps = {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  const locale = useLocale() as Locale; // ✅ next-intl 内置 hook
  const { theme } = useTheme();
  const isDark = theme === THEME_MODE.DARK;
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen overflow-hidden justify-center items-center">
      {children}
      {/* 右上角按钮 */}
      <div className="absolute justify-center items-center top-2 right-2">
        <PrimaryColorPicker />
        <ThemeSwitcher />
        <LangSwitch locale={locale} />
      </div>
      {/* 背景 */}
      <div className="absolute top-0 left-0 w-full h-full -z-[1]">
        <Squares
          speed={0.2}
          squareSize={40}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor={isDark ? '#3A3A3A' : '#D1D1D1'} // 暗黑模式用深灰，浅色模式用浅灰
          hoverFillColor={isDark ? '#2C2C2C' : '#B0B0B0'} // 暗黑模式用更深的灰色，浅色模式用略深的灰色
        />
      </div>
      {/* 底部版权 */}
      <div className="absolute justify-center items-center bottom-2">
        <Footer />
      </div>
    </div>
  );
}