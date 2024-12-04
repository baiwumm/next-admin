/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 09:28:21
 * @Description: 主体布局
 */
'use client';

import { Layout } from 'antd';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

type GlobalContentProps = {
  children: React.ReactNode;
};

export default function GlobalContent({ children }: GlobalContentProps) {
  return <Content style={contentStyle}>{children}</Content>;
}
