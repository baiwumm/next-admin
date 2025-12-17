/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 18:00:42
 * @Description: 上下文提供者
 */
"use client"
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { MotionConfig } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from 'react';

import BackTop from '@/components/BackTop'
import GlobalLayout from '@/components/GlobalLayout';
import { Toaster, TooltipProvider } from '@/components/ui';
import { THEME_MODE } from '@/enums';
import { initializeColorStyle, initializePrimaryColor } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore';

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const colorStyle = useAppStore((s) => s.colorStyle);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);

  // 受保护的路由，不需要 RootLayout
  const protectedRoutes = ['/login', '/portfolio']

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

  useEffect(() => {
    if (!menuList?.length) {
      // 加载菜单数据
      fetchMenuList()
    }
  }, [fetchMenuList, menuList])

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null
  }
  return (
    <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME || THEME_MODE.LIGHT}>
      <MotionConfig reducedMotion="user">
        <ProgressProvider
          color="var(--primary)"
          options={{ showSpinner: true }}
          shallowRouting
        >
          <TooltipProvider>
            {protectedRoutes.includes(pathname) ? children : (
              <GlobalLayout>
                {children}
              </GlobalLayout>
            )}
          </TooltipProvider>
          <Toaster position="top-center" />
          {/* 回到顶部按钮 */}
          <BackTop />
        </ProgressProvider>
      </MotionConfig>
    </NextThemesProvider>
  );
}