/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 13:57:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-19 10:21:35
 * @Description: 支付笔数
 */
import { Spinner } from '@nextui-org/react';
import { useMount, useSetState } from 'ahooks';
import dayjs from 'dayjs';
import { map, random, sum, toNumber } from 'lodash-es';
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';
import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type ChartData = {
  month: string;
  value: number;
};

export default function PaymentNumberCard() {
  const [arrow, setArrow] = useState<ReactNode | null>(null);

  // 支付笔数数据
  const [data, setData] = useSetState({
    complete: 0,
    loading: false,
  });
  // 图表数据
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // 初始化支付笔数数据
  const initData = () => {
    setData({
      loading: true,
    });
    setTimeout(() => {
      setData({
        complete: toNumber(random(1, 100, true).toFixed(2)),
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
          value: random(100, 1000),
        });
      }
      setChartData(result);
    }, 1500);
  };

  // 图表配置
  const chartConfig = {
    value: {
      label: '支付笔数',
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
      random() < 0.5 ? (
        <ArrowDown key={random()} size={16} color="#F5222D" />
      ) : (
        <ArrowUp key={random()} size={16} color="#52C41A" />
      ),
    );
  });
  return (
    <Card>
      <div className={`relative transition-opacity opacity-${data.loading ? '50' : '100'}`}>
        {data.loading ? (
          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <Spinner />
          </div>
        ) : null}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">支付笔数</div>
              <div className="text-2xl font-bold">
                <CountUp end={sum(map(chartData, 'value'))} separator="," />
              </div>
            </div>
          </CardTitle>
          <RotateCcw
            className={`h-4 w-4 text-muted-foreground cursor-pointer ${data.loading ? 'animate-spin' : ''}`}
            onClick={() => reset()}
          />
        </CardHeader>
        <CardContent className="pb-4">
          <ResponsiveContainer width="100%" height={80}>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={8} />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>转化率</span>
            {arrow}
            <CountUp end={data.complete} suffix="%" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
