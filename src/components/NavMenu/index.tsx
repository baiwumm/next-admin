/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 16:15:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-25 09:32:27
 * @Description: 导航菜单
 */
import { useRouter } from '@bprogress/next/app';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarContent, NavbarItem, Spinner } from '@heroui/react';
import { Icon } from '@iconify-icon/react';
import { map } from 'es-toolkit/compat';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC, useMemo } from 'react';

import { useMenuStore } from '@/store/useMenuStore';

const NavMenu: FC = () => {
  const t = useTranslations('Route');
  const tH = useTranslations('Components.Header');
  const tC = useTranslations('Common');
  const router = useRouter();
  const pathname = usePathname();
  // 勾选的菜单
  const selectedKeys = useMemo(() => new Set([pathname]), [pathname]);
  // 判断菜单是否选中
  const isActive = (url: string) => url === pathname || pathname.includes(url);

  // 获取菜单数据
  const menuList = useMenuStore((state) => state.menuList);
  const menuLoading = useMenuStore((state) => state.loading);
  const fetchMenuList = useMenuStore((state) => state.fetchMenuList);
  return (
    <NavbarContent className="hidden sm:flex gap-2" justify="center">
      {menuLoading ? (
        <Spinner size="sm" label={tH('menu-loading')} classNames={{ label: 'text-tiny' }} />
      ) : menuList?.length ? map(menuList, ({ label, path, icon, children }) => children?.length ? (
        <Dropdown key={path}>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                endContent={<Icon icon="ri-arrow-down-s-line" />}
                radius="sm"
                variant={isActive(path) ? "flat" : "light"}
                startContent={<Icon icon={icon} />}
                size='sm'
              >
                {t(label)}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            disallowEmptySelection
            aria-label={t(label)}
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onAction={(key) => router.push(key as string)}
          >
            {map(children, ({ label, path, icon, desc }) => (
              <DropdownItem
                key={path}
                startContent={<Icon icon={icon} />}
                textValue={t(label)}
                description={desc ? t(desc) : undefined}
              >
                {t(label)}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <NavbarItem key={path} className="text-sm">
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
        </NavbarItem>
      )) : (
        <Button
          size='sm'
          color='primary'
          variant="light"
          className="text-tiny"
          startContent={<Icon icon='ri:error-warning-line' className="text-base" />}
          onPress={() => fetchMenuList()}
        >
          {tC('request-error')}
        </Button>
      )}
    </NavbarContent>
  )
}
export default NavMenu;