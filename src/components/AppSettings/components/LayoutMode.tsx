/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 17:14:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-08 17:17:46
 * @Description: 布局模式
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { type FC } from "react";

import { Button } from '@/components/ui';
import { LAYOUT_MODE } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const LayoutMode: FC = () => {
  const layoutMode = useAppStore((s) => s.layoutMode);
  const setLayoutMode = useAppStore((s) => s.setLayoutMode);
  const t = useTranslations('Enums');

  return (
    <div className="grid grid-cols-2 gap-2">
      {LAYOUT_MODE.items.map(({ value, raw }) => (
        <Button
          size="sm"
          aria-label="LayoutMode"
          variant={layoutMode === value ? "primary" : "outline"}
          key={value}
          className="text-xs"
          onClick={() => setLayoutMode(value)}
        >
          <DynamicIcon name={raw.icon} />
          {t(raw.label)}
        </Button>
      ))}
    </div>
  )
}
export default LayoutMode;