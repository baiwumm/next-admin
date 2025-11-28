/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:11:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 17:16:43
 * @Description: 菜单容器
 */
import { useRouter } from '@bprogress/next/app';
import { Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

const MenuContainer: FC = () => {
  const t = useTranslations('Route');
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button variant={pathname === '/dashboard' ? 'primary' : 'ghost'} onPress={() => router.push('/dashboard')}>{t('dashboard')}</Button>
      <Button variant={pathname === '/system-manage/user-manage' ? 'primary' : 'ghost'} onPress={() => router.push('/system-manage/user-manage')}>{t('user-manage')}</Button>
      <Button variant={pathname === '/system-manage/menu-manage' ? 'primary' : 'ghost'} onPress={() => router.push('/system-manage/menu-manage')}>{t('menu-manage')}</Button>
    </div>
  )
}
export default MenuContainer;