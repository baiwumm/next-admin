/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:54:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-10 10:54:12
 * @Description: 菜单配置文件
 */
import { Globe, Info, MonitorPause, Settings } from 'lucide-react';

type MenuListConfig = {
  path: string; // 路由地址
  icon: React.ReactNode; // 菜单图标
  name: string; // 菜单名称
  redirect?: string; // 重定向地址
  children?: MenuListConfig[];
};

const MenuList: MenuListConfig[] = [
  {
    path: '/dashboard',
    icon: <MonitorPause />,
    name: 'dashboard',
  },
  {
    path: '/system-manage',
    icon: <Settings />,
    name: 'system-manage',
    redirect: '/system/user-manage',
    children: [
      {
        path: '/system-manage/internationalization',
        icon: <Globe />,
        name: 'internationalization',
      },
    ],
  },
  {
    path: '/about',
    icon: <Info />,
    name: 'about',
  },
];

export default MenuList;
