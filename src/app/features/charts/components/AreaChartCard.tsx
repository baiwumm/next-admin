/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-23 09:13:22
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-23 10:07:49
 * @Description: 面积图
 */
import { Card, CardBody, CardHeader, cn, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMount } from 'ahooks';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';

import ContentLoading from '@/components/ContentLoading';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { random } from '@/lib/radash';

type ChartData = {
  label: string;
  value: number;
};

export default function AreaChartCard() {
  const t = useTranslations('Pages.charts');
  // 图表数据
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  // 初始化图表数据
  const initChartData = () => {
    setLoading(true);
    setTimeout(() => {
      const result: ChartData[] = [];
      for (let month = 1; month <= 12; month++) {
        // 将构造好的对象添加到数组中
        result.push({
          label: dayjs()
            .month(month - 1)
            .format('M月'),
          value: random(100, 1000),
        });
      }
      setChartData(result);
      setLoading(false);
    }, 1500);
  };

  const chartConfig = {
    value: {
      label: '访问量',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  useMount(() => {
    initChartData();
  });
  return (
    <Card radius="sm">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <h4 className="font-bold text-large">{t('area')}</h4>
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
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area
                  dataKey="value"
                  type="natural"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.4}
                  stroke="hsl(var(--chart-1))"
                />
              </AreaChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardBody>
      </div>
    </Card>
  );
}
