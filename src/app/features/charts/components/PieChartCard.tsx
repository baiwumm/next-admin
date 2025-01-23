/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-23 09:13:22
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-23 11:08:11
 * @Description: 饼图
 */
import { Card, CardBody, CardHeader, cn, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMount } from 'ahooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import ContentLoading from '@/components/ContentLoading';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { random } from '@/lib/radash';

type ChartData = {
  browser: string;
  visitors: number;
  fill: string;
};

export default function PieChartCard() {
  const t = useTranslations('Pages.charts');
  // 图表数据
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  // 初始化图表数据
  const initChartData = () => {
    setLoading(true);
    const browserList = ['chrome', 'safari', 'firefox', 'edge', 'other'];
    setTimeout(() => {
      const result: ChartData[] = [];
      for (let i = 0; i < browserList.length; i++) {
        // 将构造好的对象添加到数组中
        result.push({
          browser: browserList[i],
          visitors: random(100, 1000),
          fill: `hsl(var(--chart-${i + 1}))`,
        });
      }
      setChartData(result);
      setLoading(false);
    }, 1500);
  };

  const chartConfig = {
    visitors: {
      label: 'Visitors',
    },
    chrome: {
      label: 'Chrome',
      color: 'hsl(var(--chart-1))',
    },
    safari: {
      label: 'Safari',
      color: 'hsl(var(--chart-2))',
    },
    firefox: {
      label: 'Firefox',
      color: 'hsl(var(--chart-3))',
    },
    edge: {
      label: 'Edge',
      color: 'hsl(var(--chart-4))',
    },
    other: {
      label: 'Other',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;

  useMount(() => {
    initChartData();
  });
  return (
    <Card radius="sm">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <h4 className="font-bold text-large">{t('pie')}</h4>
          <Icon
            icon="ri:reset-right-line"
            className={cn(`h-4 w-4 text-muted-foreground cursor-pointer `, loading ? 'animate-spin' : '')}
            onClick={() => initChartData()}
          />
        </div>
      </CardHeader>
      <Divider />
      <div className={cn('relative transition-opacity', `opacity-${loading ? '50' : '100'}`)}>
        <ContentLoading loading={loading} />
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardBody>
      </div>
    </Card>
  );
}
