/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 11:28:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 11:28:21
 * @Description: 用户管理
 */
import { useTranslations } from 'next-intl';

import { Button } from '@/components/animate-ui/components/buttons/button';

export default function UserManage() {
  const t = useTranslations('Route');
  return (
    <div className="h-100 flex items-center justify-center">
      <Button>{t('user-manage')}</Button>
    </div>
  )
}