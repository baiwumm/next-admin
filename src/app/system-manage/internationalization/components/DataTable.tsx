/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-11 15:20:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-12 14:34:07
 * @Description: 表格列表
 */
'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Loader2, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Fragment } from 'react';

import ColumnVisiable from '@/components/DataTable/ColumnVisiable';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import HeaderSearch from './HeaderSearch'; // 顶部搜索

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  refresh: (params?: App.SystemManage.InternalizationSearchParams) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  refresh,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations('Global');

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getSubRows: (row) => row.children, // return the children array as sub-rows
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnVisibility,
      sorting,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <HeaderSearch loading={loading} refresh={refresh} />
          <Button variant="outline" size="sm" className="border-dashed">
            <Plus />
            {t('add')}
          </Button>
        </div>
        {/* 列设置项 */}
        <ColumnVisiable table={table} field="internationalization" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t('noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
