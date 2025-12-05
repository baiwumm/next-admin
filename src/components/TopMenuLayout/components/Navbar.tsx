/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:10:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 18:01:42
 * @Description: 顶部菜单
 */
import Image from 'next/image'
import Link from 'next/link';
import { type FC } from 'react';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import UserAvatar from './UserAvatar';

import AppSettings from '@/components/AppSettings';
import FullScreen from '@/components/FullScreen';
import LangSwitch from '@/components/LangSwitch';
import { useAppStore } from '@/store/useAppStore';

const Navbar: FC = () => {
  const isMobile = useAppStore((s) => s.isMobile);
  return (
    <nav className="px-4 h-15 border-b border-default backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 h-15">
        <div className="flex gap-2 items-center">
          {/* 左侧 Logo */}
          <Link href="/dashboard">
            <div className="flex gap-2 items-center">
              <Image
                src="/logo.svg"
                width={36}
                height={36}
                alt="Logo"
                className="rounded"
              />
              {isMobile ? null : (
                <p className="font-bold text-inherit ml-2 text-lg">{process.env.NEXT_PUBLIC_APP_NAME}</p>
              )}
            </div>
          </Link>
          {isMobile ? (
            <MobileMenu />
          ) : null}
        </div>
        {/* Desktop 菜单 */}
        {isMobile ? null : <DesktopMenu />}
        {/* 右侧工具栏 */}
        <div className="flex gap-2 items-center">
          {/* 主题设置 */}
          <AppSettings />
          {/* 全屏 */}
          <FullScreen />
          {/* 语言切换 */}
          <LangSwitch />
          {/* 用户头像 */}
          <UserAvatar />
        </div>
      </div>
    </nav>
  )
}
export default Navbar;