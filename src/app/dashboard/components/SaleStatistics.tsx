/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-26 10:05:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-26 14:23:35
 * @Description: 销售数据统计
 */
"use client"
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Area, Bar, ComposedChart, XAxis, YAxis } from "recharts"

import { type DualMetricDataItem, generateDualMetricData } from '../utils'

import CountingNumber from '@/components/CountingNumber';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar,
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Spinner,
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui"
import { PERIODS } from '@/enums'
import { cn, randomNumber } from '@/lib/utils'

async function getData(period: typeof PERIODS.valueType): Promise<DualMetricDataItem[]> {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 返回模拟数据
  return generateDualMetricData(period);
}

export default function SaleStatistics() {
  const t = useTranslations('Pages.Dashboard');
  const [data, setData] = useState<DualMetricDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<typeof PERIODS.valueType>(PERIODS.DAY);
  const [trend, setTrend] = useState(0);

  const chartConfig = {
    sales: {
      label: t('sale-volume'),
      color: "var(--chart-1)",
    },
    orders: {
      label: t('order-quantity'),
      color: "var(--chart-2)",
    }
  } satisfies ChartConfig;

  useEffect(() => {
    if (!selectedPeriod) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getData(selectedPeriod);
        setData(res);
        setTrend(randomNumber(-90, 90))
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);
  return (
    <Card>
      <CardHeader className="pt-6 pb-0 border-0">
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl font-semibold">{t('sale-title')}</span>
          <span
            className={cn(
              'inline-flex items-center gap-1 text-xs font-medium',
              trend >= 0 ? 'text-green-500' : 'text-destructive',
            )}
          >
            {trend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}{' '}
            <CountingNumber
              from={0}
              to={Math.abs(trend)}
              format={value => `${value.toFixed(0)}%`}
              className="text-lg leading-non"
            />
          </span>
        </CardTitle>
        <CardToolbar>
          <ToggleGroup
            type="single"
            value={selectedPeriod}
            variant="outline"
            onValueChange={(value) => setSelectedPeriod(value as typeof PERIODS.valueType)}
            className=""
          >
            {PERIODS.items.map(({ value, raw }) => (
              <ToggleGroupItem key={value} value={value} className="px-3.5 first:rounded-s-full! last:rounded-e-full!">
                {t(raw.label)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardToolbar>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 w-full">
          {loading ? (
            <div className="h-full w-full absolute flex justify-center items-center bg-background/25 backdrop-blur-xs z-10">
              <Spinner />
            </div>
          ) : null}
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ComposedChart data={data}>
              {/* SVG Pattern for chart area */}
              <defs>
                {/* Grid pattern */}
                <pattern id="gridPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="rgb(51 65 85)"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                  />
                </pattern>
                {/* Linear gradients for areas */}
                <linearGradient id="salesAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartConfig.sales.color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={chartConfig.sales.color} stopOpacity="0.02" />
                </linearGradient>
                {/* Shadow filters for dots */}
                <filter id="dotShadow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
                </filter>
                <filter id="activeDotShadow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="3" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.6)" />
                </filter>
              </defs>
              {/* Background grid */}
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#gridPattern)"
                style={{ pointerEvents: 'none' }}
              />

              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                tickMargin={8}
                includeHidden={true}
                interval="preserveStartEnd"
              />

              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={{
                  stroke: chartConfig.sales.color,
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                }}
              />
              {/* 柱状图：订单数 - 使用比例缩放 */}
              <Bar
                type="monotone"
                dataKey='orders'
                name={chartConfig.orders.label}
                fill={chartConfig.orders.color}
                yAxisId="right"
                radius={[10, 10, 0, 0]}
              />
              <YAxis yAxisId="right" orientation='right' stroke={chartConfig.orders.color} />
              {/* 面积图：销售额 */}
              <Area
                type="monotone"
                dataKey="sales"
                stroke={chartConfig.sales.color}
                strokeWidth={2}
                fill="url(#salesAreaGradient)"
                yAxisId="left"
                dot={(props) => {
                  const { cx, cy } = props;
                  return (
                    <circle
                      key={`dot-${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r={3}
                      fill={chartConfig.sales.color}
                      stroke="white"
                      strokeWidth={1}
                      filter="url(#dotShadow)"
                    />
                  );
                }}
                activeDot={{
                  r: 4,
                  fill: chartConfig.sales.color,
                  stroke: 'white',
                  strokeWidth: 2,
                  filter: 'url(#activeDotShadow)',
                }}
              />
              <YAxis yAxisId="left" stroke={chartConfig.sales.color} />
              <ChartLegend content={<ChartLegendContent />} />
            </ComposedChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}