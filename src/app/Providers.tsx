/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-07 16:16:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 10:13:21
 * @Description: NextUI 配置文件
 */
'use client'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { HeroUIProvider } from '@heroui/react';
import { startsWith } from 'es-toolkit/compat'
import { type ReactNode, useEffect } from 'react';

import { type Locale, locales } from '@/i18n/config'
import { HexToHSLValue } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore';

type ProvidersProps = {
  children: ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  const { primaryColor } = useAppStore();
  // 初始化时设置 CSS 变量
  useEffect(() => {
    if (typeof document !== 'undefined' && startsWith(primaryColor, '#')) {
      document.documentElement.style.setProperty('--heroui-primary', HexToHSLValue(primaryColor))
    }
  }, [primaryColor])
  return (
    <ProgressProvider
      color={primaryColor}
      options={{ showSpinner: true }}
      shallowRouting
    >
      <HeroUIProvider locale={locale === locales[1] ? 'en-US' : 'zh-CN'}>
        {children}
      </HeroUIProvider>
    </ProgressProvider>
  )
}