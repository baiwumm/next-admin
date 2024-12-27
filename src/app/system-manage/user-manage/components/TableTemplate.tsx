/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 15:10:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-27 17:41:27
 * @Description: 表格列表
 */
'use client';

import {
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import { RiDeleteBinLine, RiEditLine, RiEqualizer2Line, RiMenLine, RiWomenLine } from '@remixicon/react';
import { ceil, map } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { Key, useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Empty } from '@/components/ui/empty';
import { SEX, STATUS } from '@/enums';

import HeaderSearch, { type HeaderSearchProps } from './HeaderSearch';

type TableTemplateProps = {
  userList: App.SystemManage.User[];
  total: number;
  pageSize: number; // 每条页数
  currentPage: number; // 页码
  setCurrentPage: (page: number) => void;
  handleEdit: (row: App.SystemManage.User) => void;
  delLoading: boolean;
  handleDelete: (id: string) => void;
  userId: string;
} & HeaderSearchProps;

export default function TableTemplate({
  userList = [],
  loading = false,
  total = 1,
  pageSize = 5,
  currentPage = 1,
  setCurrentPage,
  handleEdit,
  refresh,
  form,
  onOpen,
  delLoading = false,
  handleDelete,
  userId,
}: TableTemplateProps) {
  const t = useTranslations('Pages.user-manage');
  const tGlobal = useTranslations('Global');
  // 列配置项
  const columns = [
    { key: 'userName', label: t('userName') },
    { key: 'cnName', label: t('cnName') },
    { key: 'sex', label: t('sex') },
    { key: 'phone', label: t('phone') },
    { key: 'status', label: tGlobal('status') },
    { key: 'sort', label: tGlobal('sort') },
    { key: 'action', label: tGlobal('action') },
  ];
  // 列设置
  const [visibleColumns, setVisibleColumns] = useState(new Set(map(columns, 'key')));
  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);

  // 渲染顶部
  const renderTopContent = (
    <div className="flex items-center justify-between">
      <HeaderSearch loading={loading} refresh={refresh} form={form} onOpen={onOpen} />
      <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
          <Button variant="outline" size="sm">
            <RiEqualizer2Line size={18} />
            {tGlobal('column-setting')}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Columns Setting"
          closeOnSelect={false}
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={setVisibleColumns}
        >
          {columns.map((column) => (
            <DropdownItem key={column.key}>{column.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  // 渲染底部
  const renderBottomContent = useMemo(() => {
    return (
      <div className="flex justify-center">
        <Pagination
          loop
          showControls
          size="sm"
          initialPage={currentPage}
          total={ceil(total / pageSize)}
          onChange={setCurrentPage}
        />
      </div>
    );
  }, [currentPage, total, pageSize, setCurrentPage]);
  // 自定义列
  const renderCell = useCallback(
    (user: App.SystemManage.User, columnKey: Key) => {
      const cellValue = getKeyValue(user, columnKey as keyof App.SystemManage.User);

      switch (columnKey) {
        case 'userName':
          return (
            <User
              avatarProps={{ radius: 'full', size: 'sm' }}
              classNames={{
                description: 'text-default-500',
              }}
              description={user.email}
              name={user.userName}
            />
          );
        case 'sex':
          return (
            <Chip className="capitalize" color={user.sex === SEX.MALE ? 'success' : 'danger'} size="sm" variant="flat">
              {user.sex === SEX.MALE ? <RiMenLine size={18} /> : <RiWomenLine size={18} />}
            </Chip>
          );
        case 'status':
          return (
            <Chip
              className="capitalize"
              color={user.status === STATUS.ACTIVE ? 'success' : 'danger'}
              size="sm"
              variant="flat"
            >
              {user.status === STATUS.ACTIVE ? tGlobal('statusActive') : tGlobal('statusInactive')}
            </Chip>
          );
        case 'sort':
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              {cellValue}
            </Chip>
          );
        case 'action':
          return (
            <div className="flex gap-2 items-center justify-center">
              <Button variant="outline" size="icon" onClick={() => handleEdit(user)} className="w-6 h-6">
                <RiEditLine size={14} />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                disabled={delLoading}
                className="w-6 h-6"
                onClick={() => handleDelete(user.id)}
              >
                {delLoading && user.id === userId ? <Spinner size="sm" /> : <RiDeleteBinLine size={14} />}
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleEdit, tGlobal],
  );
  return (
    <Table
      isStriped
      aria-label="User Manage"
      topContent={renderTopContent}
      topContentPlacement="outside"
      bottomContent={renderBottomContent}
      bottomContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {({ key, label, ...column }) => (
          <TableColumn key={key} align="center" {...column}>
            {label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={userList} isLoading={loading} loadingContent={<Spinner />} emptyContent={<Empty />}>
        {(item: App.SystemManage.User) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
