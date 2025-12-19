/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 17:01:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-19 09:10:34
 * @Description: 布局顶栏
 */
import Image from 'next/image'
import Link from 'next/link';
import { type FC } from 'react';

import BreadcrumbContainer from './BreadcrumbContainer';
import DesktopMenu from './DesktopMenu';
import FullScreen from './FullScreen';
import LangSwitch from './LangSwitch';
import MobileMenu from './MobileMenu';
import UserAvatar from './UserAvatar';

import AppSettings from '@/components/AppSettings';
import { SidebarTrigger } from '@/components/ui';
import { LAYOUT_MODE } from '@/enums';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';

const NavHeader: FC = () => {
  const isMobile = useIsMobile();
  const layoutMode = useAppStore((s) => s.layoutMode);
  // 是否侧栏布局
  const isSidebarLayout = layoutMode === LAYOUT_MODE.SIDEBAR;
  return (
    <nav className="px-4 border-b border-default">
      <div className={cn("flex items-center justify-between h-15", isSidebarLayout ? "w-full" : "container mx-auto")}>
        {isSidebarLayout ? (
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            {isMobile ? null : (
              <BreadcrumbContainer hideOnSingleItem={false} />
            )}
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            {/* 左侧 Logo */}
            <Link href="/">
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
        )}
        {/* Desktop 菜单 */}
        {isMobile || isSidebarLayout ? null : <DesktopMenu />}
        {/* 右侧工具栏 */}
        <div className="flex gap-2 items-center">
          {/* 主题设置 */}
          <AppSettings />
          {/* 全屏 */}
          <FullScreen />
          {/* 语言切换 */}
          <LangSwitch />
          {/* 用户头像 */}
          {isSidebarLayout ? null : <UserAvatar />}
        </div>
      </div>
    </nav>
  )
}
export default NavHeader;