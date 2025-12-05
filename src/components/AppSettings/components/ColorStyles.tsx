/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 14:51:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 14:58:55
 * @Description: 色彩风格
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { type FC } from "react";

import { Button } from '@/components/animate-ui/components/buttons/button';
import { COLOR_STYLE } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const ColorStyles: FC = () => {
  const colorStyle = useAppStore((s) => s.colorStyle);
  const setColorStyle = useAppStore((s) => s.setColorStyle);
  const t = useTranslations('Enums');

  return (
    <div className="grid grid-cols-3 gap-2">
      {COLOR_STYLE.items.map(({ value, raw }) => (
        <Button
          size="sm"
          aria-label="ColorStyles"
          variant={colorStyle === value ? "default" : "outline"}
          key={value}
          className="text-xs"
          onClick={() => setColorStyle(value)}
        >
          <DynamicIcon name={raw.icon} />
          {t(raw.label)}
        </Button>
      ))}
    </div>
  )
}
export default ColorStyles;