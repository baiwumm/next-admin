/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-25 16:59:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 17:52:34
 * @Description: 标签页风格
 */
import { Button } from "@heroui/react";
import { map, values } from 'es-toolkit/compat'
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { TABS_STYLE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

const TabStyle: FC = () => {
  const t = useTranslations('Components.AppSettings');
  const tabStyle = useAppStore((s) => s.tabStyle);
  const setTabStyle = useAppStore((s) => s.setTabStyle);
  return (
    <div className="grid grid-cols-3 gap-2">
      {map(values(TABS_STYLE), tag => {
        const isActive = tag === tabStyle;
        return (
          <Button
            variant={isActive ? 'solid' : 'ghost'}
            color={isActive ? 'primary' : 'default'}
            size='sm'
            key={tag}
            onPress={() => setTabStyle(tag)}
          >
            {t(`tabs-${tag}`)}
          </Button>
        )
      })}
    </div>
  )
}
export default TabStyle;