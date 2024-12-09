/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-09 09:43:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-09 10:02:07
 * @Description: 主题切换按钮
 */
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeModeButton() {
  const { theme, setTheme } = useTheme();

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // 切换动画
  async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
    const isDark = theme === 'dark';

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
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleDark}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
