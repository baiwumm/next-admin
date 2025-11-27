/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 10:51:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-27 12:29:22
 * @Description: 主题设置
 */
"use client"
import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useTranslations } from 'next-intl';
import { useTheme } from "next-themes";
import { type FC, useMemo } from 'react';

import ColorStyles from './_components/ColorStyles';
import FixedHeader from './_components/FixedHeader';
import PrimaryColorPicker from './_components/PrimaryColorPicker';
import RouteTranstionSelect from './_components/RouteTranstionSelect';
import ShowFooter from './_components/ShowFooter';
import ShowTabs from './_components/ShowTabs';
import TabStyle from './_components/TabStyle';

import { THEME_MODE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

const AppSettings: FC = () => {
  const t = useTranslations('Components.AppSettings');
  const { resolvedTheme } = useTheme();
  const primaryColor = useAppStore((s) => s.primaryColor);

  const iconColor = useMemo(() => {
    // resolvedTheme 在 SSR 时可能为 undefined，此时按 light 处理
    const isLight = resolvedTheme !== THEME_MODE.DARK; // system/light 都算 light
    const isBlack = primaryColor === '#000000';

    if (isBlack) {
      return isLight ? 'text-black' : 'text-white';
    }
    return '';
  }, [resolvedTheme, primaryColor]);
  return (
    <Popover
      placement="bottom"
      showArrow={true}
      backdrop="opaque"
      classNames={{
        content: ["p-3"],
      }}
    >
      <PopoverTrigger>
        <Button isIconOnly aria-label="AppSettings" variant="light" radius="full" color='primary'>
          <Icon icon="uil:swatchbook" className={cn('text-lg', iconColor)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3">
          {/* 主题色选择器 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{t('PrimaryColor')}</h1>
            <PrimaryColorPicker />
          </div>
          {/* 色彩风格 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{t('color-style')}</h1>
            <ColorStyles />
          </div>
          {/* 标签页风格 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{t('tabs-style')}</h1>
            <TabStyle />
          </div>
          {/* 路由过渡动画 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{t('RouteTranstion')}</h1>
            <RouteTranstionSelect />
          </div>
          {/* 固定顶部 */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold">{t('fixedHeader')}</h1>
            <FixedHeader />
          </div>
          {/* 是否显示标签页 */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold">{t('showTabs')}</h1>
            <ShowTabs />
          </div>
          {/* 是否显示底部 */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold">{t('showFooter')}</h1>
            <ShowFooter />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default AppSettings;