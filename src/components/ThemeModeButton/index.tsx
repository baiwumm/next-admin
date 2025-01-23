/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-09 09:43:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 17:05:08
 * @Description: 主题切换按钮
 */
'use client';
import { Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
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
      <button
        className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent  outline-none text-tiny rounded-small px-0 gap-0 transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-default-foreground hover:bg-default/40 min-w-8 w-8 h-8"
        onClick={toggleDark}
      >
        <Icon
          icon="ri:sun-line"
          className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 size-4"
        />
        <Icon
          icon="ri:moon-line"
          className="absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 size-4"
        />
      </button>
    </Tooltip>
  );
}
