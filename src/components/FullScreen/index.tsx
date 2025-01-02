/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-20 16:13:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-02 09:47:53
 * @Description: 全屏
 */
'use client';

import { Button, cn, Tooltip } from '@nextui-org/react';
import { RiFullscreenExitLine, RiFullscreenLine } from '@remixicon/react';
import { useFullscreen } from 'ahooks';
import { useTranslations } from 'next-intl';

export default function FullScreen() {
  const t = useTranslations('App');
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <Tooltip showArrow content={isFullscreen ? t('exit-full-screen') : t('full-screen')} placement="bottom">
      <Button variant="light" size="sm" isIconOnly onPress={isFullscreen ? exitFullscreen : enterFullscreen}>
        <RiFullscreenLine
          size={16}
          className={cn('rotate-0 scale-100 transition-all duration-300', isFullscreen ? '-rotate-90 scale-0' : '')}
        />
        <RiFullscreenExitLine
          size={16}
          className={cn(
            'absolute rotate-90 scale-0 transition-all duration-300',
            isFullscreen ? 'rotate-0 scale-100' : '',
          )}
        />
      </Button>
    </Tooltip>
  );
}
