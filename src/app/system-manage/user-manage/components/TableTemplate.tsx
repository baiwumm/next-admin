/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 15:10:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-13 14:51:28
 * @Description: 表格列表
 */
'use client';
import { Icon } from '@iconify/react';
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
} from '@heroui/react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { Key, ReactNode, useCallback, useMemo, useState } from 'react';

import { Empty } from '@/components/ui/empty';

import HeaderSearch, { type HeaderSearchProps } from './HeaderSearch';

type Column = {
  key: string;
  label: string;
  render?: (row: App.SystemManage.User) => ReactNode;
};

type TableTemplateProps = {
  userList: App.SystemManage.User[];
  total: number;
} & HeaderSearchProps;

export default function TableTemplate({
  userList = [],
  loading = false,
  searchParams,
  setSearchParams,
  total = 1,
  refresh,
}: TableTemplateProps) {
  const t = useTranslations('Pages.user-manage');
  const tGlobal = useTranslations('Global');
  // 列配置项
  const columns: Column[] = [
    { key: 'userName', label: t('title') },
    { key: 'provider', label: t('provider') },
    { key: 'createdAt', label: tGlobal('createdAt') },
  ];
  // 列设置
  const [visibleColumns, setVisibleColumns] = useState(new Set(columns.map((v) => v.key)));
  const headerColumns = useMemo(() => {
    return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
  }, [visibleColumns]);

  // 渲染顶部
  const renderTopContent = (
    <div className="flex items-center justify-between">
      <HeaderSearch loading={loading} refresh={refresh} searchParams={searchParams} setSearchParams={setSearchParams} />
      <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
          <Button variant="ghost" size="sm" className="border">
            <Icon icon="ri:equalizer-2-line" className="text-lg" />
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
          total={Math.ceil(total / searchParams.size)}
          onChange={handleChangePage}
        />
      </div>
    );
  }, [searchParams, total]);
  // 自定义列
  const renderCell = useCallback(
    (user: App.SystemManage.User, columnKey: Key) => {
      const cellValue = getKeyValue(user, columnKey as keyof App.SystemManage.User);

      const providerIcon: Record<string, ReactNode> = {
        github: <Icon icon="ri:github-fill" className="text-lg" />,
        gitee: <Icon icon="simple-icons:gitee" className="text-lg" />,
        google: <Icon icon="ri:google-fill" className="text-lg" />,
      };
      const firstAccount = user?.accounts?.[0];
      switch (columnKey) {
        case 'userName':
          return (
            <User
              avatarProps={{ radius: 'full', size: 'sm', src: user.image || undefined }}
              classNames={{
                description: 'text-default-500',
              }}
              description={user.email}
              name={user.name}
            />
          );
        case 'provider':
          return (
            <Chip startContent={providerIcon[firstAccount?.provider]} variant="flat">
              {firstAccount?.provider}
            </Chip>
          );
        case 'createdAt':
          return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
        default:
          return cellValue;
      }
    },
    [tGlobal],
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
        {(item) => (
          <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
