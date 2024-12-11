/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 11:01:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-11 11:03:16
 * @Description: 头部布局
 */
'use client';

import { map } from 'lodash-es';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import LangSwitch from '@/components/LangSwitch';
import ThemeModeButton from '@/components/ThemeModeButton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MenuIconMap } from '@/constants/MenuConfig';
import { ROUTES_NAME } from '@/enums';

export default function GlobalHeader() {
  const t = useTranslations('Route');
  const segments = useSelectedLayoutSegments();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b justify-between px-4 sticky top-0">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {map(segments, (path, index) => (
              <Fragment key={path}>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <div className="flex items-center gap-2">
                      <div className="breadcrumb-icon">{MenuIconMap[path as ROUTES_NAME]}</div>
                      <div>{t(path)}</div>
                    </div>
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {index < segments.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-2">
        <ThemeModeButton />
        <LangSwitch />
      </div>
    </header>
  );
}
