/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:29:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 15:31:07
 * @Description: 控制台
 */
import { useTranslations } from 'next-intl';

import { Button } from '@/components/animate-ui/components/buttons/button';

export default function Dashboard() {
  const t = useTranslations('Route');
  return (
    <div className="h-100 flex items-center justify-center">
      <Button>{t('dashboard')}</Button>
    </div>
  )
}