"use client";

import {
  Button,
  Card,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
} from "@heroui/react";
import { Icon } from "@iconify-icon/react";
import React from "react";

const data: {
  title: string;
  value: number;
  maxValue: number;
  color: "primary" | "secondary" | "success" | "danger" | "warning" | "default";
  iconName: string;
}[] = [
    {
      title: "House Saving",
      value: 45300,
      maxValue: 150000,
      color: "warning",
      iconName: "solar:home-2-bold",
    },
    {
      title: "Laptop",
      value: 300,
      maxValue: 1150,
      color: "secondary",
      iconName: "solar:laptop-bold",
    },
    {
      title: "Trip Saving",
      value: 5300,
      maxValue: 15000,
      color: "default",
      iconName: "solar:water-sun-bold",
    },
    {
      title: "Scooter Saving",
      value: 150,
      maxValue: 350,
      color: "primary",
      iconName: "solar:kick-scooter-bold",
    },
  ];

export default function Component() {
  return (
    <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map(({ title, value, maxValue, color, iconName }, index) => (
        <Card
          key={index}
          className="flex flex-col border border-transparent p-4 dark:border-default-100"
        >
          <div
            className={cn("flex h-10 w-10 items-center justify-center rounded-full border", {
              "border-primary-200 bg-primary-50 text-primary": color === "primary",
              "border-secondary-200 bg-secondary-50 text-secondary": color === "secondary",
              "border-success-200 bg-success-50 text-success": color === "success",
              "border-warning-200 bg-warning-50 text-warning": color === "warning",
              "border-danger-200 bg-danger-50 text-danger": color === "danger",
              "border-default-200 bg-default-50 text-default-500": color === "default",
            })}
          >
            <Icon icon={iconName} width={18} />
          </div>

          <div className="mt-2 flex flex-col gap-y-0.5 px-0.5">
            <dt className="text-medium font-medium text-default-700">{title}</dt>
            <dd className="text-xs font-medium text-default-500">
              ${value} of ${maxValue}
            </dd>
          </div>

          <Progress
            aria-label="status"
            className="mt-2"
            classNames={{
              track: cn("bg-default-200", {
                "bg-primary-100": color === "primary",
                "bg-secondary-100": color === "secondary",
                "bg-success-100": color === "success",
                "bg-warning-100": color === "warning",
                "bg-danger-100": color === "danger",
                "bg-default-100": color === "default",
              }),
            }}
            color={color}
            value={(value / maxValue) * 100}
          />

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
        </Card>
      ))}
    </dl>
  );
}
