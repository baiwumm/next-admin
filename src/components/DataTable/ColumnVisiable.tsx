/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-11 16:47:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-19 14:27:00
 * @Description: 列项隐藏设置
 */
'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { RiEqualizer2Line } from '@remixicon/react';
import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  field: string; // 国际化字段
}

export default function ColumnVisiable<TData>({ table, field }: DataTableViewOptionsProps<TData>) {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <RiEqualizer2Line />
          {tGlobal('column-setting')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {tGlobal.has(column.id) ? tGlobal(column.id) : t(`${field}.${column.id}`)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
