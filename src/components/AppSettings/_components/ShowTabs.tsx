/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 17:26:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 17:27:08
 * @Description: 是否显示标签页
 */
import { Switch } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { type FC } from 'react';

import { useAppStore } from '@/store/useAppStore';

const ShowTabs: FC = () => {
  const showTabs = useAppStore((s) => s.showTabs);
  const setShowTabs = useAppStore((s) => s.setShowTabs);
  return (
    <Switch
      isSelected={showTabs}
      onValueChange={setShowTabs}
      color='primary'
      size='sm'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <Icon icon='ri:check-line' className={className} /> : <Icon icon='ri:close-line' className={className} />
      }
    />
  )
}
export default ShowTabs;