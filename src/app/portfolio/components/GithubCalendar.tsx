/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-26 09:33:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-26 09:33:40
 * @Description: Github 贡献日历
 */
"use client"
import { useRequest } from 'ahooks';
import { useTheme } from "next-themes";
import { type FC } from 'react';
import { ActivityCalendar, type ColorScheme } from 'react-activity-calendar';

import pkg from '#/package.json';

const GithubCalendar: FC = () => {
  const { theme } = useTheme();

  function getLevel(count: number) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 5) return 2;
    if (count <= 7) return 3;
    return 4;
  }

  const { data, loading } = useRequest(async () => {
    const username = pkg.author.name;
    const res = await fetch(`/api/github/${username}/contributions?days=365`, {
      cache: 'no-store', // 确保获取最新数据
    });
    if (!res.ok) {
      return [];
    }
    const result = await res.json();
    const commits = result?.dailyCommits || [];
    if (!commits?.length) {
      return [];
    }
    const transformedData = commits.map((item: { date: string, contributionCount: number }) => {
      const count = item.contributionCount;
      return {
        date: item.date,
        count: count,
        level: getLevel(count)
      };
    });
    return transformedData;
  });

  function formatDateToChinese(dateStr: string) {
    const [y, m, d] = dateStr.split('-');
    return `${y}年${parseInt(m)}月${parseInt(d)}日`;
  }
  return (
    <div className="w-full flex justify-center items-center">
      <ActivityCalendar
        data={data}
        loading={loading}
        fontSize={12}
        theme={{
          light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
          dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
        }}
        colorScheme={theme as ColorScheme}
        tooltips={{
          activity: {
            text: activity => `${formatDateToChinese(activity.date)}有 ${activity.count} 次贡献`,
            placement: 'top',
            offset: 6,
            hoverRestMs: 300,
            transitionStyles: {
              duration: 100,
              common: { fontFamily: 'monospace' },
            },
            withArrow: true,
          },
        }}
        labels={{
          totalCount: '过去一年累计贡献 {{count}} 次'
        }}
      />
    </div>
  )
}
export default GithubCalendar;