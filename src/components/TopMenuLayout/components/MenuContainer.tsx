/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:11:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 17:49:23
 * @Description: 菜单容器
 */
import { useRouter } from '@bprogress/next/app';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Button } from '@/components/animate-ui/components/buttons/button';

const MenuContainer: FC = () => {
  const t = useTranslations('Route');
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="items-center gap-2 hidden md:flex">
      <Button variant={pathname === '/dashboard' ? 'default' : 'ghost'} onClick={() => router.push('/dashboard')} size='sm'>{t('dashboard')}</Button>
      <Button variant={pathname === '/system-manage/user-manage' ? 'default' : 'ghost'} onClick={() => router.push('/system-manage/user-manage')} size='sm'>{t('user-manage')}</Button>
      <Button variant={pathname === '/system-manage/menu-manage' ? 'default' : 'ghost'} onClick={() => router.push('/system-manage/menu-manage')} size='sm'>{t('menu-manage')}</Button>
    </div>
  )
}
export default MenuContainer;