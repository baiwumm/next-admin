/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-20 16:13:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 16:52:21
 * @Description: 全屏
 */
'use client';
import { Icon } from '@iconify/react';
import { Button, cn, Tooltip } from '@heroui/react';
import { useFullscreen } from 'ahooks';
import { useTranslations } from 'next-intl';

export default function FullScreen() {
  const t = useTranslations('App');
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <Tooltip showArrow content={isFullscreen ? t('exit-full-screen') : t('full-screen')} placement="bottom">
      <Button variant="light" size="sm" isIconOnly onPress={isFullscreen ? exitFullscreen : enterFullscreen}>
        <Icon
          icon="ri:fullscreen-line"
          className={cn(
            'rotate-0 scale-100 transition-all duration-300 text-base',
            isFullscreen ? '-rotate-90 scale-0' : '',
          )}
        />
        <Icon
          icon="ri:fullscreen-exit-line"
          className={cn(
            'absolute rotate-90 scale-0 transition-all duration-300 text-base',
            isFullscreen ? 'rotate-0 scale-100' : '',
          )}
        />
      </Button>
    </Tooltip>
  );
}
