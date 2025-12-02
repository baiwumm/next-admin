/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 17:49:04
 * @Description: 上下文提供者
 */
"use client"
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from 'react';

import TopMenuLayout from '@/components/TopMenuLayout';
import { Toaster } from '@/components/ui/sonner';
import { COLOR_STYLE, THEME_MODE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const colorStyle = useAppStore((s) => s.colorStyle);
  const pathname = usePathname();

  // 受保护的路由，不需要 RootLayout
  const protectedRoutes = ['/login']

  // 初始化色彩风格
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.classList.remove(`color-${COLOR_STYLE.GREY}`, `color-${COLOR_STYLE.INVERT}`);
      if (colorStyle !== COLOR_STYLE.DEFAULT) {
        html.classList.add(`color-${colorStyle}`);
      }
    }
  }, [colorStyle])
  return (
    <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME || THEME_MODE.LIGHT}>
      <ProgressProvider
        color={primaryColor}
        options={{ showSpinner: true }}
        shallowRouting
      >
        {protectedRoutes.includes(pathname) ? children : (
          <TopMenuLayout>
            {children}
          </TopMenuLayout>
        )}
        <Toaster position="top-center" />
      </ProgressProvider>
    </NextThemesProvider>
  );
}