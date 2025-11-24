/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-07 09:06:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 09:28:54
 * @Description: 页容器
 */
'use client'

import { BreadcrumbItem, Breadcrumbs, Spinner } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC, type ReactNode } from 'react';

import PageAnimatePresence from '@/components/PageAnimatePresence';
import { useMenuStore } from '@/store/useMenuStore';

type PageContainerProps = {
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  const t = useTranslations('Route');
  const tC = useTranslations('Common');
  const pathname = usePathname();
  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);

  // 递归生成面包屑
  function findBreadcrumbs(pathname: string, menu: typeof menuList, breadcrumb: App.SystemSettings.Menu[] = []): App.SystemSettings.Menu[] | null {
    for (const item of menu) {
      if (item.path === pathname) {
        return [...breadcrumb, item]
      }

      if (item.children?.length > 0) {
        const result = findBreadcrumbs(pathname, item.children, [...breadcrumb, item])
        if (result) return result
      }
    }
    return null
  }

  // 生成面包屑路径
  const breadcrumbPath = findBreadcrumbs(pathname, menuList);

  if (!breadcrumbPath) {
    return (
      <div className="flex justify-center items-center min-h-80">
        <Spinner label={tC('loading')} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {breadcrumbPath && breadcrumbPath.length > 1 ? (
        <Breadcrumbs>
          {breadcrumbPath.map(({ id, label, path, redirect, icon }) => (
            <BreadcrumbItem key={id} startContent={<Icon icon={icon} />}>
              <Link href={redirect || path}>
                {t(label)}
              </Link>
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      ) : null}
      <PageAnimatePresence>
        {children}
      </PageAnimatePresence>
    </div>
  )
}
export default PageContainer;