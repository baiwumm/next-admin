/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 13:57:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 14:38:06
 * @Description: 客户满意度
 */
import { Spinner } from '@nextui-org/react';
import { RiArrowDownLine, RiArrowUpLine, RiResetRightLine } from '@remixicon/react';
import { useMount, useSetState } from 'ahooks';
import dayjs from 'dayjs';
import { random, toNumber } from 'lodash-es';
import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type ChartData = {
  month: string;
  value: number;
};

export default function SatisfactionCard() {
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
        total: toNumber(random(1, 100, true).toFixed(2)),
        date: toNumber(random(1, 100, true).toFixed(2)),
        week: toNumber(random(1, 100, true).toFixed(2)),
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
      label: '客户满意度',
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
      random() < 0.5 ? (
        <RiArrowDownLine key={random()} size={16} color="#F5222D" />
      ) : (
        <RiArrowUpLine key={random()} size={16} color="#52C41A" />
      ),
    );

    // 更新状态以触发重新渲染
    setArrows(randomArrows);
  });
  return (
    <Card>
      <div className={`relative transition-opacity opacity-${data.loading ? '50' : '100'}`}>
        {data.loading ? (
          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <Spinner />
          </div>
        ) : null}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
          <CardTitle>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">客户满意度</div>
              <div className="text-2xl font-bold">
                <CountUp end={data.total} suffix="%" />
              </div>
            </div>
          </CardTitle>
          <RiResetRightLine
            className={`h-4 w-4 text-muted-foreground cursor-pointer ${data.loading ? 'animate-spin' : ''}`}
            onClick={() => reset()}
          />
        </CardHeader>
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={80}>
            <ChartContainer config={chartConfig}>
              <LineChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line dataKey="value" type="natural" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="pb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 ">
              <span>日同比</span>
              {arrows[0]}
              <CountUp end={data.date} suffix="%" />
            </div>
            <div className="flex items-center gap-1 ">
              <span>周同比</span>
              {arrows[1]}
              <CountUp end={data.week} suffix="%" />
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
