/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:54:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-13 15:03:17
 * @Description: 菜单配置文件
 */
import {
  RiApps2AiLine,
  RiFlowerLine,
  RiGroupLine,
  RiImageAddLine,
  RiInformationLine,
  RiSettings3Line,
  RiTerminalBoxLine,
} from '@remixicon/react';

import { ROUTES_NAME } from '@/enums';

type MenuListType = {
  path: string; // 路由地址
  name: ROUTES_NAME; // 菜单名称
  redirect?: string;
  children?: MenuListType[];
};

export const MenuList: MenuListType[] = [
  {
    path: `/${ROUTES_NAME.DASHBOARD}`,
    name: ROUTES_NAME.DASHBOARD,
  },
  {
    path: `/${ROUTES_NAME.FEATURES}`,
    name: ROUTES_NAME.FEATURES,
    redirect: `/${ROUTES_NAME.FEATURES}/${ROUTES_NAME.CAPTCHA}`,
    children: [
      {
        path: `/${ROUTES_NAME.FEATURES}/${ROUTES_NAME.CAPTCHA}`,
        name: ROUTES_NAME.CAPTCHA,
      },
      {
        path: `/${ROUTES_NAME.FEATURES}/${ROUTES_NAME.VIEWER}`,
        name: ROUTES_NAME.VIEWER,
      },
    ],
  },
  {
    path: `/${ROUTES_NAME.SYSTEM_MANAGE}`,
    name: ROUTES_NAME.SYSTEM_MANAGE,
    redirect: `/${ROUTES_NAME.SYSTEM_MANAGE}/${ROUTES_NAME.USER_MANAGE}`,
    children: [
      {
        path: `/${ROUTES_NAME.SYSTEM_MANAGE}/${ROUTES_NAME.USER_MANAGE}`,
        name: ROUTES_NAME.USER_MANAGE,
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
  [ROUTES_NAME.DASHBOARD]: <RiApps2AiLine />,
  [ROUTES_NAME.ABOUT]: <RiInformationLine />,
  [ROUTES_NAME.FEATURES]: <RiFlowerLine />,
  [ROUTES_NAME.CAPTCHA]: <RiTerminalBoxLine />,
  [ROUTES_NAME.VIEWER]: <RiImageAddLine />,
  [ROUTES_NAME.SYSTEM_MANAGE]: <RiSettings3Line />,
  [ROUTES_NAME.USER_MANAGE]: <RiGroupLine />,
};
