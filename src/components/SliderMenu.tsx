/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:13:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-05 09:55:32
 * @Description: 左侧菜单
 */
'use client';

import { Flex, Layout, Menu, type MenuProps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import MenuList from '@/constants/menu';
import useStore from '@/store';

const { Title } = Typography;
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
  const [activeKey, setActiveKey] = useState(pathname);

  // 点击菜单回调
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
    setActiveKey(e.key);
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
      <Link href="/dashboard" onClick={() => setActiveKey('/dashboard')}>
        <Flex justify="center" align="center" gap="small" style={{ height: 64 }}>
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          {collapsed ? null : (
            <Title level={4} style={{ marginBottom: 0 }}>
              {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </Title>
          )}
        </Flex>
      </Link>
      <Menu theme={theme} mode="inline" items={MenuList} onClick={handleMenuClick} selectedKeys={[activeKey]} />
    </Sider>
  );
}
