/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 11:01:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 17:25:37
 * @Description: 头部布局
 */
'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useTranslations } from 'next-intl';

import BackTop from '@/components/BackTop';
import FullScreen from '@/components/FullScreen';
import LangSwitch from '@/components/LangSwitch';
import Multitab from '@/components/Multitab';
import ThemeModeButton from '@/components/ThemeModeButton';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Icon } from '@iconify/react';
import { ROUTES_NAME } from '@/enums';
import { useUserStore } from '@/store/userStore';

export default function GlobalHeader() {
  const t = useTranslations('Route');
  const segments = useSelectedLayoutSegments();

  // 菜单列表
  const menuList = useUserStore((state) => state.menuList);
  return (
    <div className="sticky top-0 z-50">
      <header className="w-full flex gap-4 justify-between items-center h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-md dark:shadow-[rgba(255,255,255,.15)] backdrop-blur dark:bg-transparent transition-all px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Divider orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs>
            {segments.map((path) => {
              const menuItem = menuList.find((item) => item.name === path) as App.SystemManage.Menu;
              return (
                <BreadcrumbItem
                  key={path}
                  startContent={
                    menuItem?.icon ? (
                      <div className="breadcrumb-icon">
                        <Icon icon={menuItem.icon} />
                      </div>
                    ) : undefined
                  }
                >
                  {t(path as ROUTES_NAME)}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
        </div>
        <div className="flex">
          <FullScreen />
          <ThemeModeButton />
          <LangSwitch />
          <BackTop />
        </div>
      </header>
      <Multitab />
    </div>
  );
}
