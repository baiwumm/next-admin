/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 13:39:27
 * @Description: 上下文提供者
 */
"use client"
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { startsWith } from 'es-toolkit/compat';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from 'react';
import { CustomProvider } from 'rsuite';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

import TopMenuLayout from '@/components/TopMenuLayout';
import { COLOR_STYLE, THEME_MODE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  const { resolvedTheme } = useTheme();
  const primaryColor = useAppStore((s) => s.primaryColor);
  const colorStyle = useAppStore((s) => s.colorStyle);
  const pathname = usePathname();

  // 受保护的路由，不需要 RootLayout
  const protectedRoutes = ['/login']

  // 初始化时设置 CSS 变量
  useEffect(() => {
    if (typeof document !== 'undefined' && startsWith(primaryColor, '#')) {
      document.documentElement.style.setProperty('--accent', primaryColor)
    }
  }, [primaryColor])

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
        <CustomProvider>
          {protectedRoutes.includes(pathname) ? children : (
            <TopMenuLayout>
              {children}
            </TopMenuLayout>
          )}
          <SonnerToaster theme={resolvedTheme as ToasterProps['theme']} position="top-center" richColors />
        </CustomProvider>
      </ProgressProvider>
    </NextThemesProvider>
  );
}