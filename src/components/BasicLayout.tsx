/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:12:50
 * @Description: 主体布局
 */
'use client';

import { useBoolean } from 'ahooks';
import { App, ConfigProvider, Layout, theme as antdTheme } from 'antd';
import { toNumber } from 'lodash-es';

import GlobalContent from '@/components/GlobalContent'; // 主体布局
import GlobalFooter from '@/components/GlobalFooter'; // 底部布局
import GlobalHeader from '@/components/GlobalHeader'; // 头部布局
import SliderMenu from '@/components/SliderMenu'; // 左侧菜单
import useStore from '@/store';

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  minHeight: '100vh',
};

type BasicLayoutProps = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: BasicLayoutProps) {
  const { isDark } = useStore();
  // 菜单是否折叠
  const [collapsed, { toggle: setCollapsed }] = useBoolean(false);
  return (
    <ConfigProvider
      theme={{
        cssVar: true, // 开启 CSS 变量模式
        hashed: false, // 关闭 hash 减小样式体积
        algorithm: isDark() ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <App>
        <Layout style={layoutStyle} hasSider>
          <SliderMenu collapsed={collapsed} />
          <Layout
            style={{
              marginInlineStart: collapsed ? 80 : toNumber(process.env.NEXT_PUBLIC_SLIDE_MENU_WIDTH),
              transition: '.3s all ease',
            }}
          >
            <GlobalHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <GlobalContent>{children}</GlobalContent>
            <GlobalFooter />
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
