/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-03 17:32:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 14:59:46
 * @Description: 主题色切换
 */
import { type FC, useCallback } from "react";

import { Button } from '@/components/animate-ui/components/buttons/button';
import { getClipKeyframes } from '@/components/animate-ui/primitives/effects/theme-toggler';
import { THEME_PRIMARY_COLOR } from '@/lib/enums';
import { useAppStore } from '@/store/useAppStore';

const PrimaryColorPicker: FC = () => {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const setPrimaryColor = useAppStore((s) => s.setPrimaryColor);
  const themeModeDirection = useAppStore((s) => s.themeModeDirection);

  const [fromClip, toClip] = getClipKeyframes(themeModeDirection);

  // 点击颜色切换
  const onChangeColor = useCallback(async (color: typeof THEME_PRIMARY_COLOR.valueType) => {
    if ((!document.startViewTransition)) {
      setPrimaryColor(color);
      return;
    }
    await document.startViewTransition(async () => {
      setPrimaryColor(color);
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
  }, [setPrimaryColor, fromClip, toClip])
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {THEME_PRIMARY_COLOR.items.map(({ value, label, raw }) => (
          <Button
            size="sm"
            aria-label="PrimaryColorPicker"
            variant={primaryColor === value ? "secondary" : "outline"}
            key={value}
            className="text-xs justify-start"
            onClick={() => onChangeColor(value)}
          >
            <span className="inline-block size-2 rounded-full"
              style={{ backgroundColor: raw.color }} />
            {label}
          </Button>
        ))}
      </div>
      <style>{`::view-transition-old(root), ::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
    </>
  )
}
export default PrimaryColorPicker;