/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 15:10:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-30 15:05:40
 * @Description: 表格列表
 */
'use client';

import {
  Button,
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
import { Key, ReactNode, useCallback, useMemo, useState } from 'react';

import { Empty } from '@/components/ui/empty';
import { SEX, STATUS } from '@/enums';

import HeaderSearch, { type HeaderSearchProps } from './HeaderSearch';

type Column = {
  key: string;
  label: string;
  render?: (row: App.SystemManage.User) => ReactNode;
};

type TableTemplateProps = {
  userList: App.SystemManage.User[];
  total: number;
  handleEdit: (row: App.SystemManage.User) => void;
  delLoading: boolean;
  handleDelete: (id: string) => void;
  userId: string;
} & HeaderSearchProps;

export default function TableTemplate({
  userList = [],
  loading = false,
  searchParams,
  setSearchParams,
  total = 1,
  handleEdit,
  refresh,
  onOpen,
  delLoading = false,
  handleDelete,
  userId,
}: TableTemplateProps) {
  const t = useTranslations('Pages.user-manage');
  const tGlobal = useTranslations('Global');
  // 列配置项
  const columns: Column[] = [
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
      <HeaderSearch
        loading={loading}
        refresh={refresh}
        onOpen={onOpen}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
          <Button variant="ghost" size="sm" className="border">
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

  // 切换分页回调
  const handleChangePage = (page: number) => {
    setSearchParams({ current: page });
    refresh();
  };

  // 渲染底部
  const renderBottomContent = useMemo(() => {
    return (
      <div className="flex justify-center">
        <Pagination
          loop
          showControls
          size="sm"
          initialPage={searchParams.current}
          total={ceil(total / searchParams.size)}
          onChange={handleChangePage}
        />
      </div>
    );
  }, [searchParams, total]);
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
              <Button
                variant="shadow"
                size="sm"
                onPress={() => handleEdit(user)}
                startContent={<RiEditLine size={14} />}
              >
                {tGlobal('edit')}
              </Button>
              <Button
                variant="shadow"
                size="sm"
                color="danger"
                disabled={delLoading}
                onPress={() => handleDelete(user.id)}
                isLoading={delLoading && userId === user.id}
                startContent={<RiDeleteBinLine size={14} />}
              >
                {tGlobal('delete')}
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [delLoading, handleDelete, handleEdit, tGlobal, userId],
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
      <TableBody
        items={userList}
        isLoading={loading || delLoading}
        loadingContent={<Spinner />}
        emptyContent={<Empty />}
      >
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
