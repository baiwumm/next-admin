/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-18 17:32:49
 * @Description: 工作台
 */
'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

import JuejinArticle from './components/JuejinArticle'; // 掘金文章列表
import StatisticChart from './components/StatisticChart'; // 指标卡片

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      {/* 指标卡片 */}
      <StatisticChart />
      {/* 掘金文章列表 */}
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
        }}
        className="items-stretch"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <JuejinArticle />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
