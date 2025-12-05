/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-05 17:59:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 18:00:05
 * @Description: 是否固定顶部
 */
import { Check, X } from 'lucide-react';
import { type FC } from 'react';

import { Switch } from '@/components/animate-ui/components/radix/switch';
import { useAppStore } from '@/store/useAppStore';

const FixedHeader: FC = () => {
  const fixedHeader = useAppStore((s) => s.fixedHeader);
  const setFixedHeader = useAppStore((s) => s.setFixedHeader);

  return (
    <Switch
      thumbIcon={fixedHeader ? <Check className="text-black" /> : <X className="text-black" />}
      checked={fixedHeader}
      onCheckedChange={setFixedHeader}
    />
  )
}
export default FixedHeader;