/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-09 09:43:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-02 11:35:34
 * @Description: 主题切换按钮
 */
'use client';

import { Button, Tooltip } from '@nextui-org/react';
import { RiMoonLine, RiSunLine } from '@remixicon/react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { MouseEventHandler } from 'react';

export default function ThemeModeButton() {
  const t = useTranslations('App');
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // 切换动画
  const toggleDark: MouseEventHandler<HTMLButtonElement> = async ({ clientX: x, clientY: y }) => {
    if (!enableTransitions()) {
      setTheme(theme === 'light' ? 'dark' : 'light');
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
    ];

    await document.startViewTransition(async () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }).ready;

    document.documentElement.animate(
      { clipPath: !isDark ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${!isDark ? 'old' : 'new'}(root)`,
      },
    );
  };

  return (
    <Tooltip showArrow content={isDark ? t('dark') : t('light')} placement="bottom">
      <Button variant="light" size="sm" isIconOnly onClick={toggleDark}>
        <RiSunLine size={16} className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        <RiMoonLine
          size={16}
          className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
        />
      </Button>
    </Tooltip>
  );
}
