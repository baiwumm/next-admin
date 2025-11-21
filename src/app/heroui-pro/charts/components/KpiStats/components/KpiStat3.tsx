"use client";

import {
  Button,
  Card,
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
    title: "New Subscriptions",
    value: 249,
    chartData: [
      {
        month: "January",
        value: 159,
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
        value: 287,
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
        value: 266,
      },
      {
        month: "December",
        value: 278,
      },
    ],
    change: "33%",
    changeType: "positive",
    xaxis: "month",
  },
  {
    title: "New Customers",
    value: 1159,
    chartData: [
      {
        month: "January",
        value: 940,
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
        value: 1243,
      },
      {
        month: "June",
        value: 1113,
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
        value: 1159,
      },
      {
        month: "November",
        value: 1067,
      },
      {
        month: "December",
        value: 1198,
      },
    ],
    change: "0%",
    changeType: "neutral",
    xaxis: "month",
  },
  {
    title: "Month's Revenue",
    value: "$228,441",
    chartData: [
      {
        month: "January",
        value: 40000,
      },
      {
        month: "February",
        value: 48000,
      },
      {
        month: "March",
        value: 57000,
      },
      {
        month: "April",
        value: 65000,
      },
      {
        month: "May",
        value: 72000,
      },
      {
        month: "June",
        value: 88000,
      },
      {
        month: "July",
        value: 79000,
      },
      {
        month: "August",
        value: 95000,
      },
      {
        month: "September",
        value: 85000,
      },
      {
        month: "October",
        value: 84441,
      },
      {
        month: "November",
        value: 98000,
      },
      {
        month: "December",
        value: 79500,
      },
    ],
    change: "19%",
    changeType: "negative",
    xaxis: "month",
  },
  {
    title: "Todays' Sales",
    value: 54,
    chartData: [
      {
        month: "Monday",
        value: 38,
      },
      {
        month: "Tuesday",
        value: 40,
      },
      {
        month: "Wednesday",
        value: 37,
      },
      {
        month: "Thursday",
        value: 49,
      },
      {
        month: "Friday",
        value: 52,
      },
      {
        month: "June",
        value: 54,
      },
    ],
    change: "3.3%",
    changeType: "positive",
    xaxis: "day",
  },
];

/**
 * 🚨 This example requires installing the `recharts` package:
 * `npm install recharts`
 */
export default function Component() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map(({ title, value, change, changeType, xaxis, chartData }, index) => (
        <Card key={index} className="border border-transparent dark:border-default-100">
          <section className="flex flex-nowrap justify-between">
            <div className="flex flex-col justify-between gap-y-2 p-4">
              <div className="flex flex-col gap-y-4">
                <dt className="text-sm font-medium text-default-600">{title}</dt>
                <dd className="text-3xl font-semibold text-default-700">{value}</dd>
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
            <div className="mt-10 min-h-24 w-36 min-w-[140px] shrink-0">
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
