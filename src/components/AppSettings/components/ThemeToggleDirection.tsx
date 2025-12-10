/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-03 16:06:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-10 14:56:12
 * @Description: 主题模式切换方向
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { type FC } from "react";

import { Button } from '@/components/ui';
import { THEME_MODE_DIRECTION } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const ThemeToggleDirection: FC = () => {
  const themeModeDirection = useAppStore((s) => s.themeModeDirection);
  const setThemeModeDirection = useAppStore((s) => s.setThemeModeDirection);
  const t = useTranslations('Enums');

  return (
    <div className="grid grid-cols-4 gap-2">
      {THEME_MODE_DIRECTION.items.map(({ value, raw }) => (
        <Button
          size="sm"
          aria-label="ThemeToggleDirection"
          variant={themeModeDirection === value ? "primary" : "outline"}
          key={value}
          className="text-xs"
          onClick={() => setThemeModeDirection(value)}
        >
          <DynamicIcon name={raw.icon} />
          {t(raw.label)}
        </Button>
      ))}
    </div>
  )
}
export default ThemeToggleDirection;