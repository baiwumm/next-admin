/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-03 16:47:41
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-04 10:09:15
 * @Description: 获取菜单列表
 */
'use client';
import { useTranslations } from 'next-intl';

export type MenuItem = {
  id: string;
  label: string;
  url: string;
  icon: string;
  redirect?: string;
  children?: MenuItem[];
}

export function useMenus() {
  const t = useTranslations('Route');
  // 菜单数据
  const menuItems: MenuItem[] = [
    {
      id: '1',
      label: t('dashboard'),
      url: '/dashboard',
      icon: 'mdi:view-dashboard-outline'
    },
    {
      id: '2',
      label: t('administrative'),
      url: "/administrative",
      icon: 'ri:quill-pen-line',
      redirect: '/administrative/organization',
      children: [
        {
          id: '3',
          label: t('organization'),
          url: '/administrative/organization',
          icon: 'ri:exchange-2-line'
        },
        {
          id: '4',
          label: t('post-manage'),
          url: '/administrative/post-manage',
          icon: 'ri:contacts-book-3-line'
        },
      ]
    },
    {
      id: '5',
      label: t('system-settings'),
      url: "/system-settings",
      icon: 'ri:settings-2-line',
      redirect: '/system-settings/user-manage',
      children: [
        {
          id: '6',
          label: t('user-manage'),
          url: '/system-settings/user-manage',
          icon: 'ri:user-settings-line'
        },
        {
          id: '7',
          label: t('menu-manage'),
          url: '/system-settings/menu-manage',
          icon: 'ri:route-fill'
        },
      ]
    }
  ]
  return menuItems;
}