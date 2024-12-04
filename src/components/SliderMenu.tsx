/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:13:45
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 09:27:59
 * @Description: 左侧菜单
 */
'use client';

import { Layout } from 'antd';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

export default function SiderMenu() {
  return (
    <Sider width="256" style={siderStyle}>
      Sider
    </Sider>
  );
}
