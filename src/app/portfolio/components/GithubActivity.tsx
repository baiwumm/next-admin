"use client"

import { useRequest } from 'ahooks';
import { Area, AreaChart, XAxis, YAxis } from "recharts"

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, Spinner } from "@/components/ui"
import { get } from '@/lib/utils'
import pkg from '#/package.json';

export default function GithubActivity() {
  const chartConfig = {
    contributionCount: {
      label: "Commits",
      color: "var(--chart-1)",
    }
  } satisfies ChartConfig;

  const { data, loading } = useRequest(async () => {
    const username = pkg.author.name;
    const res = await fetch(`/api/github/${username}/contributions?days=30`, {
      cache: 'no-store', // 确保获取最新数据
    });
    if (!res.ok) {
      return [];
    }
    const result = await res.json();
    return get(result, 'dailyCommits', [])
  });
  return (
    <div className="relative h-50 w-full">
      {loading ? (
        <div className="h-full w-full absolute flex justify-center items-center bg-primary-foreground/65">
          <Spinner />
        </div>
      ) : null}
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          data={data}
          margin={{
            top: 15,
            right: 10,
            left: 10,
            bottom: 15,
          }}
          className="overflow-visible"
        >
          {/* SVG Pattern for chart area */}
          <defs>
            {/* Grid pattern */}
            <pattern id="gridPattern" x="0" y="0" width="20" height="40" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--input)" strokeWidth="0.5" strokeOpacity="1" />
            </pattern>
            {/* Area gradient fill */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartConfig.contributionCount.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chartConfig.contributionCount.color} stopOpacity={0.05} />
            </linearGradient>
            {/* Shadow filters for dots */}
            <filter id="dotShadow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.4)" />
            </filter>
            <filter id="activeDotShadow" x="-100%" y="-100%" width="300%" height="300%">
              <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.5)" />
            </filter>
          </defs>
          {/* Background pattern for chart area only */}
          <rect
            x="60px"
            y="-20px"
            width="calc(100% - 75px)"
            height="calc(100% - 10px)"
            fill="url(#gridPattern)"
            style={{ pointerEvents: 'none' }}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            tickMargin={8}
            includeHidden={true}
            tickFormatter={(value) => value.slice(-2)}
            interval="preserveStartEnd"
          />
          <YAxis
            hide={true}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            tickMargin={8}
            domain={[0, 'dataMax']}
            ticks={[0]}
          />
          <ChartTooltip
            content={(
              <ChartTooltipContent indicator="dot" />
            )}
            cursor={{
              stroke: chartConfig.contributionCount.color,
              strokeWidth: 1,
              strokeDasharray: 'none',
            }}
          />
          <Area
            type="monotone"
            dataKey="contributionCount"
            stroke={chartConfig.contributionCount.color}
            strokeWidth={2}
            fill="url(#areaGradient)"
            dot={(props) => {
              const { cx, cy } = props;
              return (
                <circle
                  key={`dot-${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r={3}
                  fill={chartConfig.contributionCount.color}
                  stroke="white"
                  strokeWidth={1}
                  filter="url(#dotShadow)"
                />
              );
            }}
            activeDot={{
              r: 4,
              fill: chartConfig.contributionCount.color,
              stroke: 'white',
              strokeWidth: 2,
              filter: 'url(#dotShadow)',
            }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
