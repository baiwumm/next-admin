/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-10 15:45:01
 * @Description: 全屏
 */
import { useFullscreen } from 'ahooks';
import { Fullscreen, Minimize } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui';

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
    <Button mode="icon" aria-label="FullScreen" variant="dashed" radius="full" size='sm' onClick={switchScreen}>
      {isFullscreen ? <Minimize /> : <Fullscreen />}
    </Button>
  );
};

export default FullScreen;