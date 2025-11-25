/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-07 16:16:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 14:55:29
 * @Description: NextUI 配置文件
 */
'use client'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { HeroUIProvider } from '@heroui/react';
import { startsWith } from 'es-toolkit/compat'
import { type ReactNode, useEffect } from 'react';

import { type Locale, locales } from '@/i18n/config'
import { COLOR_STYLE } from '@/lib/constant';
import { HexToHSLValue } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore';

type ProvidersProps = {
  children: ReactNode;
  locale: Locale;
}

export function Providers({ children, locale }: ProvidersProps) {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const colorStyle = useAppStore((s) => s.colorStyle);
  // 初始化时设置 CSS 变量
  useEffect(() => {
    if (typeof document !== 'undefined' && startsWith(primaryColor, '#')) {
      document.documentElement.style.setProperty('--heroui-primary', HexToHSLValue(primaryColor))
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