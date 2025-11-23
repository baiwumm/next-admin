/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-04 10:10:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-23 11:08:34
 * @Description: 用户列表
 */
'use client';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Snippet,
  type SortDescriptor,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs'
import { filter, get, map } from 'es-toolkit/compat';
import { useTranslations } from 'next-intl';
import { type FC, type Key, useCallback, useEffect, useMemo, useState } from 'react';

import Empty from '@/components/Empty';
import PageContainer from '@/components/PageContainer';
import { UNIFORM_TEXT } from '@/lib/constant'
import { getUserList } from '@/services/system-settings/user-manage';

const UserManage: FC = () => {
  const t = useTranslations('Common');
  const tH = useTranslations('Components.Header');
  const tU = useTranslations('Pages.UserManage');
  // 分页参数
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /**
   * @description: 请求登录用户列表
   */
  const { data, loading, run } = useRequest(async (params) => get(await getUserList(params), 'data'), {
    defaultParams: [{ page, perPage: pageSize }]
  });

  const total = useMemo(() => {
    return data?.total ? Math.ceil(data.total / pageSize) : 1;
  }, [data?.total, pageSize]);

  // 列排序
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "created_at",
    direction: "descending",
  });

  // 列配置项
  const columns: App.Common.ColumnOption[] = useMemo(() => {
    return [
      {
        uid: "index",
        name: t('index'),
      },
      {
        uid: "userInfo",
        name: tU("userInfo"),
      },
      {
        uid: "email",
        name: tU("email"),
      },
      {
        uid: "provider",
        name: tU("provider"),
      },
      {
        uid: "last_sign_in_at",
        name: tU("last_sign_in_at"),
        sortable: true
      },
      {
        uid: "created_at",
        name: tU("created_at"),
        sortable: true
      },
      {
        uid: "email_confirmed_at",
        name: tU("email_confirmed_at"),
        show: false
      }
    ];
  }, [t, tU])
  const [visibleColumns, setVisibleColumns] = useState(new Set(map(filter(columns, v => v.show !== false), 'uid')));

  // 可见列
  const headerColumns = useMemo(() => {
    return columns.filter((column) => (visibleColumns as Set<string>).has(column.uid));
  }, [columns, visibleColumns]);

  // 列项排序
  const sortedItems = useMemo(() => {
    return [...(data?.records || []) as App.SystemSettings.User[]].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof App.SystemSettings.User] as string;
      const second = b[sortDescriptor.column as keyof App.SystemSettings.User] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, data]);

  // 渲染单元格
  const renderCell = useCallback((user: App.SystemSettings.User, columnKey: Key) => {
    const cellValue = user[columnKey as keyof App.SystemSettings.User & 'index'];
    switch (columnKey) {
      case "index":
        return (
          <Chip variant="flat" size='sm'>{cellValue}</Chip>
        );
      case "userInfo":
        const name = (user?.user_metadata.name || user?.user_metadata.user_name || tH('anonymous-user')) as string;
        return (
          <User
            name={name}
            description={user?.email}
            avatarProps={{
              showFallback: true,
              name,
              src: user?.user_metadata.avatar_url as string,
              color: 'primary'
            }}
          />
        )
      case "email":
        return (
          <Snippet
            size="sm"
            symbol={<Icon icon="ri:mail-line" className="mr-2 text-base align-middle" />}
            variant="flat"
            tooltipProps={{
              content: t('copy'),
              showArrow: true
            }}
          >
            {cellValue}
          </Snippet>
        )
      case "provider": {
        const provider = user?.app_metadata.provider as string;
        const iconMap: Record<string, string> = {
          github: "devicon:github",
          google: "material-icon-theme:google",
          email: "token-branded:mbx"
        }
        return (
          <Chip startContent={<Icon icon={iconMap[provider]} className="text-lg" />} variant="light">
            {provider}
          </Chip>
        )
      }
      case 'created_at':
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
      case 'last_sign_in_at':
        return cellValue ? dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss') : UNIFORM_TEXT.NULL;
      case 'email_confirmed_at':
        return cellValue ? dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss') : tU("waiting");
      default:
        return cellValue;
    }
  }, [tH, t, tU]);

  // 渲染表格顶部
  const topContent = useMemo(() => (
    <div className="flex justify-between items-center">
      <span className="text-default-400 text-small">{t("total", { total: data?.total || 0 })}</span>
      <div className="flex items-center gap-2">
        {/* 分页条数 */}
        <Dropdown>
          <DropdownTrigger>
            <Button endContent={<Icon icon='ri:arrow-down-s-line' className="text-small" />} variant="flat" size='sm'>
              {t("pageSize", { pageSize })}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Pagination PageSize"
            closeOnSelect={false}
            selectionMode="single"
            selectedKeys={new Set([pageSize.toString()])}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setPageSize(Number(selected));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map(pageSize => (
              <DropdownItem key={pageSize.toString()} className="capitalize">
                {t("pageSize", { pageSize })}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {/* 列设置 */}
        <Dropdown>
          <DropdownTrigger>
            <Button endContent={<Icon icon='ri:arrow-down-s-line' className="text-small" />} variant="flat" size='sm'>
              {t('columns-settings')}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Columns Settings"
            closeOnSelect={false}
            selectedKeys={visibleColumns}
            selectionMode="multiple"
            onSelectionChange={(keys) => setVisibleColumns(keys as Set<string>)}
          >
            {columns.map((column) => (
              <DropdownItem key={column.uid} className="capitalize">
                {column.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  ), [columns, data?.total, t, visibleColumns, pageSize])

  // 渲染表格底部
  const bottomContent = useMemo(() => (
    <div className="flex w-full justify-center">
      <Pagination
        showControls
        showShadow
        color="primary"
        page={page}
        total={total}
        size='sm'
        onChange={(page) => setPage(page)}
      />
    </div>
  ), [page, total])

  // 监听分页回调
  useEffect(() => {
    run({ page, perPage: pageSize })
  }, [page, run, pageSize])
  return (
    <PageContainer>
      <Table
        aria-label="User Manage"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        isStriped
        topContent={topContent}
        topContentPlacement="outside"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align='start'
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={map(sortedItems || [], (v, i) => ({ ...v, index: i + 1 }))}
          emptyContent={<Empty />}
          loadingContent={<Spinner />}
          isLoading={loading}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </PageContainer>
  )
}
export default UserManage;