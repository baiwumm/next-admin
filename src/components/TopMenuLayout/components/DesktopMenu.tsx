/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 16:23:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-07 18:28:33
 * @Description: Desktop 菜单
 */
"use client"
import { useRouter } from '@bprogress/next/app';
import { Info } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { addTransitionType, type FC, startTransition, useEffect } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Spinner
} from '@/components/ui';
import { useAppStore } from '@/store/useAppStore';
import { useMenuStore } from '@/store/useMenuStore';

const DesktopMenu: FC = () => {
  const t = useTranslations('Route');
  const tC = useTranslations('Common');
  const tLayout = useTranslations('Components.TopMenuLayout');
  const pathname = usePathname();
  const router = useRouter();
  const transition = useAppStore((s) => s.transition);

  // 判断菜单是否选中
  const isActive = (url: string) => url === pathname || pathname.includes(url);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const menuLoading = useMenuStore((state) => state.loading);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);

  // 菜单跳转
  const toPath = (path: string) => {
    startTransition(() => {
      addTransitionType(transition);
      router.push(path);
    });
  }

  const handleMenuSelect = (e: Event, path: string) => {
    e.preventDefault();
    toPath(path);
  }



  // 渲染子菜单
  const renderSubMenu = (nodes: System.Menu[]) => nodes.map(({ id, label, icon, children }) => (
    <DropdownMenuSub key={id}>
      <DropdownMenuSubTrigger>
        <DynamicIcon name={icon} />
        {t(label)}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {children.map(child => child?.children?.length ? renderSubMenu(child.children) : (
          <DropdownMenuCheckboxItem key={child.id}>
            <DynamicIcon name={child.icon} />
            {t(child.label)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  ));

  // 渲染菜单
  const renderMenu = (
    <div className="flex items-center gap-2">
      {menuList.map(({ id, label, path, icon, children }) => children?.length ? (
        <DropdownMenu key={id}>
          <DropdownMenuTrigger asChild>
            <Button
              key={id}
              size='sm'
              variant={isActive(path) ? "default" : "ghost"}
              className="text-xs"
            >
              <DynamicIcon name={icon} />
              {t(label)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-50">
            {/* 渲染子菜单 */}
            {children.map(child => child?.children?.length ? renderSubMenu(child.children) : (
              <DropdownMenuCheckboxItem key={child.id} checked={isActive(child.path)} onSelect={(e) => handleMenuSelect(e as Event, child.path)}>
                <DynamicIcon name={child.icon} />
                {t(child.label)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          key={id}
          size='sm'
          variant={isActive(path) ? "default" : "ghost"}
          className="text-xs"
          onClick={() => router.push(path)}
        >
          <DynamicIcon name={icon} />
          {t(label)}
        </Button>
      ))}
    </div>
  )

  useEffect(() => {
    if (!menuList?.length) {
      // 加载菜单数据
      fetchMenuList()
    }
  }, [fetchMenuList, menuList])
  return menuLoading ? (
    <div className="flex flex-col items-center gap-1">
      <Spinner variant='circle' className="size-4" />
      <span className="text-sm font-bold">{tLayout('menu-loading')}</span>
    </div>
  ) : menuList?.length ? renderMenu : (
    <Button
      size='sm'
      variant="outline"
      className="text-xs"
      onClick={fetchMenuList}
    >
      <Info />
      {tC('request-error')}
    </Button>
  )
}
export default DesktopMenu;