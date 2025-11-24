/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 15:59:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 16:16:04
 * @Description: 固定顶部
 */
import { Switch } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import { type FC } from 'react';

import { useAppStore } from '@/store/useAppStore';

const FixedHeader: FC = () => {
  const fixedHeader = useAppStore((s) => s.fixedHeader);
  const setFixedHeader = useAppStore((s) => s.setFixedHeader);
  return (
    <Switch
      isSelected={fixedHeader}
      onValueChange={setFixedHeader}
      color='primary'
      size='sm'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <Icon icon='ri:check-line' className={className} /> : <Icon icon='ri:close-line' className={className} />
      }
    />
  )
}
export default FixedHeader;