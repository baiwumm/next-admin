/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-02 16:19:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-06 12:11:09
 * @Description: 个人中心
 */
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui';

export default function PersonalCenter() {
  const t = useTranslations('Route');
  return (
    <div className="h-100 flex items-center justify-center">
      <Button>{t('personal-center')}</Button>
    </div>
  )
}