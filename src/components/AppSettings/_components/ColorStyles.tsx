/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-25 14:50:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 15:13:46
 * @Description: 
 */
import { Button } from "@heroui/react";
import { map, values } from 'es-toolkit/compat'
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { COLOR_STYLE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

const ColorStyles: FC = () => {
  const t = useTranslations('Components.AppSettings');
  const colorStyle = useAppStore((s) => s.colorStyle);
  const setColorStyle = useAppStore((s) => s.setColorStyle);
  return (
    <div className="grid grid-cols-3 gap-2">
      {map(values(COLOR_STYLE), color => (
        <Button
          variant={color === colorStyle ? 'flat' : 'ghost'}
          size='sm'
          className='justify-start'
          key={color}
          onPress={() => setColorStyle(color)}
        >
          {t(`color-${color}`)}
        </Button>
      ))}
    </div>
  )
}
export default ColorStyles;