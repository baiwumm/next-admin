/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:10:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-07 17:46:35
 * @Description: 菜单管理
 */
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';

export default function MenuManage() {
  const t = useTranslations('Route');
  return (
    <div className="h-150 flex items-center justify-center">
      <Button>{t('menu-manage')}</Button>
    </div>
  )
}