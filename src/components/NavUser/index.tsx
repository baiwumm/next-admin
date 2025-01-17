/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 14:50:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 17:02:58
 * @Description: 用户下拉选项
 */
'use client';
import { Icon } from '@iconify/react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, User } from '@heroui/react';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

export default function NavUser() {
  const t = useTranslations('Route');
  const { isMobile } = useSidebar();
  const { data: session } = useSession();

  // 渲染用户信息
  const renderUser = (
    <User
      avatarProps={{
        src: session?.user?.image as string,
        size: 'sm',
      }}
      description={session?.user?.email}
      name={session?.user?.name}
    />
  );

  // 退出登录
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dropdown backdrop="blur" placement={isMobile ? 'bottom' : 'right'}>
          <DropdownTrigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foregroun"
            >
              {!session?.user ? (
                <div className="flex items-center justify-center w-full">
                  <Spinner size="sm" />
                </div>
              ) : (
                renderUser
              )}
              <Icon icon="ri:expand-up-down-line" className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownTrigger>
          <DropdownMenu className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
            <DropdownItem key="user" className="p-0 font-normal" showDivider>
              {renderUser}
            </DropdownItem>
            <DropdownItem
              key="personal-center"
              startContent={<Icon icon="ri:id-card-line" className="size-4" />}
              showDivider
            >
              {t('personal-center')}
            </DropdownItem>
            <DropdownItem
              key="logout"
              startContent={<Icon icon="ri:logout-box-r-line" className="size-4" />}
              onPress={() => handleLogout()}
            >
              {t('logout')}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
