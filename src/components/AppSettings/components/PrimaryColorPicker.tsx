/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-03 17:32:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 17:37:40
 * @Description: 主题色切换
 */
import { type FC } from "react";

import { Button } from '@/components/animate-ui/components/buttons/button';
import { THEME_PRIMARY_COLOR } from '@/lib/enums';
import { useAppStore } from '@/store/useAppStore';

const PrimaryColorPicker: FC = () => {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const setPrimaryColor = useAppStore((s) => s.setPrimaryColor);

  return (
    <div className="grid grid-cols-3 gap-2">
      {THEME_PRIMARY_COLOR.items.map(({ value, label, raw }) => (
        <Button
          size="sm"
          aria-label="PrimaryColorPicker"
          variant={primaryColor === value ? "default" : "outline"}
          key={value}
          className="text-xs justify-start"
          onClick={() => setPrimaryColor(value)}
        >
          <span className="inline-block size-2 rounded-full"
            style={{ backgroundColor: raw.color }} />
          {label}
        </Button>
      ))}
    </div>
  )
}
export default PrimaryColorPicker;