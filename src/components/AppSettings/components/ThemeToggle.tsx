/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-03 13:38:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-12 10:33:30
 * @Description: 主题模式
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { useTheme } from "next-themes";
import { type FC, useEffect, useState } from "react";

import {
  type Resolved,
  type ThemeSelection,
  ThemeToggler as ThemeTogglerPrimitive
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import { Button } from '@/components/ui';
import { THEME_MODE } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const ThemeToggle: FC = () => {
  const themeModeDirection = useAppStore((s) => s.themeModeDirection);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('Enums');
  const [mounted, setMounted] = useState(false);

  // 在客户端加载后，更新 mounted 状态，避免服务端渲染时的差异
  // 延迟更新 mounted 状态
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0); // 延迟到下一轮渲染
    return () => clearTimeout(timer);
  }, []);

  // 如果组件还没有挂载，返回一个空元素或者加载状态
  if (!mounted) {
    return null; // 或者可以返回一个 loading 动画
  }

  return (
    <ThemeTogglerPrimitive
      theme={theme as ThemeSelection}
      resolvedTheme={resolvedTheme as Resolved}
      setTheme={setTheme}
      direction={themeModeDirection}
    >
      {({ toggleTheme }) => (
        <div className="grid grid-cols-3 gap-2">
          {THEME_MODE.items.map(({ value, raw }) => (
            <Button
              size="sm"
              aria-label="ThemeToggle"
              variant={theme === value ? "primary" : "outline"}
              key={value}
              className="text-xs"
              onClick={() => {
                if (value === theme) {
                  return
                }
                toggleTheme(value)
              }}
            >
              <DynamicIcon name={raw.icon} />
              {t(raw.label)}
            </Button>
          ))}
        </div>
      )}
    </ThemeTogglerPrimitive>
  )
}
export default ThemeToggle;