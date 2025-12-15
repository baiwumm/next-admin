/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-08 16:52:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-15 09:54:20
 * @Description: 侧栏布局
 */
'use client';

import { useRouter } from '@bprogress/next/app';
import { ChevronRight, ChevronsUpDown, Info } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC, type ReactNode, useCallback } from 'react';

import UserAvatar from '../components/UserAvatar';
import TopbarLayout from '../TopbarLayout';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/animate-ui/components/radix/collapsible';
import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  Skeleton
} from '@/components/ui';
import { useMenuStore } from '@/store/useMenuStore';

type SidebarLayoutProps = {
  children: ReactNode;
  mainMinH: number; // 主体内容最小高度
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children, mainMinH }) => {
  const t = useTranslations('Route');
  const tC = useTranslations('Common');
  const router = useRouter();

  const pathname = usePathname();

  // 判断当前菜单是否应默认展开（只要子树中有激活项）
  const isMenuActive = useCallback((menu: System.Menu) => {
    const collectPaths = (m: System.Menu): string[] => {
      if (!m.children?.length) return m.path ? [m.path] : [];
      return m.children.flatMap(collectPaths);
    };
    const allPaths = collectPaths(menu);
    return allPaths.some(p => pathname === p || pathname.startsWith(p + '/'));
  }, [pathname]);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const menuLoading = useMenuStore((state) => state.loading);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);

  // 渲染一级菜单
  const renderFirstLevelMenu = ({ id, label, path, icon }: System.Menu) => {
    const menuLabel = t(label);
    return (
      <SidebarGroup key={id}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={menuLabel} onClick={() => router.push(path)} isActive={path === pathname}>
              <DynamicIcon name={icon} />
              {menuLabel}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  // 渲染子级菜单
  const renderNestedMenu = (menu: System.Menu) => {
    const { id, label, icon, children } = menu;
    const menuLabel = t(label);
    return (
      <Collapsible
        key={id}
        asChild
        defaultOpen={isMenuActive(menu)}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={menuLabel}>
              <DynamicIcon name={icon} />
              <span>{menuLabel}</span>
              <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {children?.map((subItem) => subItem?.children?.length ? renderNestedMenu(subItem) : (
                <SidebarMenuSubItem key={subItem.id}>
                  <SidebarMenuSubButton asChild onClick={() => router.push(subItem.path)} isActive={subItem.path === pathname}>
                    <div>
                      <DynamicIcon name={subItem.icon} />
                      <span>{t(subItem.label)}</span>
                    </div>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  // 渲染 Loading 占位
  const renderLoading = (
    <div className="space-y-5 p-5">
      {['w-4/5', 'w-full', 'w-3/4', 'w-5/6', 'w-2/3', 'w-full', 'w-11/12', 'w-5/6'].map((w, i) => (
        <Skeleton key={i} className={`${w} h-4 rounded-lg`} />
      ))}
    </div>
  )
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-default">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Image
                      src="/logo.svg"
                      width={36}
                      height={36}
                      alt="Logo"
                      className="rounded"
                    />
                  </div>
                </Link>
                <div className="grid flex-1 text-left text-sm leading-tight gap-0.5">
                  <span className="truncate font-semibold">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                  </span>
                  <span className="truncate text-xs">
                    {process.env.NEXT_PUBLIC_APP_DESC}
                  </span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {/* 渲染菜单 */}
          {menuLoading ? renderLoading : menuList?.length ? menuList.map(menu => menu?.children?.length ? (
            <SidebarGroup key={menu.id}>
              <SidebarMenu>
                {renderNestedMenu(menu)}
              </SidebarMenu>
            </SidebarGroup>
          ) : renderFirstLevelMenu(menu)) : (
            <div className="h-full flex justify-center items-center">
              <Button
                size='sm'
                variant="outline"
                className="text-xs"
                onClick={fetchMenuList}
              >
                <Info />
                {tC('request-error')}
              </Button>
            </div>
          )}
        </SidebarContent>
        <SidebarFooter className="border-t border-default">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                asChild
              >
                {/* 用户头像 */}
                <div className="cursor-pointer">
                  <UserAvatar />
                  <ChevronsUpDown className="ml-auto size-4" />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        {/* 直接使用顶栏布局 */}
        <TopbarLayout mainMinH={mainMinH}>
          {children}
        </TopbarLayout>
      </SidebarInset>
    </>
  );
};
export default SidebarLayout;