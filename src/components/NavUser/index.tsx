/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 14:50:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-02 11:21:59
 * @Description: 用户下拉选项
 */
'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import { RiExpandUpDownLine, RiIdCardLine, RiLogoutBoxRLine } from '@remixicon/react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

export default function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dropdown backdrop="blur" placement={isMobile ? 'bottom' : 'right'}>
          <DropdownTrigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foregroun"
            >
              <User
                avatarProps={{
                  src: `/${user.avatar}`,
                  size: 'sm',
                }}
                description={user.email}
                name={user.name}
              />
              <RiExpandUpDownLine className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownTrigger>
          <DropdownMenu className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
            <DropdownItem key="user" className="p-0 font-normal" showDivider>
              <User
                avatarProps={{
                  src: `/${user.avatar}`,
                  size: 'sm',
                }}
                description={user.email}
                name={user.name}
              />
            </DropdownItem>
            <DropdownItem key="personal-center" startContent={<RiIdCardLine size={16} />} showDivider>
              个人中心
            </DropdownItem>
            <DropdownItem key="logout" startContent={<RiLogoutBoxRLine size={16} />}>
              退出登录
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
