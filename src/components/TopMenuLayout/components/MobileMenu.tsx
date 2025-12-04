/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 16:28:35
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 17:34:17
 * @Description: 移动端菜单
 */
"use client"
import { useRouter } from '@bprogress/next/app';
import { Info, Menu } from "lucide-react";
import { DynamicIcon } from 'lucide-react/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC, useEffect } from 'react';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/animate-ui/components/radix/accordion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useMenuStore } from '@/store/useMenuStore';

const MobileMenu: FC = () => {
  const t = useTranslations('Route');
  const tC = useTranslations('Common');
  const pathname = usePathname();
  const router = useRouter();

  // 判断菜单是否选中
  const isActive = (url: string) => url === pathname || pathname.includes(url);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const menuLoading = useMenuStore((state) => state.loading);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);

  // 渲染菜单
  const renderMobileMenuItem = (nodes: App.SystemSettings.Menu[]) => nodes.map(item => {
    if (item?.children?.length) {
      return (
        <AccordionItem key={item.id} value={t(item.label)} className="border-b-0">
          <AccordionTrigger className="text-sm py-0 hover:no-underline">
            <div className="flex items-center gap-2 pl-2">
              <DynamicIcon name={item.icon} className="size-4" />
              <span>{t(item.label)}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <div className="flex flex-col gap-2 px-4">
              {item.children.map((subItem) => subItem?.children?.length ? renderMobileMenuItem(subItem.children) : (
                <Button
                  key={subItem.id}
                  size='sm'
                  variant={isActive(subItem.path) ? "default" : "ghost"}
                  onClick={() => router.push(subItem.path)}
                  className="justify-start"
                >
                  <DynamicIcon name={subItem.icon} />
                  {t(subItem.label)}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Button
        key={item.id}
        size='sm'
        variant={isActive(item.path) ? "default" : "ghost"}
        onClick={() => router.push(item.path)}
        className="justify-start"
      >
        <DynamicIcon name={item.icon} />
        {t(item.label)}
      </Button>
    );
  })

  useEffect(() => {
    if (!menuList?.length) {
      // 加载菜单数据
      fetchMenuList()
    }
  }, [fetchMenuList, menuList])

  return menuLoading ? (
    <Spinner variant='circle' className="size-4" />
  ) : menuList?.length ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-2 items-center">
              <Image
                src="/logo.svg"
                width={36}
                height={36}
                alt="Logo"
                className="rounded"
              />
              <p className="font-bold text-inherit ml-2 text-lg">{process.env.NEXT_PUBLIC_APP_NAME}</p>
            </div>
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col gap-6 p-4">
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-4"
          >
            {renderMobileMenuItem(menuList)}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
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
  );
};
export default MobileMenu;