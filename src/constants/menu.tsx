/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 10:04:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-05 09:32:14
 * @Description: 菜单配置文件
 */
import { RiDashboardLine, RiInformationLine } from '@remixicon/react';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const MenuList: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <RiDashboardLine size={20} />,
    label: '工作台',
  },
  {
    key: '/about',
    icon: <RiInformationLine size={20} />,
    label: '关于',
  },
];

export default MenuList;
