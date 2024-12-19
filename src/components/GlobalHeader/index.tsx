/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 11:01:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-19 11:10:47
 * @Description: 头部布局
 */
'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import { map } from 'lodash-es';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useTranslations } from 'next-intl';

import LangSwitch from '@/components/LangSwitch';
import ThemeModeButton from '@/components/ThemeModeButton';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MenuIconMap } from '@/constants/MenuConfig';
import { ROUTES_NAME } from '@/enums';

export default function GlobalHeader() {
  const t = useTranslations('Route');
  const segments = useSelectedLayoutSegments();
  return (
    <header className="sticky w-full flex gap-4 justify-between items-center top-0 h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-md dark:shadow-[rgba(255,255,255,.15)] backdrop-blur dark:bg-transparent transition-all px-4 z-50">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Divider orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs>
          {map(segments, (path) => (
            <BreadcrumbItem
              key={path}
              startContent={<div className="breadcrumb-icon">{MenuIconMap[path as ROUTES_NAME]}</div>}
            >
              {t(path)}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>
      <div className="flex gap-2">
        <ThemeModeButton />
        <LangSwitch />
      </div>
    </header>
  );
}
