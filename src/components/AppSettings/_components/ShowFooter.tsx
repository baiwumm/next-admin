/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 18:00:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 18:01:12
 * @Description: 是否显示底部
 */
import { Switch } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { type FC } from 'react';

import { useAppStore } from '@/store/useAppStore';

const ShowFooter: FC = () => {
  const showFooter = useAppStore((s) => s.showFooter);
  const setShowFooter = useAppStore((s) => s.setShowFooter);
  return (
    <Switch
      isSelected={showFooter}
      onValueChange={setShowFooter}
      color='primary'
      size='sm'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <Icon icon='ri:check-line' className={className} /> : <Icon icon='ri:close-line' className={className} />
      }
    />
  )
}
export default ShowFooter;