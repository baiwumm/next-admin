/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 14:56:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-25 13:43:42
 * @Description: 访客数
 */
"use client"
import { useRequest } from 'ahooks';
import { Users } from 'lucide-react'
import { type FC, useState } from 'react';

import { getStatisticData, type StatisticData } from '../utils'
import StatisticCards from './StatisticCards'

// 模拟异步 API 调用（就像 fetch 或 axios）
export async function getVisitsData(): Promise<StatisticData> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 返回模拟数据
  return getStatisticData(100, 1000);
}

const VisitorsCard: FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { data, loading, run } = useRequest(getVisitsData, {
    onSuccess: () => setHasLoaded(true)
  });

  const handleRefresh = () => {
    setHasLoaded(false);
    run();
  };

  const titleIcon = <Users className="size-6 text-blue-500 dark:text-blue-400" />;
  return (
    <StatisticCards
      title="visitors"
      titleIcon={titleIcon}
      data={data}
      loading={loading}
      hasLoaded={hasLoaded}
      handleRefresh={handleRefresh}
      day={7}
    />
  )
}
export default VisitorsCard;