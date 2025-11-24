/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 10:58:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 13:54:43
 * @Description: 路由过渡效果
 */
'use client'
import { Select, SelectItem, type SharedSelection } from "@heroui/react";
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { ROUTE_TRANSITION, type RouteTransitionValue } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

type Option = {
  key: RouteTransitionValue,
  label: string;
}

const RouteTranstionSelect: FC = () => {
  const t = useTranslations('Components.AppSettings');
  const transition = useAppStore((s) => s.transition);
  const setTransition = useAppStore((s) => s.setTransition);

  // 路由动画配置项
  const TransitionOptions: Option[] = [
    { key: ROUTE_TRANSITION.BLUR_SLIDE, label: t('blurSlide') },
    { key: ROUTE_TRANSITION.FADE, label: t('fade') },
    { key: ROUTE_TRANSITION.BLUR, label: t('blur') },
    { key: ROUTE_TRANSITION.SLIDE, label: t('slide') },
    { key: ROUTE_TRANSITION.ZOOM, label: t('zoom') },
    { key: ROUTE_TRANSITION.SWING, label: t('swing') },
    { key: ROUTE_TRANSITION.FLIP, label: t('flip') },
    { key: ROUTE_TRANSITION.SLIDE_UP, label: t('slideUp') },
    { key: ROUTE_TRANSITION.DIAGONAL, label: t('diagonal') }
  ]

  // 切换回调
  const onSelectionChange = ([key]: SharedSelection) => {
    setTransition(key as RouteTransitionValue)
  }
  return (
    <Select
      aria-label="RouteTranstionSelect"
      className="w-full"
      size='sm'
      variant="bordered"
      color='primary'
      selectedKeys={new Set([transition])}
      onSelectionChange={onSelectionChange}
    >
      {TransitionOptions.map((i) => (
        <SelectItem key={i.key}>{i.label}</SelectItem>
      ))}
    </Select>
  )
}
export default RouteTranstionSelect;