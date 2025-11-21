"use client";

import { cn } from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

const data = [
  {
    title: "New Subscriptions",
    value: 249,
    chartData: [
      {
        month: "January",
        value: 309,
      },
      {
        month: "February",
        value: 269,
      },
      {
        month: "March",
        value: 286,
      },
      {
        month: "April",
        value: 312,
      },
      {
        month: "May",
        value: 187,
      },
      {
        month: "June",
        value: 249,
      },
      {
        month: "July",
        value: 275,
      },
      {
        month: "August",
        value: 293,
      },
      {
        month: "September",
        value: 305,
      },
      {
        month: "October",
        value: 289,
      },
      {
        month: "November",
        value: 326,
      },
      {
        month: "December",
        value: 341,
      },
    ],
    change: "33%",
    changeType: "positive",
    xaxis: "month",
  },
  {
    title: "New Sales",
    value: 1159,
    chartData: [
      {
        month: "January",
        value: 40,
      },
      {
        month: "February",
        value: 1256,
      },
      {
        month: "March",
        value: 1123,
      },
      {
        month: "April",
        value: 1300,
      },
      {
        month: "May",
        value: 943,
      },
      {
        month: "June",
        value: 943,
      },
      {
        month: "July",
        value: 1089,
      },
      {
        month: "August",
        value: 1245,
      },
      {
        month: "September",
        value: 1190,
      },
      {
        month: "October",
        value: 1350,
      },
      {
        month: "November",
        value: 1159,
      },
      {
        month: "December",
        value: 1275,
      },
    ],
    change: "0%",
    changeType: "neutral",
    xaxis: "month",
  },
  {
    title: "Avg. Sale Revenue",
    value: "$328",
    chartData: [
      {
        month: "January",
        value: 40,
      },
      {
        month: "February",
        value: 8000,
      },
      {
        month: "March",
        value: 7000,
      },
      {
        month: "April",
        value: 15000,
      },
      {
        month: "May",
        value: 20000,
      },
      {
        month: "June",
        value: 18000,
      },
      {
        month: "July",
        value: 25000,
      },
      {
        month: "August",
        value: 50000,
      },
      {
        month: "September",
        value: 35000,
      },
      {
        month: "October",
        value: 28441,
      },
      {
        month: "November",
        value: 32000,
      },
      {
        month: "December",
        value: 30500,
      },
    ],
    change: "19%",
    changeType: "negative",
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
    <dl className="grid w-full grid-cols-1 gap-5 divide-y divide-default-200 rounded-medium border border-transparent bg-content1 p-2 shadow-small dark:border-default-100 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-3 md:divide-x">
      {data.map(({ title, value, change, changeType, xaxis, chartData }, index) => (
        <div key={index} className="max-h-[140px]">
          <section className={"flex flex-wrap justify-between"}>
            <div className="flex flex-col justify-between gap-y-2 p-4">
              <div>
                <div className="text-sm font-medium text-default-600">{title}</div>
                <div className="mt-4">
                  <span className="text-3xl font-semibold text-default-700">{value}</span>
                </div>
              </div>
              <div
                className={cn("mt-2 flex items-center gap-x-1 text-xs font-medium", {
                  "text-success-500": changeType === "positive",
                  "text-warning-500": changeType === "neutral",
                  "text-danger-500": changeType === "negative",
                })}
              >
                {changeType === "positive" ? (
                  <Icon height={16} icon={"solar:arrow-right-up-linear"} width={16} />
                ) : changeType === "neutral" ? (
                  <Icon height={16} icon={"solar:arrow-right-linear"} width={16} />
                ) : (
                  <Icon height={16} icon={"solar:arrow-right-down-linear"} width={16} />
                )}
                <span>{change}</span>
                <span className="text-default-400 dark:text-default-500">
                  {" "}
                  vs {xaxis === "day" ? "yesterday" : "last " + xaxis}
                </span>
              </div>
            </div>

            <div className="mt-10 hidden min-h-24 w-36 shrink-0 lg:block">
              <ResponsiveContainer className="[&_.recharts-surface]:outline-none" width="100%">
                <AreaChart accessibilityLayer data={chartData}>
                  <defs>
                    <linearGradient id={"colorUv" + index} x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={cn({
                          "hsl(var(--heroui-success))": changeType === "positive",
                          "hsl(var(--heroui-danger))": changeType === "negative",
                          "hsl(var(--heroui-warning))": changeType === "neutral",
                        })}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="60%"
                        stopColor={cn({
                          "hsl(var(--heroui-success))": changeType === "positive",
                          "hsl(var(--heroui-danger))": changeType === "negative",
                          "hsl(var(--heroui-warning))": changeType === "neutral",
                        })}
                        stopOpacity={0}
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
                      "hsl(var(--heroui-success))": changeType === "positive",
                      "hsl(var(--heroui-danger))": changeType === "negative",
                      "hsl(var(--heroui-warning))": changeType === "neutral",
                    })}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      ))}
    </dl>
  );
}
