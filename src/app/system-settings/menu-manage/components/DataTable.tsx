/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-05 09:35:37
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-10 17:23:54
 * @Description: 数据表格
 */
import {
  addToast,
  Button,
  Chip,
  type SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useRequest, useSetState } from "ahooks";
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { type FC, type FormEvent, type Key, type RefObject, useCallback, useMemo, useState } from "react";

import HeaderSearch from './HeaderSearch';

import Empty from '@/components/Empty'
import { UNIFORM_TEXT } from '@/lib/constant';
import { isSuccess } from '@/lib/utils';
import { delMenu } from '@/services/system-settings/menu-manage';

type DataTableProps = {
  dataSource: App.SystemSettings.Menu[];
  loading: boolean;
  columns: App.Common.ColumnOption[];
  visibleColumns: Set<string>;
  setVisibleColumns: (keys: Set<string>) => void;
  fetchMenuList: VoidFunction;
  handleEdit: (row: App.SystemSettings.Menu) => void;
  searchRormRef: RefObject<HTMLFormElement | null>;
  hanldeSearch: (e: FormEvent<HTMLFormElement>) => void;
  onOpen: VoidFunction;
}

const DataTable: FC<DataTableProps> = ({
  dataSource = [],
  loading = false,
  columns = [],
  visibleColumns,
  setVisibleColumns,
  fetchMenuList,
  handleEdit,
  searchRormRef,
  hanldeSearch,
  onOpen
}) => {
  const t = useTranslations('Common');
  const tR = useTranslations('Route');
  // 用 Map 保存每个节点的展开状态
  const [openMap, setOpenMap] = useSetState<Record<string, boolean>>({});
  // 删除数据 id
  const [deletingId, setDeletingId] = useState<string | null>(null)
  // 列排序
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "sort",
    direction: "descending",
  });

  // 删除数据
  const { runAsync: runDelete, loading: delLoading } = useRequest(delMenu, {
    manual: true,
    onSuccess: ({ code }) => {
      if (isSuccess(code)) {
        addToast({
          title: t('delete-success'),
          color: 'success'
        })
        fetchMenuList?.();
      }
    }
  })

  // 删除回调
  const handleDelete = useCallback(async (id: string) => {
    setDeletingId(id)
    try {
      await runDelete(id)
    } finally {
      setDeletingId(null)
    }
  }, [runDelete])

  // 列项折叠展开回调
  const toggleOpen = useCallback((id: string) => {
    setOpenMap(prev => ({ [id]: !prev[id] }));
  }, [setOpenMap]);

  // 可见列
  const headerColumns = useMemo(() => {
    return columns.filter((column) => (visibleColumns as Set<string>).has(column.uid));
  }, [columns, visibleColumns]);

  // 列项排序
  const sortedItems = useMemo(() => {
    return [...dataSource].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof App.SystemSettings.Menu] as string;
      const second = b[sortDescriptor.column as keyof App.SystemSettings.Menu] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, dataSource]);

  // 渲染单元格
  const renderCell = useCallback(
    (item: App.SystemSettings.Menu, columnKey: Key, level = 0, isOpen = false): ReturnType<typeof TableCell> => {
      const cellValue = item[columnKey as keyof App.SystemSettings.Menu];
      switch (columnKey) {
        case 'label':
          return (
            <div className="flex justify-center items-center gap-2 text-primary" style={{ paddingLeft: `${level * 20}px` }}>
              {item?.children?.length > 0 && (
                <Icon
                  icon={isOpen ? 'ri:indeterminate-circle-line' : 'ri:add-circle-line'}
                  onClick={() => toggleOpen(item.id)}
                  className="text-lg cursor-pointer"
                />
              )}
              <span>{tR(item.label)}</span>
            </div>
          );
        case "path":
          return <Chip variant="flat" size='sm'>{item.path}</Chip>;
        case 'icon':
          return <Icon icon={item.icon} className="text-xl text-primary" />;
        case 'redirect':
          return item.redirect ? (
            <Chip variant="flat" size='sm'>{item.redirect}</Chip>
          ) : UNIFORM_TEXT.NULL;
        case 'sort':
          return <Chip color="secondary" size="sm">{item.sort}</Chip>;
        case 'created_at':
          return dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss');
        case 'updated_at':
          return item.updated_at ? dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss') : UNIFORM_TEXT.NULL;
        case 'actions':
          return (
            <div className="flex justify-center items-center">
              <Button
                color="primary"
                variant="light"
                size="sm"
                onPress={() => handleEdit(item)}
                startContent={<Icon icon="ri:edit-line" />}
              >
                {t('edit')}
              </Button>
              <Button
                color="danger"
                variant="light"
                size="sm"
                startContent={<Icon icon="ri:delete-bin-line" />}
                onPress={() => handleDelete(item.id)}
                isLoading={delLoading && deletingId === item.id}
              >
                {t('delete')}
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deletingId, delLoading, t, toggleOpen, handleDelete, handleEdit, tR]
  );

  // 渲染每一行
  const renderTableRows = useCallback(
    (items: App.SystemSettings.Menu[], level = 0): ReturnType<typeof TableBody> => {
      return items.map((item) => {
        const isOpen = openMap[item.id] || false;
        return (
          <>
            <TableRow key={item.id}>
              {headerColumns.map((column) => {
                const columnKey = column.uid;
                return (
                  <TableCell key={columnKey}>
                    {renderCell(item, columnKey, level, isOpen)}
                  </TableCell>
                );
              })}
            </TableRow>
            {isOpen && item.children && item.children.length > 0
              ? renderTableRows(item.children, level + 1)
              : null}
          </>
        );
      });
    },
    [openMap, headerColumns, renderCell]
  );
  return (
    <Table
      aria-label="Menu Manage"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      isStriped
      topContent={(
        <HeaderSearch
          searchRormRef={searchRormRef}
          hanldeSearch={hanldeSearch}
          fetchMenuList={fetchMenuList}
          loading={loading}
          onOpen={onOpen}
          columns={columns}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      )}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align='center'
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={<Empty />} loadingContent={<Spinner />} isLoading={loading}>
        {renderTableRows(sortedItems)}
      </TableBody>
    </Table>
  )
}
export default DataTable;
