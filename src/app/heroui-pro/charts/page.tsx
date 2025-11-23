/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-21 14:42:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-23 15:36:34
 * @Description: 图表
 */
'use client'

import { Tab, Tabs } from "@heroui/react";

import BarsAndCircles from './components/BarsAndCircles';
import Graphs from './components/Graphs';
import KpiStats from './components/KpiStats'

export default function Charts() {
  const tabs = [
    {
      id: "barsAndCircles",
      label: "BarsAndCircles",
      content: <BarsAndCircles />
    },
    {
      id: "graphs",
      label: "Graphs",
      content: <Graphs />
    },
    {
      id: "kpiStats",
      label: "KpiStats",
      content: <KpiStats />
    }
  ];
  return (
    <Tabs aria-label="Charts" items={tabs} fullWidth>
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </Tabs>
  )
}
