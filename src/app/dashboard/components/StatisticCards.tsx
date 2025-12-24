/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 11:23:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-24 14:58:11
 * @Description: 统计卡片
 */
import { type FC } from 'react';

import CodeTimeCard from './CodeTimeCard'

const StatisticCards: FC = () => {
  return (
    <div className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 总编码时间 */}
      <CodeTimeCard />
    </div>
  )
}
export default StatisticCards;