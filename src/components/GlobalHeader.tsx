/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-05 09:36:29
 * @Description: 头部布局
 */
'use client';

import { RiIndentDecrease, RiIndentIncrease, RiMoonFill, RiSunFill, RiUserFill } from '@remixicon/react';
import { Avatar, Button, Flex, Layout, theme, Tooltip } from 'antd';

import { THEME } from '@/enums';
import useStore from '@/store';

const { Header } = Layout;

type GlobalHeaderProps = {
  collapsed: boolean;
  setCollapsed: () => void;
};

export default function GlobalHeader({ collapsed, setCollapsed }: GlobalHeaderProps) {
  const { isDark, setTheme } = useStore();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // 切换动画
  async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
    if (!enableTransitions()) {
      setTheme(isDark() ? THEME.LIGHT : THEME.DARK);
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
    ];

    await document.startViewTransition(async () => {
      setTheme(isDark() ? THEME.LIGHT : THEME.DARK);
    }).ready;

    document.documentElement.animate(
      { clipPath: !isDark() ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${!isDark() ? 'old' : 'new'}(root)`,
      },
    );
  }
  return (
    <Header style={{ padding: '0 16px', background: colorBgContainer }}>
      <Flex justify="space-between" align="center">
        <Button
          type="text"
          icon={collapsed ? <RiIndentIncrease /> : <RiIndentDecrease />}
          onClick={() => setCollapsed()}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <Flex gap="small" align="center">
          <Tooltip title={`${isDark() ? '白天' : '暗黑'}模式`}>
            <Button
              type="text"
              size="large"
              icon={isDark() ? <RiMoonFill size={20} /> : <RiSunFill size={20} />}
              onClick={toggleDark}
            />
          </Tooltip>
          <Flex gap="small" align="center">
            <Avatar size={32} icon={<RiUserFill />} />
            <span>白雾茫茫丶</span>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
}
