/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:54:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-06 16:21:13
 * @Description: 菜单配置文件
 */
import { Info, MonitorPause, Settings, Users } from 'lucide-react';

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
    name: '工作台',
  },
  {
    path: '/system',
    icon: <Settings />,
    name: '系统设置',
    redirect: '/system/user-manage',
    children: [
      {
        path: '/system/user-manage',
        icon: <Users />,
        name: '用户管理',
      },
    ],
  },
  {
    path: '/about',
    icon: <Info />,
    name: '关于',
  },
];

export default MenuList;
