/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-17 09:09:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 09:11:26
 * @Description: 布局文件
 */
"use client"
import { type ReactNode } from 'react';

import DockCard from './components/DockCard';

type PortfolioLayoutProps = {
  children: ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
      <DockCard />
    </div>
  )
}