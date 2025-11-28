/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:53:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 13:53:50
 * @Description: 上下文提供者
 */
"use client"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { CustomProvider } from 'rsuite';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

import { THEME_MODE } from '@/lib/constant'

type ProvidersProps = {
  children: React.ReactNode;
};
export function Providers({ children }: ProvidersProps) {
  const { resolvedTheme } = useTheme();
  return (
    <NextThemesProvider attribute="class" defaultTheme={process.env.NEXT_PUBLIC_THEME || THEME_MODE.LIGHT}>
      <CustomProvider>
        {children}
        <SonnerToaster theme={resolvedTheme as ToasterProps['theme']} position="top-center" richColors />
      </CustomProvider>
    </NextThemesProvider>
  );
}