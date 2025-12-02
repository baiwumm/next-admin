/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 15:25:16
 * @Description: 全屏
 */
import { Icon } from '@iconify/react';
import { useFullscreen } from 'ahooks';
import type { FC } from 'react';

import { Button } from '@/components/animate-ui/components/buttons/button';

const FullScreen: FC = () => {
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);

  const switchScreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }
  return (
    <Button size="icon" aria-label="FullScreen" variant="ghost" onClick={switchScreen} className="rounded-full">
      <Icon icon={isFullscreen ? "ri:fullscreen-exit-line" : "ri:fullscreen-line"} className='text-lg' />
    </Button>
  );
};

export default FullScreen;