/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 14:47:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 11:02:40
 * @Description: 菜单布局
 */
'use client';
import { Icon } from '@iconify/react';
import { useRequest } from 'ahooks';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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

  // 判断是否是合法域名
  const isLink = (path: string) => path.startsWith('https://') || path.startsWith('http://');

  // 点击菜单回调
  const handleMenuClick = (path: string, hasChdilren = false) => {
    if (hasChdilren) {
      return;
    }
    if (isLink(path)) {
      window.open(path);
    } else {
      router.push(path);
      setActiveKey(path);
    }
  };

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);
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
                  <Icon icon={icon} />
                  <span>{t(name)}</span>
                  {isLink(path) ? <Icon icon="ri:share-box-fill" /> : null}
                  {children?.length ? (
                    <Icon
                      icon="ri:arrow-right-s-line"
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
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
                            <Icon icon={subItem.icon} />
                            <span>{t(subItem.name)}</span>
                            {isLink(subItem.path) ? <Icon icon="ri:share-box-fill" /> : null}
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
