/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-23 09:13:22
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-23 11:16:39
 * @Description: 径向图
 */
import { Card, CardBody, CardHeader, cn, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMount } from 'ahooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

import ContentLoading from '@/components/ContentLoading';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { random } from '@/lib/radash';

type ChartData = {
  browser: string;
  visitors: number;
  fill: string;
};

export default function RadialChartCard() {
  const t = useTranslations('Pages.charts');
  // 图表数据
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  // 初始化图表数据
  const initChartData = () => {
    setLoading(true);
    setTimeout(() => {
      setChartData([{ browser: 'safari', visitors: random(100, 1000), fill: `hsl(var(--chart-1))` }]);
      setLoading(false);
    }, 1500);
  };

  const chartConfig = {
    visitors: {
      label: '访问量',
    },
    safari: {
      label: 'Safari',
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
          <h4 className="font-bold text-large">{t('radial')}</h4>
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
              <RadialBarChart data={chartData} startAngle={0} endAngle={250} innerRadius={80} outerRadius={110}>
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="visitors" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                              {chartData[0]?.visitors?.toLocaleString()}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              访问量
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </CardBody>
      </div>
    </Card>
  );
}
