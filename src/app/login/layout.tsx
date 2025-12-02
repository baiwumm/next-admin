/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-01 10:01:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 13:39:18
 * @Description: 登录页布局
 */
"use client"
import { useTheme } from "next-themes";
import { type ReactNode } from 'react';

import Footer from '@/components/Footer';
import Squares from '@/components/Squares';
import { THEME_MODE } from '@/lib/constant';

type LoginLayoutProps = {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === THEME_MODE.DARK;
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen overflow-hidden justify-center items-center">
      {children}
      {/* 背景 */}
      <div className="absolute top-0 left-0 w-full h-full -z-1">
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
  )
}