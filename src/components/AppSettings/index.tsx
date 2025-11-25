/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 10:51:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 08:52:28
 * @Description: 主题设置
 */
import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useTranslations } from 'next-intl';
import { useTheme } from "next-themes";
import { type FC } from 'react';

import FixedHeader from './_components/FixedHeader';
import PrimaryColorPicker from './_components/PrimaryColorPicker';
import RouteTranstionSelect from './_components/RouteTranstionSelect';
import ShowFooter from './_components/ShowFooter';
import ShowTabs from './_components/ShowTabs';

import { THEME_MODE } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

const AppSettings: FC = () => {
  const t = useTranslations('Components.AppSettings');
  const { theme } = useTheme();
  const isLight = theme === THEME_MODE.LIGHT;
  const primaryColor = useAppStore((s) => s.primaryColor);
  const blackHex = '#000000';
  const isBlack = blackHex === primaryColor;
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
          <Icon icon="uil:swatchbook" className={cn('text-lg', !isLight && isBlack ? 'text-white' : null)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-3">
          {/* 主题色选择器 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{t('PrimaryColor')}</h1>
            <PrimaryColorPicker />
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