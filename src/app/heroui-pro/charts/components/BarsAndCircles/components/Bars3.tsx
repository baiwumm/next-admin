"use client";


import {
  Button,
  type ButtonProps, Card,
  type CardProps,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem
} from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";
import { Bar, BarChart, ReferenceLine, ResponsiveContainer, Tooltip } from "recharts";

type ChartData = {
  month: string;
  [key: string]: string | number;
};

type BarChartProps = {
  title: string;
  value: string;
  unit?: string;
  color: ButtonProps["color"];
  categories: string[];
  chartData: ChartData[];
};

const data: BarChartProps[] = [
  {
    title: "Monthly Expenses",
    value: "$5,420",
    unit: "avg",
    categories: ["Expenses", "Savings"],
    color: "default",
    chartData: [
      {
        month: "Jan",
        Expenses: 1340,
        Savings: -1340,
      },
      {
        month: "Feb",
        Expenses: 450,
        Savings: -750,
      },
      {
        month: "Mar",
        Expenses: 1044,
        Savings: -1044,
      },
      {
        month: "Apr",
        Expenses: 450,
        Savings: -450,
      },
      {
        month: "May",
        Expenses: 900,
        Savings: -700,
      },
      {
        month: "Jun",
        Expenses: 1250,
        Savings: -1250,
      },
      {
        month: "Jul",
        Expenses: 400,
        Savings: -600,
      },
      {
        month: "Aug",
        Expenses: 600,
        Savings: -800,
      },
      {
        month: "Sep",
        Expenses: 1200,
        Savings: -1200,
      },
      {
        month: "Oct",
        Expenses: 500,
        Savings: -500,
      },
      {
        month: "Nov",
        Expenses: 800,
        Savings: -800,
      },
    ],
  },
  {
    title: "Annual Revenue",
    value: "$12,780",
    unit: "avg",
    categories: ["Revenue", "Costs"],
    color: "secondary",
    chartData: [
      {
        month: "Jan",
        Revenue: 1340,
        Costs: -1340,
      },
      {
        month: "Feb",
        Revenue: 450,
        Costs: -750,
      },
      {
        month: "Mar",
        Revenue: 1044,
        Costs: -1044,
      },
      {
        month: "Apr",
        Revenue: 450,
        Costs: -450,
      },
      {
        month: "May",
        Revenue: 900,
        Costs: -700,
      },
      {
        month: "Jun",
        Revenue: 1250,
        Costs: -1250,
      },
      {
        month: "Jul",
        Revenue: 400,
        Costs: -600,
      },
      {
        month: "Aug",
        Revenue: 600,
        Costs: -800,
      },
      {
        month: "Sep",
        Revenue: 1200,
        Costs: -1200,
      },
      {
        month: "Oct",
        Revenue: 500,
        Costs: -500,
      },
      {
        month: "Nov",
        Revenue: 800,
        Costs: -800,
      },
    ],
  },
  {
    title: "Project Budget",
    value: "$8,350",
    unit: "total",
    categories: ["Budget", "Spent"],
    color: "warning",
    chartData: [
      {
        month: "Jan",
        Budget: 1340,
        Spent: -1340,
      },
      {
        month: "Feb",
        Budget: 450,
        Spent: -750,
      },
      {
        month: "Mar",
        Budget: 1044,
        Spent: -1044,
      },
      {
        month: "Apr",
        Budget: 450,
        Spent: -450,
      },
      {
        month: "May",
        Budget: 900,
        Spent: -700,
      },
      {
        month: "Jun",
        Budget: 1250,
        Spent: -1250,
      },
      {
        month: "Jul",
        Budget: 400,
        Spent: -600,
      },
      {
        month: "Aug",
        Budget: 600,
        Spent: -800,
      },
      {
        month: "Sep",
        Budget: 1200,
        Spent: -1200,
      },
      {
        month: "Oct",
        Budget: 500,
        Spent: -500,
      },
      {
        month: "Nov",
        Budget: 800,
        Spent: -800,
      },
    ],
  },
];

export default function Component() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
      {data.map((item, index) => (
        <BarChartCard key={index} {...item} />
      ))}
    </dl>
  );
}

const formatMonth = (month: string) => {
  const monthNumber =
    {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }[month] ?? 0;

  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(2024, monthNumber, 1));
};

