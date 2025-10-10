/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 08:47:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-10 13:41:31
 * @Description: 头部布局
 */
'use client';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  type SharedSelection,
  User
} from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { map } from 'es-toolkit/compat';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import { type FC, useState } from 'react';

type MenuItem = {
  label: string;
  url: string;
  icon: string;
  children?: MenuItem[];
}

const Header: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (url: string) => url === pathname || pathname.includes(url);
  // 是否打开菜单
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 勾选的菜单
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection>(new Set([pathname]));

  // 渲染 Logo
  const NavbarBrandLogo = (
    <NavbarBrand>
      <Image
        src="/logo.svg"
        width={36}
        height={36}
        alt="Logo"
      />
      <p className="font-bold text-inherit ml-2 text-lg hidden sm:block">{process.env.NEXT_PUBLIC_APP_NAME}</p>
    </NavbarBrand>
  );

  // 菜单数据
  const menuItems: MenuItem[] = [
    {
      label: '控制台',
      url: '/dashboard',
      icon: 'mdi:view-dashboard-outline'
    },
    {
      label: '智能行政',
      url: "/administrative",
      icon: 'ri:quill-pen-line',
      children: [
        {
          label: '组织管理',
          url: '/administrative/organization',
          icon: 'ri:exchange-2-line'
        },
        {
          label: '岗位管理',
          url: '/administrative/post-manage',
          icon: 'ri:contacts-book-3-line'
        },
      ]
    }
  ]
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* 菜单按钮 */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"} />
        {NavbarBrandLogo}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="start">
        {NavbarBrandLogo}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {map(menuItems, ({ label, url, icon, children }) => children?.length ? (
          <Dropdown key={url}>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  endContent={<Icon icon="ri-arrow-down-s-line" />}
                  radius="sm"
                  variant={isActive(url) ? "flat" : "light"}
                  startContent={<Icon icon={icon} />}
                >
                  {label}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              disallowEmptySelection
              aria-label={label}
              selectedKeys={selectedKeys}
              selectionMode="single"
              variant="flat"
              onSelectionChange={setSelectedKeys}
              onAction={(key) => router.push(key as string)}
            >
              {map(children, ({ label, url, icon }) => (
                <DropdownItem
                  key={url}
                  startContent={<Icon icon={icon} />}
                  textValue={label}
                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem key={url} className="text-sm">
            <Button
              radius="sm"
              variant={isActive(url) ? "flat" : "light"}
              startContent={<Icon icon={icon} />}
            >
              <Link href={url}>
                {label}
              </Link>
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              className="transition-transform cursor-pointer"
              name="baiwumm"
              description='me@baiwumm.com'
              avatarProps={{
                src: "https://cdn.baiwumm.com/avatar.jpg",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings" startContent={<Icon icon='mdi:card-account-details-outline' />}>个人中心</DropdownItem>
            <DropdownItem key="logout" startContent={<Icon icon="mdi:logout" />}>
              退出登录
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* 小屏幕下的菜单 */}
      <NavbarMenu>
        {map(menuItems, ({ label, url, icon, children }) => children?.length ? (
          <div key={url}>
            <NavbarMenuItem>
              <Button
                radius="sm"
                variant="light"
                startContent={<Icon icon={icon} />}
              >
                {label}
              </Button>
            </NavbarMenuItem>
            {map(children, ({ label, url, icon }) => (
              <NavbarMenuItem className="ml-4" key={url}>
                <Button
                  radius="sm"
                  variant={isActive(url) ? "flat" : "light"}
                  startContent={<Icon icon={icon} />}
                >
                  <Link href={url}>
                    {label}
                  </Link>
                </Button>
              </NavbarMenuItem>
            ))}
          </div>
        ) : (
          <NavbarMenuItem>
            <Button
              radius="sm"
              variant={isActive(url) ? "flat" : "light"}
              startContent={<Icon icon={icon} />}
            >
              <Link href={url}>
                {label}
              </Link>
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
export default Header;