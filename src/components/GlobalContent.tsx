/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 14:47:09
 * @Description: 主体布局
 */
'use client';

import { Layout } from 'antd';

const { Content } = Layout;

type GlobalContentProps = {
  children: React.ReactNode;
};

export default function GlobalContent({ children }: GlobalContentProps) {
  return <Content style={{ margin: 16, overflow: 'initial' }}>{children}</Content>;
}
