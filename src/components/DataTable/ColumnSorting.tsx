/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-11 16:17:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 09:26:26
 * @Description: 列项设置
 */
'use client';
import { cn } from '@nextui-org/react';
import { RiArrowDownLine, RiArrowUpLine, RiExpandUpDownLine, RiEyeOffLine } from '@remixicon/react';
import { Column } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export default function ColumnSorting<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const t = useTranslations('Global');
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div className={cn('flex items-center space-x-2 justify-center', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <RiArrowDownLine />
            ) : column.getIsSorted() === 'asc' ? (
              <RiArrowUpLine />
            ) : (
              <RiExpandUpDownLine />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <RiArrowUpLine className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t('asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <RiArrowDownLine className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t('desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <RiEyeOffLine className="h-3.5 w-3.5 text-muted-foreground/70" />
            {t('hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
