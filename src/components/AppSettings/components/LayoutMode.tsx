/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 17:14:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-11 09:23:19
 * @Description: 布局模式
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { type FC, useCallback } from "react";

import { getClipKeyframes } from '@/components/animate-ui/primitives/effects/theme-toggler';
import { Button } from '@/components/ui';
import { LAYOUT_MODE } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const LayoutMode: FC = () => {
  const layoutMode = useAppStore((s) => s.layoutMode);
  const setLayoutMode = useAppStore((s) => s.setLayoutMode);
  const t = useTranslations('Enums');
  const themeModeDirection = useAppStore((s) => s.themeModeDirection);

  const [fromClip, toClip] = getClipKeyframes(themeModeDirection);

  // 模式切换
  const handleLayoutMode = useCallback(async (mode: typeof LAYOUT_MODE.valueType) => {
    if ((!document.startViewTransition)) {
      setLayoutMode(mode);
      return;
    }
    await document.startViewTransition(async () => {
      setLayoutMode(mode);
    }).ready;
    document.documentElement
      .animate(
        { clipPath: [fromClip, toClip] },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
  }, [setLayoutMode, fromClip, toClip])
  return (
    <div className="grid grid-cols-2 gap-2">
      {LAYOUT_MODE.items.map(({ value, raw }) => (
        <Button
          size="sm"
          aria-label="LayoutMode"
          variant={layoutMode === value ? "primary" : "outline"}
          key={value}
          className="text-xs"
          onClick={() => handleLayoutMode(value)}
        >
          <DynamicIcon name={raw.icon} />
          {t(raw.label)}
        </Button>
      ))}
    </div>
  )
}
export default LayoutMode;