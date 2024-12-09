/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 13:54:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-09 16:31:03
 * @Description: 侧边菜单排版
 */
'use client';

import Image from 'next/image';
import * as React from 'react';

import NavMain from '@/components/NavMain';
import NavUser from '@/components/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: '谢明伟',
    email: 'baiwumm@foxmail.com',
    avatar: 'logo.svg',
  },
};

export default function AppSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/logo.svg" width={40} height={40} alt="logo" />
                <span className="truncate font-semibold">{process.env.NEXT_PUBLIC_PROJECT_NAME}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
