/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-03 11:29:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-08 10:46:53
 * @Description: 主题设置
 */
"use client"
import { SwatchBook } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import ColorStyles from './components/ColorStyles';
import FixedHeader from './components/FixedHeader';
import PrimaryColorPicker from './components/PrimaryColorPicker';
import ShowFooter from './components/ShowFooter';
import ShowTabs from './components/ShowTabs';
import TabStyle from './components/TabStyle';
import ThemeToggle from './components/ThemeToggle';
import ThemeToggleDirection from './components/ThemeToggleDirection';
import RouteTranstion from './components/RouteTranstion';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

const AppSettings: FC = () => {
  const t = useTranslations('Components.AppSettings');
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" aria-label="AppSettings" variant="ghost" className="rounded-full">
          <SwatchBook />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-85 md:w-100">
        <div className="flex flex-col gap-4">
          {/* 主题色 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('primary-color')}</h1>
            <PrimaryColorPicker />
          </div>
          {/* 主题模式 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('theme-mode')}</h1>
            <ThemeToggle />
          </div>
          {/* 主题切换方向 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('theme-mode-direction')}</h1>
            <ThemeToggleDirection />
          </div>
          {/* 路由过渡动画 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('route-transition')}</h1>
            <RouteTranstion />
          </div>
          {/* 色彩风格 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('color-style')}</h1>
            <ColorStyles />
          </div>
          {/* 标签页风格 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('tabs-style')}</h1>
            <TabStyle />
          </div>
          {/* 是否固定顶部 */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-sm">{t('fixed-header')}</h1>
            <FixedHeader />
          </div>
          {/* 是否显示标签页 */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-sm">{t('show-tabs')}</h1>
            <ShowTabs />
          </div>
          {/* 是否显示底部 */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-sm">{t('show-footer')}</h1>
            <ShowFooter />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default AppSettings;