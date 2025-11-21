"use client";

import {
  Button,
  Card,
  type CardProps,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  tv,
  type VariantProps
} from "@heroui/react";
import { Icon, type IconifyIcon } from "@iconify-icon/react";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

/**
 * 🚨 This example requires installing the `recharts` package:
 * `npm install recharts`
 */
export default function Component() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map(({ title, value, change, color, xaxis, chartData, icon }, index) => (
        <ChartCard
          key={index}
          change={change}
          chartData={chartData}
          color={color}
          icon={icon}
          index={index}
          title={title}
          value={value}
          xaxis={xaxis}
        />
      ))}
    </dl>
  );
}

const chart = tv({
  slots: {
    card: "shadow-none",
    iconWrapper: "rounded-small p-2",
    trendIconWrapper: "mt-2 flex items-center gap-x-1 text-xs font-medium",
  },
  variants: {
    color: {
      default: {
        card: "bg-default-50",
        iconWrapper: "bg-default-200/50 text-default-700",
        trendIconWrapper: "text-default-700",
      },
      primary: {
        card: "bg-primary-50 ",
        iconWrapper: "bg-primary-100 dark:bg-primary-100/50 text-primary",
        trendIconWrapper: "text-primary",
      },
      secondary: {
        card: "bg-secondary-50",
        iconWrapper: "bg-secondary-100 dark:bg-secondary-100/50 text-secondary",
        trendIconWrapper: "text-secondary",
      },
      success: {
        card: "bg-success-50",
        iconWrapper: "bg-success-100 dark:bg-success-100/50 text-success",
        trendIconWrapper: "text-success",
      },
      warning: {
        card: "bg-warning-50",
        iconWrapper: "bg-warning-100 dark:bg-warning-100/50 text-warning",
        trendIconWrapper: "text-warning",
      },
      danger: {
        card: "bg-danger-50",
        iconWrapper: "bg-danger-100 dark:bg-danger-100/50 text-danger",
        trendIconWrapper: "text-danger",
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

type ChartData = {
  month: string;
  value: number;
};

type ChartCardProps = {
  title: string;
  value: number | string;
  change: string;
  index: number;
  xaxis: "month" | "day";
  chartData: ChartData[];
  icon?: IconifyIcon | string;
} & Omit<CardProps, "children" | "classNames"> &
  VariantProps<typeof chart>;

const ChartCard = React.forwardRef<HTMLDivElement, ChartCardProps>(
  ({ title, value, change, color, icon, xaxis, chartData, index, className, ...props }, ref) => {
    const classes = React.useMemo(() => chart({ color }), [color]);

    return (
      <Card
        ref={ref}
        className={classes.card({
          className,
        })}
        {...props}
      >
        <section className="flex flex-nowrap justify-between">
          <div className="flex flex-col justify-between gap-y-2 p-4">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-3">
                {icon && (
                  <div className={classes.iconWrapper()}>
                    <Icon className="text-inherit" height={16} icon={icon} width={16} />
                  </div>
                )}
                <dt className="text-sm font-medium text-default-600">{title}</dt>
              </div>
              <dd className="text-3xl font-semibold text-default-700">{value}</dd>
            </div>
            <div className={classes.trendIconWrapper()}>
              {color === "success" ? (
                <Icon height={16} icon={"solar:arrow-right-up-linear"} width={16} />
              ) : color === "warning" ? (
                <Icon height={16} icon={"solar:arrow-right-linear"} width={16} />
              ) : (
                <Icon height={16} icon={"solar:arrow-right-down-linear"} width={16} />
              )}
              <span>{change}</span>
              <span className="text-default-500">
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
                        "hsl(var(--heroui-foreground))": color === "default",
                        "hsl(var(--heroui-success))": color === "success",
                        "hsl(var(--heroui-danger))": color === "danger",
                        "hsl(var(--heroui-warning))": color === "warning",
                        "hsl(var(--heroui-secondary))": color === "secondary",
                        "hsl(var(--heroui-primary))": color === "primary",
                      })}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="10%"
                      stopColor={cn({
                        "hsl(var(--heroui-foreground))": color === "default",
                        "hsl(var(--heroui-success))": color === "success",
                        "hsl(var(--heroui-danger))": color === "danger",
                        "hsl(var(--heroui-warning))": color === "warning",
                        "hsl(var(--heroui-secondary))": color === "secondary",
                        "hsl(var(--heroui-primary))": color === "primary",
                      })}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <YAxis domain={[Math.min(...chartData.map((d) => d.value)), "auto"]} hide={true} />
                <Area
                  dataKey="value"
                  fill={`url(#colorUv${index})`}
                  stroke={cn({
                    "hsl(var(--heroui-foreground))": color === "default",
                    "hsl(var(--heroui-success))": color === "success",
                    "hsl(var(--heroui-danger))": color === "danger",
                    "hsl(var(--heroui-warning))": color === "warning",
                    "hsl(var(--heroui-secondary))": color === "secondary",
                    "hsl(var(--heroui-primary))": color === "primary",
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
    );
  },
);

ChartCard.displayName = "ChartCard";

type ChartProps = Omit<ChartCardProps, "index">;

const data: ChartProps[] = [
  {
    title: "Bounce Rate",
    value: "42.3%",
    chartData: [
      { month: "January", value: 18.2 },
      { month: "February", value: 22.1 },
      { month: "March", value: 37.8 },
      { month: "April", value: 53.5 },
      { month: "May", value: 65.8 },
      { month: "June", value: 71.2 },
      { month: "July", value: 62.8 },
      { month: "August", value: 52.3 },
      { month: "September", value: 51.8 },
      { month: "October", value: 50.3 },
      { month: "November", value: 51.1 },
      { month: "December", value: 40.5 },
    ],
    icon: "solar:spedometer-max-linear",
    change: "-5.9%",
    color: "default",
    xaxis: "month",
  },
  {
    title: "Avg. Session Duration",
    value: "4:32",
    chartData: [
      { month: "January", value: 205 },
      { month: "February", value: 185 },
      { month: "March", value: 242 },
      { month: "April", value: 228 },
      { month: "May", value: 265 },
      { month: "June", value: 245 },
      { month: "July", value: 262 },
      { month: "August", value: 272 },
      { month: "September", value: 268 },
      { month: "October", value: 255 },
      { month: "November", value: 260 },
      { month: "December", value: 258 },
    ],
    icon: "solar:clock-circle-linear",
    change: "+12.4%",
    color: "success",
    xaxis: "month",
  },
  {
    title: "Conversion Rate",
    value: "3.8%",
    chartData: [
      { month: "January", value: 2.1 },
      { month: "February", value: 2.4 },
      { month: "March", value: 3.2 },
      { month: "April", value: 2.8 },
      { month: "May", value: 3.5 },
      { month: "June", value: 3.2 },
      { month: "July", value: 3.6 },
      { month: "August", value: 3.8 },
    ],
    change: "+1.7%",
    color: "warning",
    icon: "solar:colour-tuneing-linear",
    xaxis: "month",
  },
  {
    title: "Pages per Session",
    value: 4.2,
    chartData: [
      { month: "Monday", value: 3.8 },
      { month: "Tuesday", value: 4.5 },
      { month: "Wednesday", value: 4.1 },
      { month: "Thursday", value: 3.9 },
      { month: "Friday", value: 4.3 },
      { month: "Saturday", value: 4.0 },
      { month: "Sunday", value: 4.2 },
    ],
    change: "+4.20",
    color: "primary",
    icon: "solar:global-linear",
    xaxis: "day",
  },
  {
    title: "New vs Returning",
    value: "48.5%",
    chartData: [
      { month: "January", value: 72.4 },
      { month: "February", value: 74.2 },
      { month: "March", value: 71.5 },
      { month: "April", value: 69.8 },
      { month: "May", value: 70.1 },
      { month: "June", value: 68.9 },
      { month: "July", value: 67.8 },
      { month: "August", value: 68.5 },
    ],
    change: "-12.9%",
    color: "secondary",
    icon: "solar:cursor-linear",
    xaxis: "month",
  },
  {
    title: "Load Time (ms)",
    value: "856ms",
    chartData: [
      { month: "January", value: 200 },
      { month: "February", value: 380 },
      { month: "March", value: 250 },
      { month: "April", value: 390 },
      { month: "May", value: 420 },
      { month: "June", value: 485 },
      { month: "July", value: 520 },
      { month: "August", value: 516 },
    ],
    change: "-28.7%",
    color: "danger",
    icon: "solar:server-square-update-linear",
    xaxis: "month",
  },
];
