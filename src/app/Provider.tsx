/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 08:56:57
 * @Description: 上下文提供者
 */
"use client"
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { MotionConfig } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import TopMenuLayout from '@/components/TopMenuLayout';
import { Toaster } from '@/components/ui/sonner';
import { THEME_MODE } from '@/lib/enums';
import { useAppStore } from '@/store/useAppStore';

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const pathname = usePathname();

  // 受保护的路由，不需要 RootLayout
  const protectedRoutes = ['/login']
  return (
    <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME || THEME_MODE.LIGHT}>
      <MotionConfig reducedMotion="user">
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
      </MotionConfig>
    </NextThemesProvider>
  );
}