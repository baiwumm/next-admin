/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:54:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-11 10:58:45
 * @Description: 菜单配置文件
 */
import { Globe, Info, MonitorPause, Settings } from 'lucide-react';

import { ROUTES_NAME } from '@/enums';

type MenuListType = {
  path: string; // 路由地址
  name: ROUTES_NAME; // 菜单名称
  children?: MenuListType[];
};

export const MenuList: MenuListType[] = [
  {
    path: `/${ROUTES_NAME.DASHBOARD}`,
    name: ROUTES_NAME.DASHBOARD,
  },
  {
    path: `/${ROUTES_NAME.SYSTEM_MANAGE}`,
    name: ROUTES_NAME.SYSTEM_MANAGE,
    children: [
      {
        path: `/${ROUTES_NAME.SYSTEM_MANAGE}/${ROUTES_NAME.INTERNATIONALIZATION}`,
        name: ROUTES_NAME.INTERNATIONALIZATION,
      },
    ],
  },
  {
    path: `/${ROUTES_NAME.ABOUT}`,
    name: ROUTES_NAME.ABOUT,
  },
];

/**
 * @description: 菜单图标映射
 */
export const MenuIconMap: Record<ROUTES_NAME, React.ReactNode> = {
  [ROUTES_NAME.DASHBOARD]: <MonitorPause />,
  [ROUTES_NAME.SYSTEM_MANAGE]: <Settings />,
  [ROUTES_NAME.INTERNATIONALIZATION]: <Globe />,
  [ROUTES_NAME.ABOUT]: <Info />,
};
