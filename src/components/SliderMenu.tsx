/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:13:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:10:34
 * @Description: 左侧菜单
 */
'use client';

import { Layout, Menu, type MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

import MenuList from '@/constants/menu';
import useStore from '@/store';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

type SiderMenuProps = {
  collapsed: boolean;
};

export default function SiderMenu({ collapsed }: SiderMenuProps) {
  const { theme } = useStore();
  // 路由跳转
  const router = useRouter();
  // 当前激活的菜单
  const pathname = usePathname();
  // 点击菜单回调
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };
  return (
    <Sider
      width={process.env.NEXT_PUBLIC_SLIDE_MENU_WIDTH}
      theme={theme}
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={siderStyle}
    >
      <Menu theme={theme} mode="inline" items={MenuList} onClick={handleMenuClick} defaultSelectedKeys={[pathname]} />
    </Sider>
  );
}
