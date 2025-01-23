/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-23 09:00:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-23 11:15:05
 * @Description: 图表
 */
'use client';

import AreaChartCard from './components/AreaChartCard';
import BarChartCard from './components/BarChartCard';
import LineChartCard from './components/LineChartCard';
import PieChartCard from './components/PieChartCard';
import RadarChartCard from './components/RadarChartCard';
import RadialChartCard from './components/RadialChartCard';
export default function Charts() {
  return (
    <div className="grid gap-4 grid-cols-12">
      <div className="col-span-12 lg:col-span-6">
        <AreaChartCard />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <BarChartCard />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <LineChartCard />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <PieChartCard />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <RadarChartCard />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <RadialChartCard />
      </div>
    </div>
  );
}
