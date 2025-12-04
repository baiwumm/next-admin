/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-03 11:29:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 14:57:06
 * @Description: 主题设置
 */
"use client"
import { SwatchBook } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import ColorStyles from './components/ColorStyles';
import PrimaryColorPicker from './components/PrimaryColorPicker';
import ThemeToggle from './components/ThemeToggle';
import ThemeToggleDirection from './components/ThemeToggleDirection';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/animate-ui/components/radix/popover';

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
        <div className="flex flex-col gap-3">
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
          {/* 色彩风格 */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-sm">{t('color-style')}</h1>
            <ColorStyles />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
export default AppSettings;