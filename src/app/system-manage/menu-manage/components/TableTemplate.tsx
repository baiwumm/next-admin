/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 15:10:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 17:21:43
 * @Description: 表格列表
 */
'use client';
import { Icon } from '@iconify/react';
import {
  Button,
  Chip,
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { Key, ReactNode, useCallback, useMemo } from 'react';

import { Empty } from '@/components/ui/empty';
import { UNIFORM_TEXT } from '@/enums';

export type Column = {
  key: string;
  label: string;
  render?: (row: App.SystemManage.Menu) => ReactNode;
};

type TableTemplateProps = {
  menuList: App.SystemManage.Menu[];
  loading: boolean;
  columns: Column[];
  visibleColumns: Set<string>;
  menuId: string;
  handleEdit: (row: App.SystemManage.Menu) => void;
  handleDelete: (id: string) => void;
  delLoading: boolean;
};

export default function TableTemplate({
  menuList = [],
  loading = false,
  columns = [],
  visibleColumns,
  menuId,
  handleEdit,
  handleDelete,
  delLoading,
}: TableTemplateProps) {
  const tGlobal = useTranslations('Global');
  const tRoute = useTranslations('Route');

  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);

  // 自定义列
  const renderCell = useCallback(
    (row: App.SystemManage.Menu, columnKey: Key) => {
      const cellValue = getKeyValue(row, columnKey as keyof App.SystemManage.Menu);
      switch (columnKey) {
        case 'name':
          return tRoute(cellValue);
        case 'icon':
          return (
            <div className="mx-auto text-slate-500 w-max text-xl">
              <Icon icon={cellValue} />
            </div>
          );
        case 'parent':
          return row.parent ? tRoute(row.parent.name) : UNIFORM_TEXT.NULL;
        case 'sort':
          return <Chip size="sm">{cellValue}</Chip>;
        case 'redirect':
          return cellValue || UNIFORM_TEXT.NULL;
        case 'createdAt':
          return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
        case 'action':
          return (
            <div className="flex gap-2 items-center justify-center">
              <Button
                variant="shadow"
                size="sm"
                onPress={() => handleEdit(row)}
                startContent={<Icon icon="ri:edit-line" className="text-sm" />}
              >
                {tGlobal('edit')}
              </Button>
              <Button
                variant="shadow"
                size="sm"
                color="danger"
                disabled={delLoading}
                onPress={() => handleDelete(row.id)}
                isLoading={delLoading && menuId === row.id}
                startContent={<Icon icon="ri:delete-bin-line" className="text-sm" />}
              >
                {tGlobal('delete')}
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [tGlobal],
  );
  return (
    <Table isStriped aria-label="User Manage" topContentPlacement="outside">
      <TableHeader columns={headerColumns}>
        {({ key, label, ...column }) => (
          <TableColumn key={key} align="center" {...column}>
            {label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={menuList} isLoading={loading} loadingContent={<Spinner />} emptyContent={<Empty />}>
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
