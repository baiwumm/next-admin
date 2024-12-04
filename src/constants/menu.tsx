/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 10:04:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 11:00:00
 * @Description: 菜单配置文件
 */
import { RiDashboardFill, RiInformationFill } from '@remixicon/react';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const MenuList: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <RiDashboardFill size={16} />,
    label: '工作台',
  },
  {
    key: '/about',
    icon: <RiInformationFill size={16} />,
    label: '关于',
  },
];

export default MenuList;
