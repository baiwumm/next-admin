/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 09:37:03
 * @Description: 主体布局
 */
'use client';

import { Layout } from 'antd';

import GlobalContent from '@/components/GlobalContent'; // 主体布局
import GlobalFooter from '@/components/GlobalFooter'; // 底部布局
import GlobalHeader from '@/components/GlobalHeader'; // 头部布局
import SliderMenu from '@/components/SliderMenu'; // 左侧菜单

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
};

type BasicLayoutProps = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: BasicLayoutProps) {
  return (
    <Layout style={layoutStyle}>
      <SliderMenu />
      <Layout>
        <GlobalHeader />
        <GlobalContent>{children}</GlobalContent>
        <GlobalFooter />
      </Layout>
    </Layout>
  );
}
