/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 14:47:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-10 10:53:50
 * @Description: 菜单布局
 */
'use client';

import { map } from 'lodash-es';
import { ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import MenuList from '@/constants/MenuList';
import { useTranslations } from 'next-intl';

export default function NavMain() {
  const t = useTranslations('Route');
  // 路由跳转
  const router = useRouter();
  // 当前激活的菜单
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState(pathname);

  // 点击菜单回调
  const handleMenuClick = (path: string, redirect = '') => {
    if (redirect) {
      return;
    }
    router.push(path);
    setActiveKey(path);
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {map(MenuList, ({ path, icon, name, redirect, children = [] }) => (
          <Collapsible key={path} asChild defaultOpen={activeKey === path} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={t(name)}
                  isActive={activeKey === path}
                  onClick={() => handleMenuClick(path, redirect)}
                >
                  {icon}
                  <span>{t(name)}</span>
                  {children?.length ? (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  ) : null}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {map(children, (subItem) => (
                    <SidebarMenuSubItem key={subItem.path}>
                      <SidebarMenuSubButton asChild onClick={() => handleMenuClick(subItem.path, subItem.redirect)}>
                        <a onClick={() => handleMenuClick(path, redirect)} className="cursor-pointer">
                          {subItem.icon}
                          <span>{t(subItem.name)}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
