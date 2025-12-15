/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 16:23:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-15 10:23:39
 * @Description: Desktop 菜单
 */
"use client"
import { useRouter } from '@bprogress/next/app';
import { Info } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

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
import { useMenuStore } from '@/store/useMenuStore';

const DesktopMenu: FC = () => {
  const t = useTranslations('Route');
  const tC = useTranslations('Common');
  const tLayout = useTranslations('Components.Layout');
  const pathname = usePathname();
  const router = useRouter();

  // 判断菜单是否选中
  const isActive = (url: string) => url === pathname || pathname.includes(url);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const menuLoading = useMenuStore((state) => state.loading);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);

  const handleMenuSelect = (e: Event, path: string) => {
    e.preventDefault();
    router.push(path);
  }

  // 渲染单个顶级菜单项（支持 Dropdown）
  const renderTopLevelItem = (item: System.Menu) => {
    const menuLabel = t(item.label);
    if (item.children?.length) {
      // 有子菜单：用 DropdownMenu 包裹
      return (
        <DropdownMenu key={item.id}>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant={isActive(item.path) ? "primary" : "ghost"}
              className="text-xs"
            >
              <DynamicIcon name={item.icon} />
              {menuLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-48">
            {/* 递归渲染子项 */}
            {item.children.map(child => renderMenuItem(child))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      // 叶子节点：普通按钮
      return (
        <Button
          key={item.id}
          size="sm"
          variant={isActive(item.path) ? "primary" : "ghost"}
          className="text-xs"
          onClick={() => router.push(item.path)}
        >
          <DynamicIcon name={item.icon} />
          {menuLabel}
        </Button>
      );
    }
  };

  // 递归渲染子菜单项（用于 DropdownMenuContent 内部）
  const renderMenuItem = (item: System.Menu) => {
    const menuLabel = t(item.label);
    if (item.children?.length) {
      return (
        <DropdownMenuSub key={item.id}>
          <DropdownMenuSubTrigger>
            <DynamicIcon name={item.icon} />
            {menuLabel}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {item.children.map(child => renderMenuItem(child))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    } else {
      return (
        <DropdownMenuCheckboxItem
          key={item.id}
          checked={isActive(item.path)}
          onSelect={(e) => handleMenuSelect(e as Event, item.path)}
        >
          <DynamicIcon name={item.icon} />
          {menuLabel}
        </DropdownMenuCheckboxItem>
      );
    }
  };
  return menuLoading ? (
    <div className="flex flex-col items-center gap-1">
      <Spinner variant='circle' className="size-4" />
      <span className="text-sm font-bold">{tLayout('menu-loading')}</span>
    </div>
  ) : menuList?.length ? (
    <div className="flex items-center gap-2">
      {menuList.map(item => renderTopLevelItem(item))}
    </div>
  ) : (
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