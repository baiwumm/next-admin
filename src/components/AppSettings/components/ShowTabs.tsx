/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-05 17:56:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 17:57:03
 * @Description: 是否显示标签页
 */
import { Check, X } from 'lucide-react';
import { type FC } from 'react';

import { Switch } from '@/components/animate-ui/components/radix/switch';
import { useAppStore } from '@/store/useAppStore';

const ShowTabs: FC = () => {
  const showTabs = useAppStore((s) => s.showTabs);
  const setShowTabs = useAppStore((s) => s.setShowTabs);

  return (
    <Switch
      thumbIcon={showTabs ? <Check className="text-black" /> : <X className="text-black" />}
      checked={showTabs}
      onCheckedChange={setShowTabs}
    />
  )
}
export default ShowTabs;