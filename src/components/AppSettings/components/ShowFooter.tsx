/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 15:07:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 15:17:12
 * @Description: 是否显示底部
 */
import { Check, X } from 'lucide-react';
import { type FC } from 'react';

import { Switch } from '@/components/animate-ui/components/radix/switch';
import { useAppStore } from '@/store/useAppStore';

const ShowFooter: FC = () => {
  const showFooter = useAppStore((s) => s.showFooter);
  const setShowFooter = useAppStore((s) => s.setShowFooter);

  return (
    <Switch
      thumbIcon={showFooter ? <Check className="text-black" /> : <X className="text-black" />}
      checked={showFooter}
      onCheckedChange={setShowFooter}
    />
  )
}
export default ShowFooter;