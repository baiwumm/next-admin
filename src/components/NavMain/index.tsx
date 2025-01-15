/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 14:47:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-15 15:59:51
 * @Description: 菜单布局
 */
'use client';
import { RiArrowRightSLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
import { MenuIconMap } from '@/constants/icon';
import { get } from '@/lib/radash';
import { convertFlatDataToTree } from '@/lib/utils';
import { getMenuList } from '@/services/system-manage/menu-manage';
import { useUserStore } from '@/store/userStore';

export default function NavMain() {
  const t = useTranslations('Route');
  // 路由跳转
  const router = useRouter();
  // 当前激活的菜单
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState(pathname);

  // 获取菜单列表
  const { data: menuList = [] } = useRequest(async () => {
    const res = get(await getMenuList(), 'data', []);
    useUserStore.setState({ menuList: res });
    return convertFlatDataToTree(res);
  });

  // 判断当前菜单是否激活
  const isActive = (path: string) => activeKey === path;

  // 点击菜单回调
  const handleMenuClick = (path: string, hasChdilren = false) => {
    if (hasChdilren) {
      return;
    }
    router.push(path);
    setActiveKey(path);
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuList.map(({ path, name, icon, children = [] }) => (
          <Collapsible key={path} asChild defaultOpen={activeKey.includes(path)} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={t(name)}
                  isActive={isActive(path)}
                  onClick={() => handleMenuClick(path, !!children.length)}
                >
                  {MenuIconMap[icon]}
                  <span>{t(name)}</span>
                  {children?.length ? (
                    <RiArrowRightSLine className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  ) : null}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {children?.length ? (
                  <SidebarMenuSub>
                    {children.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.path}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(subItem.path)}
                          onClick={() => handleMenuClick(subItem.path, !!subItem.children?.length)}
                        >
                          <a
                            onClick={() => handleMenuClick(subItem.path, !!subItem.children?.length)}
                            className="cursor-pointer"
                          >
                            {MenuIconMap[subItem.icon]}
                            <span>{t(subItem.name)}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
