/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:29:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-26 10:06:16
 * @Description: 控制台
 */
import PageViewsCard from './components/PageViewsCard'
import RealTimeCard from './components/RealTimeCard'
import SaleStatistics from './components/SaleStatistics'
import VisitorsCard from './components/VisitorsCard'
import VisitsCard from './components/VisitsCard'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 实时浏览量 */}
        <RealTimeCard />
        {/* 访客数 */}
        <VisitorsCard />
        {/* 页面访问量 */}
        <PageViewsCard />
        {/* 访问次数 */}
        <VisitsCard />
      </div>
      {/* 销售数据统计 */}
      <SaleStatistics />
    </div>
  )
}