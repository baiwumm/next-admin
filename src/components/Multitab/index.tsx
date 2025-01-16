/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-16 11:06:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 13:43:48
 * @Description: 多标签页
 */
import { Tab, Tabs } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { MenuIconMap } from '@/constants/icon';
import { ROUTES_NAME } from '@/enums';
import { useUserStore } from '@/store/userStore';
export default function Multitab() {
  const t = useTranslations('Route');
  const router = useRouter();
  const pathname = usePathname();
  // 当前激活的 key
  const [activeKey, setActiveKey] = useState(pathname);
  // 当前保存的路由标签
  const [routeTabs, setRouteTabs] = useState<string[]>([]);

  // 菜单列表
  const menuList = useUserStore((state) => state.menuList);

  // 切换 Tab 标签页回调
  const handleChangeTab = (key: string) => {
    setActiveKey(key);
    router.push(key);
  };

  useEffect(() => {
    setActiveKey(pathname);
    if (!routeTabs.includes(pathname)) {
      setRouteTabs([...routeTabs, pathname]);
    }
  }, [pathname]);
  return routeTabs.length && menuList.length ? (
    <Tabs
      aria-label="Multitab"
      size="sm"
      radius="sm"
      selectedKey={activeKey}
      onSelectionChange={(key) => handleChangeTab(key as string)}
    >
      {routeTabs.map((route) => {
        const menuItem = menuList.find((item) => item.path === route) as App.SystemManage.Menu;
        return (
          <Tab
            key={route}
            title={
              <div className="flex items-center space-x-2">
                {MenuIconMap[menuItem?.icon]}
                <span>{t(menuItem?.name as ROUTES_NAME)}</span>
              </div>
            }
          />
        );
      })}
    </Tabs>
  ) : null;
}
