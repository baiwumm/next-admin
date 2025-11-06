/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 16:53:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-06 16:56:12
 * @Description: 移动端菜单
 */
import { Button, NavbarMenu, NavbarMenuItem } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { map } from 'es-toolkit/compat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { useMenuStore } from '@/store/useMenuStore';

const NavMobileMenu: FC = () => {
  const t = useTranslations('Route');
  const pathname = usePathname();
  // 判断菜单是否选中
  const isActive = (url: string) => url === pathname || pathname.includes(url);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  return (
    <NavbarMenu>
      {map(menuList, ({ label, path, icon, children }) => children?.length ? (
        <div key={path}>
          <NavbarMenuItem>
            <Button
              radius="sm"
              variant="light"
              startContent={<Icon icon={icon} />}
              size='sm'
            >
              {t(label)}
            </Button>
          </NavbarMenuItem>
          {map(children, ({ label, path, icon }) => (
            <NavbarMenuItem className="ml-4" key={path}>
              <Button
                radius="sm"
                variant={isActive(path) ? "flat" : "light"}
                startContent={<Icon icon={icon} />}
                size='sm'
              >
                <Link href={path}>
                  {t(label)}
                </Link>
              </Button>
            </NavbarMenuItem>
          ))}
        </div>
      ) : (
        <NavbarMenuItem>
          <Button
            radius="sm"
            variant={isActive(path) ? "flat" : "light"}
            startContent={<Icon icon={icon} />}
            size='sm'
          >
            <Link href={path}>
              {t(label)}
            </Link>
          </Button>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  )
}
export default NavMobileMenu;