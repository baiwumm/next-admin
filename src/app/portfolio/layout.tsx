/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-17 09:09:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 17:21:46
 * @Description: 布局文件
 */
"use client"
import { type ReactNode } from 'react';

import DockCard from './components/DockCard';

import ScrollProgress from '@/components/ScrollProgress'

type PortfolioLayoutProps = {
  children: ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
      <DockCard />
      <ScrollProgress />
    </div>
  )
}