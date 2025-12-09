/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 10:27:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-09 14:31:41
 * @Description: 路由过渡动画
 */
import { useTranslations } from 'next-intl';
import { type FC } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { ROUTE_TRANSITION } from '@/enums';
import { useAppStore } from '@/store/useAppStore';

const RouteTranstion: FC = () => {
  const transition = useAppStore((s) => s.transition);
  const setTransition = useAppStore((s) => s.setTransition);
  const t = useTranslations('Enums');

  return (
    <Select value={transition} onValueChange={setTransition}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {ROUTE_TRANSITION.items.map(({ value, raw }) => (
            <SelectItem key={value} value={value}>{t(raw.label)}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default RouteTranstion;