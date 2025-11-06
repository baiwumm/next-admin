/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 08:47:13
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-06 17:29:40
 * @Description: 头部布局
 */
'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useState } from 'react';

import FullScreen from '@/components/FullScreen'
import LangSwitch from '@/components/LangSwitch'
import NavMenu from '@/components/NavMenu'
import NavMobileMenu from '@/components/NavMobileMenu'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import UserAvatar from '@/components/UserAvatar'
import { type Locale } from '@/i18n/config'
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore'

type HeaderProps = {
  locale: Locale;
}

const Header: FC<HeaderProps> = ({ locale }) => {
  const t = useTranslations('Components.Header');
  // 是否打开菜单
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 获取菜单数据
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);
  const menuList = useMenuStore((state) => state.menuList);
  const isMobile = useAppStore((s) => s.isMobile);

  // 渲染 Logo
  const NavbarBrandLogo = (
    <NavbarBrand>
      <Image
        src="/logo.svg"
        width={36}
        height={36}
        alt="Logo"
        className="rounded"
      />
      {isMobile ? null : (
        <p className="font-bold text-inherit ml-2 text-lg hidden sm:block">{process.env.NEXT_PUBLIC_APP_NAME}</p>
      )}
    </NavbarBrand>
  );

  useEffect(() => {
    if (!menuList?.length) {
      // 加载菜单数据
      fetchMenuList()
    }
  }, [fetchMenuList, menuList])
  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} classNames={{ wrapper: "!container" }}>
      {/* 菜单按钮 */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? t('close-menu') : t('open-menu')} />
        {NavbarBrandLogo}
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="start">
        {NavbarBrandLogo}
      </NavbarContent>
      {/* 导航菜单 */}
      <NavMenu />
      {/* 右侧按钮 */}
      <NavbarContent as="div" justify="end" className="flex gap-0">
        {/* 主题切换 */}
        <ThemeSwitcher />
        {/* 全屏 */}
        <FullScreen />
        {/* 多语言 */}
        <LangSwitch locale={locale} />
        {/* 用户头像 */}
        <UserAvatar />
      </NavbarContent>
      {/* 小屏幕下的菜单 */}
      <NavMobileMenu />
    </Navbar>
  );
};
export default Header;