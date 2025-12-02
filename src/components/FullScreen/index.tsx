/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 18:15:48
 * @Description: 全屏
 */
import { Button } from "@heroui/react";
import { Icon } from '@iconify/react';
import { useFullscreen } from 'ahooks';
import type { FC } from 'react';

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
    <Button isIconOnly aria-label="FullScreen" variant="ghost" onPress={switchScreen}>
      <Icon icon={isFullscreen ? "ri:fullscreen-exit-line" : "ri:fullscreen-line"} className='text-lg' />
    </Button>
  );
};

export default FullScreen;