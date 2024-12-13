/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-13 16:58:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-13 17:59:28
 * @Description: 列项操作
 */
'use client';

import { FilePenLine, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableRowActionsProps {
  row: App.SystemManage.Internalization;
  handleEdit: (row: App.SystemManage.Internalization) => void;
  handleDelete: (id: string) => void;
}

export default function ColumnOperation({ row, handleEdit, handleDelete }: DataTableRowActionsProps) {
  const t = useTranslations('Global');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted mx-auto">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleEdit(row)}>
          <FilePenLine />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete(row.id)}>
          <Trash2 />
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
