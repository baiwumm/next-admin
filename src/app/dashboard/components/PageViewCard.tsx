/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 13:57:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-08 14:59:51
 * @Description: 访问量
 */
import { cn } from '@nextui-org/react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { RiArrowDownLine, RiArrowUpLine, RiResetRightLine } from '@remixicon/react';
import { useMount, useSetState } from 'ahooks';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from 'recharts';

import ContentLoading from '@/components/ContentLoading';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { random, sum } from '@/lib/radash';

type ChartData = {
  month: string;
  value: number;
};

export default function PageViewCard() {
  const t = useTranslations('Pages.dashboard');
  const [arrow, setArrow] = useState<ReactNode | null>(null);

  // 访问量数据
  const [data, setData] = useSetState({
    complete: 0,
    loading: false,
  });
  // 图表数据
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // 初始化访问量数据
  const initData = () => {
    setData({
      loading: true,
    });
    setTimeout(() => {
      setData({
        complete: random(1, 100),
        loading: false,
      });
    }, 1500);
  };

  // 初始化图表数据
  const initChartData = () => {
    setTimeout(() => {
      const result: ChartData[] = [];
      for (let month = 1; month <= 12; month++) {
        // 将构造好的对象添加到数组中
        result.push({
          month: dayjs()
            .month(month - 1)
            .format('M月'),
          value: random(100, 10000),
        });
      }
      setChartData(result);
    }, 1500);
  };

  // 图表配置
  const chartConfig = {
    value: {
      label: t('page-view'),
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const reset = () => {
    initData();
    initChartData();
  };

  useMount(() => {
    reset();

    setArrow(
      random(0, 1) < 0.5 ? (
        <RiArrowDownLine key={random(0, 1)} size={16} color="#F5222D" />
      ) : (
        <RiArrowUpLine key={random(0, 1)} size={16} color="#52C41A" />
      ),
    );
  });
  return (
    <Card>
      <div className={cn('relative transition-opacity', `opacity-${data.loading ? '50' : '100'}`)}>
        <ContentLoading loading={data.loading} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{t('page-view')}</div>
            <div className="text-2xl font-bold">
              <CountUp end={sum(chartData.map((v) => v.value))} separator="," />
            </div>
          </div>
          <RiResetRightLine
            className={cn(`h-4 w-4 text-muted-foreground cursor-pointer `, data.loading ? 'animate-spin' : '')}
            onClick={() => reset()}
          />
        </CardHeader>
        <CardBody className="pb-4">
          <ResponsiveContainer width="100%" height={80}>
            <ChartContainer config={chartConfig}>
              <AreaChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
                <CartesianGrid vertical={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Area dataKey="value" type="natural" fillOpacity={0.4} fill="hsl(var(--chart-1))" />
              </AreaChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardBody>
        <CardFooter className="pb-2 pt-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{t('daily-visits')}</span>
            {arrow}
            <CountUp end={data.complete} suffix="%" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