const BarChartCard = React.forwardRef<HTMLDivElement, Omit<CardProps, "children"> & BarChartProps>(
  ({ className, title, value, unit, categories, color, chartData, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("h-[300px] border border-transparent dark:border-default-100", className)}
        {...props}
      >
        <div className="flex flex-col gap-y-2 px-4 pb-2 pt-4">
          <div className="flex items-center justify-between gap-x-2">
            <dt>
              <h3 className="text-small font-medium text-default-500">{title}</h3>
            </dt>
            <div className="flex items-center justify-end gap-x-2">
              <Select
                aria-label="Time Range"
                classNames={{
                  trigger: "min-w-[100px] min-h-7 h-7",
                  value: "text-tiny !text-default-500",
                  selectorIcon: "text-default-500",
                  popoverContent: "min-w-[120px]",
                }}
                defaultSelectedKeys={["per-day"]}
                listboxProps={{
                  itemClasses: {
                    title: "text-tiny",
                  },
                }}
                placeholder="Per Day"
                size="sm"
              >
                <SelectItem key="per-day">Per Day</SelectItem>
                <SelectItem key="per-week">Per Week</SelectItem>
                <SelectItem key="per-month">Per Month</SelectItem>
              </Select>
              <Dropdown
                classNames={{
                  content: "min-w-[120px]",
                }}
                placement="bottom-end"
              >
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
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
            </div>
          </div>
          <dd className="flex items-baseline gap-x-1">
            <span className="text-3xl font-semibold text-default-900">{value}</span>
            <span className="text-medium font-medium text-default-500">{unit}</span>
          </dd>
        </div>
        <ResponsiveContainer
          className="[&_.recharts-surface]:outline-none"
          height="100%"
          width="100%"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 24,
              left: 20,
              bottom: 24,
            }}
            /**
             * Determines how values are stacked:
             *
             * - `none` is the default, it adds values on top of each other. No smarts. Negative values will overlap.
             * - `expand` make it so that the values always add up to 1 - so the chart will look like a rectangle.
             * - `wiggle` and `silhouette` tries to keep the chart centered.
             * - `sign` stacks positive values above zero and negative values below zero. Similar to `none` but handles negatives.
             * - `positive` ignores all negative values, and then behaves like \`none\`.
             *
             * Also see https://d3js.org/d3-shape/stack#stack-offsets
             * (note that the `diverging` offset in d3 is named `sign` in recharts)
             */
            stackOffset="sign"
          >
            <Tooltip
              content={({ payload }) => {
                const month = payload?.[0]?.payload?.month;

                return (
                  <div className="flex h-auto min-w-[120px] items-center gap-x-2 rounded-medium bg-background p-2 text-tiny shadow-small">
                    <div className="flex w-full flex-col gap-y-1">
                      <span className="font-medium text-foreground">{formatMonth(month)}</span>
                      {payload?.map((p, index) => {
                        const name = p.name;
                        const value = p.value;
                        const category = categories.find((c) => c.toLowerCase() === name) ?? name;

                        return (
                          <div
                            key={`${index}-${name}`}
                            className="flex w-full items-center gap-x-2"
                          >
                            <div
                              className="h-2 w-2 flex-none rounded-full"
                              style={{
                                backgroundColor:
                                  index === 0
                                    ? color === "default"
                                      ? "hsl(var(--heroui-foreground))"
                                      : `hsl(var(--heroui-${color}))`
                                    : "hsl(var(--heroui-default-200))",
                              }}
                            />
                            <div className="flex w-full items-center justify-between gap-x-2 pr-1 text-xs text-default-700">
                              <span className="text-default-500">{category}</span>
                              <span className="font-mono font-medium text-default-700">
                                {value}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }}
              cursor={false}
            />
            {[-1000, 0, 1000].map((value) => (
              <ReferenceLine
                key={value}
                stroke="hsl(var(--heroui-default-200))"
                strokeDasharray="3 3"
                y={value}
              />
            ))}
            {categories.map((category, index) => (
              <Bar
                key={category}
                animationDuration={450}
                animationEasing="ease"
                barSize={8}
                dataKey={category}
                fill={
                  index === 0
                    ? cn({
                      "hsl(var(--heroui-foreground))": color === "default",
                      "hsl(var(--heroui-success))": color === "success",
                      "hsl(var(--heroui-warning))": color === "warning",
                      "hsl(var(--heroui-danger))": color === "danger",
                      "hsl(var(--heroui-primary))": color === "primary",
                      "hsl(var(--heroui-secondary))": color === "secondary",
                    })
                    : "hsl(var(--heroui-default-200))"
                }
                radius={[8, 8, 0, 0]}
                stackId="stack"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>

        <div className="flex w-full justify-center gap-4 pb-4 text-tiny text-default-500">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: `hsl(var(--heroui-${index === 0 ? (color === "default" ? "foreground" : color) : "default-200"
                    }))`,
                }}
              />
              <span className="capitalize">{category}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  },
);

BarChartCard.displayName = "BarChartCard";
