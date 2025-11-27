/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 09:35:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-27 22:06:24
 * @Description: 控制台
 */
import { Button } from "@heroui/react";
import { type FC } from 'react';

import Dropdown from '@/components/DropdownMenu'

const Dashboard: FC = () => {
  return (
    <Dropdown items={[
      { 'type': 'item', 'content': 'New file', 'icon': 'ri:menu-line' },
      {
        'type': 'sub', 'content': 'Copy link', 'icon': 'link', 'items': [
          { 'type': 'item', 'content': 'Copy full link', 'icon': 'link-plus' },
          { 'type': 'item', 'content': 'Copy short link', 'icon': 'link-plus', 'iconProps': { 'size': 'md' } },
          {
            'type': 'sub', 'content': 'Copy colorful link', 'icon': 'link-plus', 'items': [
              { 'type': 'item', 'content': 'red', 'props': { 'color': 'danger' } },
              { 'type': 'item', 'content': 'green', 'props': { 'color': 'success' } },
              { 'type': 'item', 'content': 'blue', 'props': { 'color': 'primary' } },
            ]
          },
        ]
      },
      { 'type': 'item', 'content': 'Edit file', 'icon': 'pencil' },
      { 'type': 'item', 'content': 'Delete file', 'icon': 'trash', 'props': { 'color': 'danger' } },
    ]}>
      <Button>Open Menu</Button>
    </Dropdown>
  )
}
export default Dashboard;