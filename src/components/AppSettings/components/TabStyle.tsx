/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-05 15:56:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-08 09:35:06
 * @Description: 标签页风格
 */
import { DynamicIcon } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';
import { type FC } from "react";

import { Button } from '@/components/ui';
import { TABS_STYLE } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const TabStyle: FC = () => {
  const tabStyle = useAppStore((s) => s.tabStyle);
  const setTabStyle = useAppStore((s) => s.setTabStyle);
  const t = useTranslations('Enums');

  return (
    <div className="grid grid-cols-2 gap-2">
      {TABS_STYLE.items.map(({ value, raw }) => (
        <Button
          size="sm"
          aria-label="TabStyle"
          variant={tabStyle === value ? "default" : "outline"}
          key={value}
          className="text-xs"
          onClick={() => setTabStyle(value)}
        >
          <DynamicIcon name={raw.icon} />
          {t(raw.label)}
        </Button>
      ))}
    </div>
  )
}
export default TabStyle;