/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:10:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-01 09:05:35
 * @Description: 顶部菜单
 */
import Image from 'next/image'
import { type FC } from 'react';

import MenuContainer from './MenuContainer';
import UserAvatar from './UserAvatar';

import FullScreen from '@/components/FullScreen';
import LangSwitch from '@/components/LangSwitch';
import { useAppStore } from '@/store/useAppStore';

const Navbar: FC = () => {
  const isMobile = useAppStore((s) => s.isMobile);
  return (
    <nav className="px-4 h-15 border-b border-default backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-4 h-15">
        {/* 左侧 Logo */}
        <div className="flex gap-2 items-center">
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
        </div>
        {/* 中间菜单 */}
        <MenuContainer />
        {/* 右侧工具栏 */}
        <div className="flex gap-1 items-center">
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