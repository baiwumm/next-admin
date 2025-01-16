/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 13:57:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 16:36:25
 * @Description: 客户满意度
 */
import { Icon } from '@iconify/react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useMount, useSetState } from 'ahooks';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from 'recharts';

import ContentLoading from '@/components/ContentLoading';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { random } from '@/lib/radash';

type ChartData = {
  month: string;
  value: number;
};

export default function SatisfactionCard() {
  const t = useTranslations('Pages.dashboard');
  const [arrows, setArrows] = useState<ReactNode[]>([]);

  // 客户满意度数据
  const [data, setData] = useSetState({
    total: 0,
    date: 0,
    week: 0,
    loading: false,
  });
  // 图表数据
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // 初始化客户满意度数据
  const initData = () => {
    setData({
      loading: true,
    });
    setTimeout(() => {
      setData({
        total: random(1, 100),
        date: random(1, 100),
        week: random(1, 100),
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
          value: random(1, 100),
        });
      }
      setChartData(result);
    }, 1500);
  };

  // 图表配置
  const chartConfig = {
    value: {
      label: t('customer-satisfaction'),
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const reset = () => {
    initData();
    initChartData();
  };

  useMount(() => {
    reset();

    // 创建一个包含随机箭头组件的数组
    const randomArrows = Array.from({ length: 2 }).map(() =>
      random(0, 1) < 0.5 ? (
        <Icon icon="ri:arrow-down-line" key={random(0, 1)} color="#F5222D" className="text-base" />
      ) : (
        <Icon icon="ri:arrow-up-line" key={random(0, 1)} color="#52C41A" className="text-base" />
      ),
    );

    // 更新状态以触发重新渲染
    setArrows(randomArrows);
  });
  return (
    <Card>
      <div className={`relative transition-opacity opacity-${data.loading ? '50' : '100'}`}>
        <ContentLoading loading={data.loading} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{t('customer-satisfaction')}</div>
            <div className="text-2xl font-bold">
              <CountUp end={data.total} suffix="%" />
            </div>
          </div>
          <Icon
            icon="ri:reset-right-line"
            className={`h-4 w-4 text-muted-foreground cursor-pointer ${data.loading ? 'animate-spin' : ''}`}
            onClick={() => reset()}
          />
        </CardHeader>
        <CardBody className="pb-4">
          <ResponsiveContainer width="100%" height={80}>
            <ChartContainer config={chartConfig}>
              <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="value" type="natural" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardBody>
        <CardFooter className="pb-2 pt-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 ">
              <span>{t('daily')}</span>
              {arrows[0]}
              <CountUp end={data.date} suffix="%" />
            </div>
            <div className="flex items-center gap-1 ">
              <span>{t('week')}</span>
              {arrows[1]}
              <CountUp end={data.week} suffix="%" />
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
