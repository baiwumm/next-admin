/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-12 13:42:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-12 14:38:24
 * @Description: 列配置项
 */

import { ColumnDef, Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Check, ChevronDown, ChevronRight, SquarePen, Trash2, X } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { type Messages } from 'next-intl';

import { Badge, Button, DataGridColumnHeader, Switch } from '@/components/ui';

// 定义依赖项的类型
type ColumnsProps = {
  t: (key: keyof Messages['Pages']['MenuManage']) => string;
  tRoute: (key: keyof Messages['Route']) => string;
  tC: (key: keyof Messages['Common']) => string;
}

export const createMenuColumns = ({ t, tRoute, tC }: ColumnsProps): ColumnDef<System.Menu>[] => {

  // 核心逻辑：定义缩进占位符
  const IndentPlaceholder = ({ row }: { row: Row<System.Menu> }) => {
    // 根据深度设置左边距
    const indentStyle = { paddingLeft: `${row.depth * 8}px` };
    const canExpand = row.getCanExpand();
    const Icon = row.getIsExpanded() ? ChevronDown : ChevronRight;

    return (
      <div style={indentStyle} className="flex items-center">
        {canExpand ? (
          <div onClick={row.getToggleExpandedHandler()} className="cursor-pointer text-muted-foreground me-1 shrink-0">
            <Icon size={20} />
          </div>
        ) : (
          // 确保不可展开的行也有相同的占位空间
          <div className="size-5 me-1 shrink-0" />
        )}
      </div>
    );
  };

  return [
    {
      accessorKey: "label",
      header: ({ column }) => (
        <div className="flex justify-center items-center">
          <DataGridColumnHeader title={t("label")} column={column} />
        </div>
      ),
      cell: ({ row }) => {
        const label = row.getValue("label") as keyof Messages['Route'];

        return (
          <div className="flex items-center">
            {/* 1. 渲染展开/折叠按钮和缩进 */}
            <IndentPlaceholder row={row} />

            {/* 2. 渲染内容 */}
            <Badge variant="secondary" shape="circle" size="lg">
              {tRoute(label)}
            </Badge>
          </div>
        )
      },
      meta: {
        headerClassName: 'text-center min-w-30',
        cellClassName: 'text-left', // 更改为 left 以适应树形结构
        headerTitle: t("label")
      },
      enablePinning: true,
      enableSorting: false,
    },
    {
      accessorKey: "icon",
      header: t("icon"),
      cell: ({ row }) => (
        <Button variant="dim" size="lg" mode="icon">
          <DynamicIcon name={row.getValue("icon")} size={20} />
        </Button>
      ),
      meta: {
        headerClassName: 'text-center min-w-30',
        cellClassName: 'text-center',
        headerTitle: t("icon")
      },
    },
    {
      accessorKey: "path",
      header: t("path"),
      cell: ({ row }) => (
        <Button variant="dim" size="sm">
          {row.getValue("path")}
        </Button>
      ),
      meta: {
        headerClassName: 'text-center',
        cellClassName: 'text-center',
        headerTitle: t("path")
      },
    },
    {
      accessorKey: "hide_in_menu",
      header: t("hide_in_menu"),
      cell: ({ row }) => {
        const hide_in_menu = row.getValue("hide_in_menu") as System.Menu['hide_in_menu'];
        return (
          <div className="flex justify-center items-center">
            <Switch
              thumbIcon={hide_in_menu ? <Check className="text-black" /> : <X className="text-black" />}
              checked={hide_in_menu}
              disabled
            />
          </div>
        )
      },
      meta: {
        headerClassName: 'text-center min-w-30',
        headerTitle: t("hide_in_menu")
      },
    },
    {
      accessorKey: "redirect",
      header: t("redirect"),
      cell: ({ row }) => {
        const redirect = row.getValue("redirect") as System.Menu['redirect'];
        return redirect ? (
          <Button variant="dim" size="sm">
            {row.getValue("redirect")}
          </Button>
        ) : '--'
      },
      meta: {
        headerClassName: 'text-center',
        cellClassName: 'text-center',
        headerTitle: t("redirect")
      },
    },
    {
      accessorKey: "sort",
      header: tC('sort'),
      cell: ({ row }) => <Badge shape="circle">{row.getValue("sort")}</Badge>,
      meta: {
        headerClassName: 'text-center min-w-20',
        cellClassName: 'text-center',
        headerTitle: tC('sort')
      },
    },
    {
      accessorKey: "created_at",
      header: tC('created_at'),
      cell: ({ row }) => dayjs(row.getValue("created_at")).format('YYYY-MM-DD HH:mm'),
      meta: {
        headerClassName: 'text-center min-w-50',
        cellClassName: 'text-center',
        headerTitle: tC("created_at")
      },
    },
    {
      accessorKey: "updated_at",
      header: tC('updated_at'),
      cell: ({ row }) => {
        const updated_at = row.getValue("updated_at") as string;
        return updated_at ? dayjs(row.getValue("updated_at")).format('YYYY-MM-DD HH:mm') : '--'
      },
      meta: {
        headerClassName: 'text-center min-w-50',
        cellClassName: 'text-center',
        headerTitle: tC("updated_at")
      },
    },
    {
      accessorKey: "actions",
      header: ({ column }) => (
        <div className="flex justify-center items-center">
          <DataGridColumnHeader title={tC("actions")} column={column} />
        </div>
      ),
      cell: ({ row }) => (
        <div className='flex justify-center items-center gap-1'>
          <Button size='xs' variant="primary" appearance="ghost">
            <SquarePen />
            {tC('edit')}
          </Button>
          <Button size='xs' variant="destructive" appearance="ghost">
            <Trash2 />
            {tC('delete')}
          </Button>
        </div>
      ),
      meta: {
        headerClassName: 'text-center min-w-30',
        cellClassName: 'text-center',
        headerTitle: tC('actions')
      },
      enablePinning: true,
      enableSorting: false,
    },
  ];
};