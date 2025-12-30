/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-04 11:28:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 14:08:20
 * @Description: 用户管理
 */
"use client"
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  type VisibilityState
} from '@tanstack/react-table';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs'
import { Mail, RotateCcw, User } from "lucide-react";
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useMemo, useState } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarIndicator,
  AvatarStatus,
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
  CardToolbar,
  CopyButton,
  DataGrid,
  DataGridColumnHeader,
  DataGridColumnVisibility,
  DataGridPagination,
  DataGridTable,
  ScrollArea,
  ScrollBar,
  Skeleton
} from '@/components/ui';
import { OAUTH_PROVIDERS } from '@/enums'
import { GithubIcon, GoogleIcon } from '@/lib/icons';
import { cn, get } from '@/lib/utils';
import { getUserList } from '@/services/system-settings/user-manage';

const UserManage: FC = () => {
  const t = useTranslations('Pages.UserManage');
  const tC = useTranslations('Common');
  const tLayout = useTranslations('Components.Layout');
  const tRoute = useTranslations('Route');
  // 分页参数
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  // 排序
  const [sorting, setSorting] = useState<SortingState>([]);
  // 受控列
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    email_confirmed_at: false
  })

  /**
   * @description: 请求登录用户列表
   */
  const { data, loading, run } = useRequest(async (params) => get(await getUserList(params), 'data'), {
    manual: true
  });

  // 刷新页面，不重置分页
  const refresh = () => run({ page: pagination.pageIndex, perPage: pagination.pageSize });

  // 列配置项
  const columns = useMemo<ColumnDef<System.User>[]>(() => [
    {
      accessorKey: "index",
      header: tC('index'),
      cell: ({ row }) => <Badge shape="circle">{pagination.pageIndex * pagination.pageSize + row.index + 1}</Badge>,
      meta: {
        headerClassName: 'text-center min-w-20',
        cellClassName: 'text-center',
        headerTitle: tC('index'),
        skeleton: (
          <div className="flex justify-center items-center">
            <Skeleton className="size-6.5 rounded-full" />
          </div>
        ),
      },
    },
    {
      accessorKey: "user-info",
      header: t("user-info"),
      cell: ({ row }) => {
        const user = row.original;
        const name = (user.user_metadata.name || user?.user_metadata.user_name || tLayout('anonymous-user')) as string;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={user?.user_metadata.avatar_url as string} alt={name} />
              <AvatarFallback className="text-primary/65 bg-primary/10">
                <User size={20} />
              </AvatarFallback>
              <AvatarIndicator className="-end-2 -bottom-2">
                <AvatarStatus variant='online' className="size-2.5" />
              </AvatarIndicator>
            </Avatar>
            <Badge variant="secondary">{name}</Badge>
          </div>
        );
      },
      meta: {
        headerClassName: 'text-center',
        headerTitle: t("user-info"),
        skeleton: (
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
        ),
      },
    },
    {
      accessorKey: "email",
      header: t("email"),
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <Badge variant="outline" shape="circle" size="lg">
            {email}
            <CopyButton content={email} size='xs' variant="dim" />
          </Badge>
        )
      },
      meta: {
        headerClassName: 'text-center',
        cellClassName: 'text-center',
        headerTitle: t("email"),
        skeleton: (
          <div className="flex justify-center items-center">
            <Skeleton className="w-28 h-6" />
          </div>
        ),
      },
    },
    {
      accessorKey: "provider",
      header: t("provider"),
      cell: ({ row }) => {
        const provider = row?.original.app_metadata.provider as string;
        return (
          <Badge appearance="ghost">
            {provider === OAUTH_PROVIDERS.GITHUB && (
              <GithubIcon />
            )}
            {provider === OAUTH_PROVIDERS.GOOGLE && (
              <GoogleIcon />
            )}
            {provider === 'email' && (
              <Mail />
            )}
            {provider}
          </Badge>
        )
      },
      meta: {
        headerClassName: 'text-center min-w-30',
        cellClassName: 'text-center',
        headerTitle: t("provider"),
        skeleton: (
          <div className="flex justify-center items-center">
            <Skeleton className="w-28 h-6" />
          </div>
        ),
      },
    },
    {
      accessorKey: "last_sign_in_at",
      header: ({ column }) => (
        <div className="flex justify-center items-center">
          <DataGridColumnHeader title={t("last_sign_in_at")} column={column} />
        </div>
      ),
      cell: ({ row }) => {
        const value = row.getValue("last_sign_in_at") as string;
        return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '--'
      },
      meta: {
        headerClassName: 'min-w-50',
        cellClassName: 'text-center',
        headerTitle: t("last_sign_in_at"),
        skeleton: (
          <div className="flex justify-center items-center">
            <Skeleton className="w-28 h-6" />
          </div>
        ),
      },
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <div className="flex justify-center items-center">
          <DataGridColumnHeader title={t("created_at")} column={column} />
        </div>
      ),
      cell: ({ row }) => dayjs(row.getValue("created_at")).format('YYYY-MM-DD HH:mm'),
      meta: {
        headerClassName: 'min-w-50',
        cellClassName: 'text-center',
        headerTitle: t("created_at"),
        skeleton: (
          <div className="flex justify-center items-center">
            <Skeleton className="w-28 h-6" />
          </div>
        ),
      },
    },
    {
      accessorKey: "email_confirmed_at",
      header: ({ column }) => <DataGridColumnHeader title={t("email_confirmed_at")} column={column} />,
      cell: ({ row }) => {
        const value = row.getValue("email_confirmed_at") as string;
        return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : t("waiting")
      },
      meta: {
        headerClassName: 'flex justify-center min-w-50',
        cellClassName: 'text-center',
        headerTitle: t("email_confirmed_at"),
        skeleton: (
          <div className="flex justify-center items-center">
            <Skeleton className="w-28 h-6" />
          </div>
        ),
      },
    }
  ],
    [t, tC, tLayout, pagination],
  );

  const total = useMemo(() => get(data, 'total', 0), [data]);
  const records = useMemo(() => get(data, 'records', []), [data]);
  // 表格实例
  const table = useReactTable({
    data: records,
    columns,
    pageCount: Math.ceil((total || 0) / pagination.pageSize),
    getRowId: (row: System.User) => row.id,
    state: {
      pagination,
      sorting,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  })

  // 2. 当 pagination 变化时，手动调用接口
  useEffect(() => {
    run({
      page: pagination.pageIndex + 1,     // 接口通常从 1 开始，所以 +1
      perPage: pagination.pageSize,
    });
  }, [pagination, run]);
  return (
    <DataGrid
      table={table}
      recordCount={total}
      isLoading={loading}
      tableLayout={{
        rowsDraggable: true,
        columnsVisibility: true,
        cellBorder: true,
        headerSticky: true,
        width: 'auto',
      }}
    >
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>{tRoute('user-manage')}</CardTitle>
          <CardToolbar>
            <Button onClick={refresh} size='sm'>
              <RotateCcw className={cn(loading ? 'animate-spin' : '')} />
              {tC('refresh')}
            </Button>
            <DataGridColumnVisibility table={table} />
          </CardToolbar>
        </CardHeader>
        <CardTable>
          <ScrollArea className="max-h-[calc(100vh-340px)]">
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
export default UserManage;