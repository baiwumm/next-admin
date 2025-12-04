/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 11:15:32
 * @Description: 上下文提供者
 */
"use client"
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { MotionConfig } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from 'react';

import TopMenuLayout from '@/components/TopMenuLayout';
import { Toaster } from '@/components/ui/sonner';
import { THEME_MODE } from '@/lib/enums';
import { initializeColorStyle, initializePrimaryColor } from '@/lib/utils';
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

  // 初始化主题色
  useEffect(() => {
    if (primaryColor) {
      initializePrimaryColor(primaryColor);
    }
  }, [primaryColor])

  // 初始化色彩风格
  useEffect(() => {
    if (colorStyle) {
      initializeColorStyle(colorStyle);
    }
  }, [colorStyle])
  return (
    <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME || THEME_MODE.LIGHT}>
      <MotionConfig reducedMotion="user">
        <ProgressProvider
          color="var(--primary)"
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
      </MotionConfig>
    </NextThemesProvider>
  );
}