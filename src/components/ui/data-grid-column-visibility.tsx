import { Table } from '@tanstack/react-table';
import { Settings2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui';

function DataGridColumnVisibility<TData>({ table, trigger }: { table: Table<TData>; trigger?: ReactNode }) {
  const t = useTranslations('Common');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? trigger : (
          <Button variant="outline" size='sm'>
            <Settings2 />
            {t('columns-settings')}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.columnDef.meta?.headerTitle || column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { DataGridColumnVisibility };
