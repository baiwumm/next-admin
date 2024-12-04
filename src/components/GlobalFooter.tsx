/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 09:20:13
 * @Description: 底部布局
 */
'use client';

import { Layout } from 'antd';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

export default function GlobalFooter() {
  return <Footer style={footerStyle}>Footer</Footer>;
}
