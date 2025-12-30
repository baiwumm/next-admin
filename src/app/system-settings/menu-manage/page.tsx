/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:10:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 14:09:03
 * @Description: 菜单管理
 */
"use client"
import {
  ColumnDef,
  type ColumnPinningState,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type VisibilityState
} from '@tanstack/react-table';
import { useRequest } from 'ahooks';
import { useTranslations } from 'next-intl';
import { type FC, useMemo, useState } from 'react';

import { createMenuColumns } from './components/columns'
import DeleteAlertDialog from './components/DeleteAlertDialog';
import FormDialog from './components/FormDialog';
import TopContent from './components/TopContent';

import {
  Card,
  CardTable,
  DataGrid,
  DataGridTable,
  ScrollArea,
  ScrollBar
} from '@/components/ui';
import { get } from '@/lib/utils';
import { getMenuList } from '@/services/system-settings/menu-manage';

const MenuManage: FC = () => {
  const t = useTranslations('Pages.MenuManage');
  const tC = useTranslations('Common');
  const tRoute = useTranslations('Route');
  // 受控列
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    updated_at: false
  })
  // 搜索参数
  const [pathValue, setPathValue] = useState('');
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['label'],
    right: ['actions']
  })
  const [dialogOpen, setDialogOpen] = useState(false);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<System.Menu | null>(null);

  /**
   * @description: 请求菜单列表
   */
  const { data = [], loading, run } = useRequest(async (params) => get(await getMenuList(params), 'data', []));

  // 参数查询
  const refresh = () => {
    run({ path: pathValue })
  }

  // 编辑操作
  const handleEdit = (row: System.Menu) => {
    setCurrentRow(row);
    setDialogOpen(true);
  }

  // 删除操作
  const handleDel = (row: System.Menu) => {
    setCurrentRow(row);
    setDelDialogOpen(true);
  }

  // 列配置项
  const columns = useMemo<ColumnDef<System.Menu>[]>(() => createMenuColumns({ t, tRoute, tC, handleEdit, handleDel }),
    [t, tRoute, tC],
  );

  // 表格实例
  const table = useReactTable({
    data,
    columns,
    getRowId: (row: System.Menu) => row.id,
    state: {
      columnVisibility,
      columnPinning
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row: System.Menu) => row.children,
    onColumnPinningChange: setColumnPinning,
  })

  return (
    <>
      <DataGrid
        table={table}
        recordCount={data.length || 0}
        isLoading={loading}
        loadingMode='spinner'
        tableLayout={{
          columnsPinnable: true,
          columnsVisibility: true,
          cellBorder: true,
          headerSticky: true,
          width: 'auto',
        }}
      >
        <Card className="rounded-lg">
          {/* 顶部区域 */}
          <TopContent
            table={table}
            pathValue={pathValue}
            setPathValue={setPathValue}
            loading={loading}
            refresh={refresh}
            setDialogOpen={setDialogOpen}
          />
          {/* 表格区域 */}
          <CardTable>
            <ScrollArea className="max-h-[calc(100vh-320px)]">
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardTable>
        </Card>
      </DataGrid>
      {/* 表单弹窗 */}
      <FormDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        refresh={refresh}
        menuList={data || []}
      />
      {/* 删除确认 */}
      <DeleteAlertDialog
        delDialogOpen={delDialogOpen}
        setDelDialogOpen={setDelDialogOpen}
        currentRow={currentRow}
        setCurrentRow={setCurrentRow}
        refresh={refresh}
      />
    </>
  )
}
export default MenuManage;