/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-20 16:13:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 16:28:44
 * @Description: 全屏
 */
'use client';

import { cn, Tooltip } from '@nextui-org/react';
import { RiFullscreenExitLine, RiFullscreenLine } from '@remixicon/react';
import { useFullscreen } from 'ahooks';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export default function FullScreen() {
  const t = useTranslations('App');
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <Tooltip showArrow content={isFullscreen ? t('exit-full-screen') : t('full-screen')} placement="bottom">
      <Button variant="ghost" size="icon" onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
        <RiFullscreenLine
          className={cn('rotate-0 scale-100 transition-all duration-300', isFullscreen ? '-rotate-90 scale-0' : '')}
        />
        <RiFullscreenExitLine
          className={cn(
            'absolute rotate-90 scale-0 transition-all duration-300',
            isFullscreen ? 'rotate-0 scale-100' : '',
          )}
        />
        <span className="sr-only">FullScreen</span>
      </Button>
    </Tooltip>
  );
}
