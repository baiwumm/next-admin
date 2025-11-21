"use client";

import {
  Button,
  Card,
  Chip,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

const data = [
  {
    title: "S&P 500",
    subtitle: "Standard & Poor's 500",
    value: "$5,969.51",
    chartData: [
      { month: "January", value: 4850 },
      { month: "February", value: 4790 },
      { month: "March", value: 4920 },
      { month: "April", value: 4880 },
      { month: "May", value: 4950 },
      { month: "June", value: 4890 },
      { month: "July", value: 4970 },
      { month: "August", value: 4920 },
      { month: "September", value: 5010 },
      { month: "October", value: 4980 },
      { month: "November", value: 5100 },
    ],
    change: "1.2%",
    color: "success",
    xaxis: "month",
  },
  {
    title: "ABNB",
    subtitle: "Airbnb, Inc.",
    value: "$137,34",
    chartData: [
      { month: "January", value: 120 },
      { month: "February", value: 126 },
      { month: "March", value: 123 },
      { month: "April", value: 130 },
      { month: "May", value: 133 },
      { month: "June", value: 128 },
      { month: "July", value: 125 },
      { month: "August", value: 132 },
      { month: "September", value: 135 },
      { month: "October", value: 134 },
      { month: "November", value: 136 },
    ],
    change: "0.3%",
    color: "warning",
    xaxis: "month",
  },
  {
    title: "UBER",
    subtitle: "Uber Technologies, Inc.",
    value: "$71,51",
    chartData: [
      { month: "January", value: 85 },
      { month: "February", value: 82 },
      { month: "March", value: 79 },
      { month: "April", value: 77 },
      { month: "May", value: 75 },
      { month: "June", value: 74 },
      { month: "July", value: 73 },
      { month: "August", value: 72 },
      { month: "September", value: 71 },
      { month: "October", value: 70 },
      { month: "November", value: 69 },
      { month: "December", value: 71 },
    ],
    change: "-0.8%",
    color: "danger",
    xaxis: "month",
  },
  {
    title: "BTC",
    subtitle: "Bitcoin (USD)",
    value: "$97,859",
    chartData: [
      { month: "January", value: 42582 },
      { month: "February", value: 61198 },
      { month: "March", value: 71333 },
      { month: "April", value: 60636 },
      { month: "May", value: 67491 },
      { month: "June", value: 62678 },
      { month: "July", value: 64619 },
      { month: "August", value: 58969 },
      { month: "September", value: 63329 },
      { month: "October", value: 70215 },
      { month: "November", value: 97850 },
    ],
    change: "10.9%",
    color: "secondary",
    xaxis: "month",
  },
  {
    title: "AAPL",
    subtitle: "Apple Inc.",
    value: "$172.62",
    chartData: [
      { month: "January", value: 185 },
      { month: "February", value: 182 },
      { month: "March", value: 178 },
      { month: "April", value: 169 },
      { month: "May", value: 173 },
      { month: "June", value: 175 },
      { month: "July", value: 178 },
      { month: "August", value: 176 },
      { month: "September", value: 171 },
      { month: "October", value: 170 },
      { month: "November", value: 173 },
    ],
    change: "0.5%",
    color: "primary",
    xaxis: "month",
  },
  {
    title: "GOOG",
    subtitle: "Alphabet Inc.",
    value: "$166,57",
    chartData: [
      { month: "January", value: 150 },
      { month: "February", value: 155 },
      { month: "March", value: 158 },
      { month: "April", value: 162 },
      { month: "May", value: 160 },
      { month: "June", value: 163 },
      { month: "July", value: 165 },
      { month: "August", value: 164 },
      { month: "September", value: 166 },
      { month: "October", value: 165 },
      { month: "November", value: 167 },
    ],
    change: "0.2%",
    color: "default",
    xaxis: "month",
  },
];

/**
 * 🚨 This example requires installing the `recharts` package:
 * `npm install recharts`
 *
 * ```tsx
 * import {Area, AreaChart, ResponsiveContainer, YAxis} from "recharts";
 * ```
 */
export default function Component() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map(({ title, subtitle, value, change, color, chartData }, index) => (
        <Card key={index} className="border border-transparent dark:border-default-100">
          <section className="flex flex-col flex-nowrap">
            <div className="flex flex-col justify-between gap-y-2 px-4 pt-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-0">
                  <dt className="text-sm font-medium text-default-600">{title}</dt>
                  <dt className="text-tiny font-normal text-default-400">{subtitle}</dt>
                </div>
                <div className="flex items-baseline gap-x-2">
                  <dd className="text-xl font-semibold text-default-700">{value}</dd>
                  <Chip
                    classNames={{
                      content: "font-medium",
                    }}
                    color={
                      color === "success"
                        ? "success"
                        : color === "primary"
                          ? "primary"
                          : color === "secondary"
                            ? "secondary"
                            : color === "warning"
                              ? "warning"
                              : color === "danger"
                                ? "danger"
                                : "default"
                    }
                    radius="sm"
                    size="sm"
                    startContent={
                      color === "success" ? (
                        <Icon height={16} icon={"solar:arrow-right-up-linear"} width={16} />
                      ) : color === "danger" ? (
                        <Icon height={16} icon={"solar:arrow-right-down-linear"} width={16} />
                      ) : (
                        <Icon height={16} icon={"solar:arrow-right-linear"} width={16} />
                      )
                    }
                    variant="flat"
                  >
                    <span>{change}</span>
                  </Chip>
                </div>
              </div>
            </div>
            <div className="min-h-24 w-full">
              <ResponsiveContainer className="[&_.recharts-surface]:outline-none">
                <AreaChart accessibilityLayer className="translate-y-1 scale-105" data={chartData}>
                  <defs>
                    <linearGradient id={"colorUv" + index} x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="10%"
                        stopColor={cn({
                          "hsl(var(--heroui-success))": color === "success",
                          "hsl(var(--heroui-primary))": color === "primary",
                          "hsl(var(--heroui-secondary))": color === "secondary",
                          "hsl(var(--heroui-warning))": color === "warning",
                          "hsl(var(--heroui-danger))": color === "danger",
                          "hsl(var(--heroui-foreground))": color === "default",
                        })}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={cn({
                          "hsl(var(--heroui-success))": color === "success",
                          "hsl(var(--heroui-primary))": color === "primary",
                          "hsl(var(--heroui-secondary))": color === "secondary",
                          "hsl(var(--heroui-warning))": color === "warning",
                          "hsl(var(--heroui-danger))": color === "danger",
                          "hsl(var(--heroui-foreground))": color === "default",
                        })}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <YAxis
                    domain={[Math.min(...chartData.map((d) => d.value)), "auto"]}
                    hide={true}
                  />
                  <Area
                    dataKey="value"
                    fill={`url(#colorUv${index})`}
                    stroke={cn({
                      "hsl(var(--heroui-success))": color === "success",
                      "hsl(var(--heroui-primary))": color === "primary",
                      "hsl(var(--heroui-secondary))": color === "secondary",
                      "hsl(var(--heroui-warning))": color === "warning",
                      "hsl(var(--heroui-danger))": color === "danger",
                      "hsl(var(--heroui-foreground))": color === "default",
                    })}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <Dropdown
              classNames={{
                content: "min-w-[120px]",
              }}
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="absolute right-2 top-2 w-auto rounded-full"
                  size="sm"
                  variant="light"
                >
                  <Icon height={16} icon="solar:menu-dots-bold" width={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  title: "text-tiny",
                }}
                variant="flat"
              >
                <DropdownItem key="view-details">View Details</DropdownItem>
                <DropdownItem key="export-data">Export Data</DropdownItem>
                <DropdownItem key="set-alert">Set Alert</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </section>
        </Card>
      ))}
    </dl>
  );
}
