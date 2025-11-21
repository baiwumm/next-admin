"use client";

import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  {
    title: "Total Revenue",
    value: "$228k",
    change: "3%",
    changeType: "positive",
    trendChipPosition: "bottom",
    chartData: [
      { weekday: "Mo", value: 13200 },
      { weekday: "Tu", value: 8800 },
      { weekday: "We", value: 9441 },
      { weekday: "Th", value: 12300 },
      { weekday: "Fr", value: 16400 },
      { weekday: "Sa", value: 14000 },
      { weekday: "Su", value: 11300 },
    ],
  },
  {
    title: "Total Expenses",
    value: "$71.2k",
    change: "1%",
    changeType: "neutral",
    trendChipPosition: "bottom",
    chartData: [
      { weekday: "Mo", value: 5000 },
      { weekday: "Tu", value: 6200 },
      { weekday: "We", value: 9800 },
      { weekday: "Th", value: 5300 },
      { weekday: "Fr", value: 5700 },
      { weekday: "Sa", value: 6400 },
      { weekday: "Su", value: 8187 },
    ],
  },
  {
    title: "Total Profit",
    value: "$156k",
    change: "8%",
    changeType: "negative",
    trendChipPosition: "bottom",
    chartData: [
      { weekday: "Mo", value: 11500 },
      { weekday: "Tu", value: 7000 },
      { weekday: "We", value: 7641 },
      { weekday: "Th", value: 12700 },
      { weekday: "Fr", value: 13300 },
      { weekday: "Sa", value: 15600 },
      { weekday: "Su", value: 11813 },
    ],
  },
];

const formatWeekday = (weekday: string) => {
  const day =
    {
      Mo: 1,
      Tu: 2,
      We: 3,
      Th: 4,
      Fr: 5,
      Sa: 6,
      Su: 0,
    }[weekday] ?? 0;

  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(2024, 0, day));
};

const formatValue = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * 🚨 This example requires installing the `recharts` package:
 * `npm install recharts`
 *
 * ```tsx
 * import {Bar, BarChart, ResponsiveContainer, XAxis, Tooltip} from "recharts";
 * ```
 */
export default function KPIStat7() {
  const handleMouseEnter = React.useCallback((chartIndex: number, itemIndex: number) => {
    const bars = document.querySelectorAll(`#chart-${chartIndex} .recharts-bar-rectangle`);

    bars.forEach((bar, i) => {
      if (i !== itemIndex) {
        const path = bar.querySelector("path");

        if (path) {
          path.setAttribute("fill", "hsl(var(--heroui-default-300))");
        }
      }
    });
  }, []);

  const handleMouseLeave = React.useCallback((chartIndex: number) => {
    const bars = document.querySelectorAll(`#chart-${chartIndex} .recharts-bar-rectangle`);

    bars.forEach((bar) => {
      const path = bar.querySelector("path");

      if (path) {
        path.setAttribute("fill", "hsl(var(--heroui-foreground))");
      }
    });
  }, []);

  const trendChipContent = React.useCallback(
    ({
      changeType,
      change,
      trendChipPosition,
    }: {
      changeType: string;
      change: string;
      trendChipPosition: string;
    }) => (
      <div
        className={cn({
          "self-start": trendChipPosition === "top",
          "self-end": trendChipPosition === "bottom",
        })}
      >
        <Chip
          classNames={{
            content: "font-medium",
          }}
          color={
            changeType === "positive"
              ? "success"
              : changeType === "neutral"
                ? "warning"
                : changeType === "negative"
                  ? "danger"
                  : "default"
          }
          radius="sm"
          size="sm"
          startContent={
            changeType === "positive" ? (
              <Icon height={16} icon={"solar:arrow-right-up-linear"} width={16} />
            ) : changeType === "neutral" ? (
              <Icon height={16} icon={"solar:arrow-right-linear"} width={16} />
            ) : (
              <Icon height={16} icon={"solar:arrow-right-down-linear"} width={16} />
            )
          }
          variant="flat"
        >
          <span>{change}</span>
        </Chip>
      </div>
    ),
    [],
  );

  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.map(({ title, value, changeType, change, trendChipPosition }, index) => (
        <Card
          key={index}
          className="min-h-[120px] border border-transparent px-4 dark:border-default-100"
        >
          <section className="flex h-full flex-nowrap items-center justify-between">
            <div className="flex h-full flex-col gap-y-3 py-4 md:flex-row md:justify-between md:gap-x-2">
              <div className="flex h-full w-full flex-col justify-between gap-y-3">
                <dt className="flex items-center gap-x-2 text-base font-medium text-default-500">
                  {title}
                  <div className="md:hidden">
                    {trendChipContent({ changeType, change, trendChipPosition })}
                  </div>
                </dt>
                <div className="flex gap-x-2">
                  <dd className="text-3xl font-semibold text-default-700">{value}</dd>
                  <div
                    className={cn("hidden md:block", {
                      "self-start": trendChipPosition === "top",
                      "self-end": trendChipPosition === "bottom",
                    })}
                  >
                    {trendChipContent({ changeType, change, trendChipPosition })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[120px] w-[180px] shrink-0 items-center">
              <ResponsiveContainer
                className="[&_.recharts-surface]:outline-none"
                height="100%"
                width="100%"
              >
                <BarChart
                  accessibilityLayer
                  barSize={12}
                  data={data[index].chartData}
                  id={`chart-${index}`}
                  margin={{ top: 24, bottom: 4 }}
                >
                  <XAxis
                    axisLine={false}
                    dataKey="weekday"
                    style={{ fontSize: "var(--heroui-font-size-tiny)" }}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ label, payload }) => (
                      <div className="flex h-8 min-w-[80px] items-center gap-x-2 rounded-medium bg-background p-2 text-tiny shadow-small">
                        <div className="h-2 w-2 rounded-sm bg-foreground" />
                        <span className="text-default-500">{formatWeekday(label as string)}</span>
                        <span className="font-medium text-default-700">
                          {formatValue(payload?.[0]?.value as number)}
                        </span>
                      </div>
                    )}
                    cursor={false}
                  />
                  <Bar
                    background={{ fill: "hsl(var(--heroui-default-200))", radius: 8 }}
                    className="transition-colors"
                    dataKey="value"
                    fill="hsl(var(--heroui-foreground))"
                    radius={8}
                    onMouseEnter={(_, itemIndex) => handleMouseEnter(index, itemIndex)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </Card>
      ))}
    </dl>
  );
}
