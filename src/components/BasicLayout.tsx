/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 16:24:31
 * @Description: 主体布局
 */
'use client';

import { useBoolean, useLocalStorageState } from 'ahooks';
import { App, ConfigProvider, Layout, theme } from 'antd';
import { eq, toNumber } from 'lodash-es';

import GlobalContent from '@/components/GlobalContent'; // 主体布局
import GlobalFooter from '@/components/GlobalFooter'; // 底部布局
import GlobalHeader from '@/components/GlobalHeader'; // 头部布局
import SliderMenu from '@/components/SliderMenu'; // 左侧菜单
import { LOCAL_KEY, THEME } from '@/enums';

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  minHeight: '100vh',
};

type BasicLayoutProps = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: BasicLayoutProps) {
  // 菜单是否折叠
  const [collapsed, { toggle: setCollapsed }] = useBoolean(false);
  // 主题模式
  const [themeMode, setThemeMode] = useLocalStorageState<App.ThemeMode>(LOCAL_KEY.THEME, {
    defaultValue: (process.env.NEXT_PUBLIC_THEME_MODE as App.ThemeMode) || THEME.LIGHT,
  });
  // 是否是暗黑主题
  const isDark = eq(themeMode, THEME.DARK);
  return (
    <ConfigProvider
      theme={{
        cssVar: true, // 开启 CSS 变量模式
        hashed: false, // 关闭 hash 减小样式体积
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <App>
        <Layout style={layoutStyle} hasSider>
          <SliderMenu themeMode={themeMode || THEME.LIGHT} collapsed={collapsed} />
          <Layout
            style={{
              marginInlineStart: collapsed ? 80 : toNumber(process.env.NEXT_PUBLIC_SLIDE_MENU_WIDTH),
              transition: '.3s all ease',
            }}
          >
            <GlobalHeader
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              isDark={isDark}
              setThemeMode={setThemeMode}
            />
            <GlobalContent>{children}</GlobalContent>
            <GlobalFooter />
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
