/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 14:56:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-25 11:18:57
 * @Description: 页面访问量
 */
"use client"
import { useRequest } from 'ahooks';
import { TrendingUp } from 'lucide-react'
import { type FC, useState } from 'react';

import { getStatisticData, type StatisticData } from '../utils'
import StatisticCards from './StatisticCards'

// 模拟异步 API 调用（就像 fetch 或 axios）
export async function getPageviewsData(): Promise<StatisticData> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 返回模拟数据
  return getStatisticData(1000, 5000);
}

const PageViewsCard: FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { data, loading, run } = useRequest(getPageviewsData, {
    onSuccess: () => setHasLoaded(true)
  });

  const handleRefresh = () => {
    setHasLoaded(false);
    run();
  };

  const titleIcon = <TrendingUp className="size-6 text-blue-500 dark:text-blue-400" />;
  return (
    <StatisticCards
      title="page-views"
      titleIcon={titleIcon}
      data={data}
      loading={loading}
      hasLoaded={hasLoaded}
      handleRefresh={handleRefresh}
      day={30}
    />
  )
}
export default PageViewsCard;