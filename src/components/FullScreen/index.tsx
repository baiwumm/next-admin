/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:09:22
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-30 17:23:29
 * @Description: 全屏
 */
import { Button, cn } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
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
    <Button isIconOnly aria-label="ThemeSwitcher" variant="light" radius="full" onPress={switchScreen}>
      <div className="relative w-5 h-5">
        <Icon
          icon="ri:fullscreen-line"
          className={cn(
            "text-lg transition-all duration-500 transform absolute top-0 left-0 w-full h-full",
            !isFullscreen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        />

        <Icon
          icon="ri:fullscreen-exit-line"
          className={cn(
            "text-lg transition-all duration-500 transform absolute top-0 left-0 w-full h-full",
            !isFullscreen ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          )}
        />
      </div>
    </Button>
  );
};

export default FullScreen;