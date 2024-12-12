/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 10:47:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-12 14:25:50
 * @Description: 国际化
 */
'use client';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { FilePenLine, SquareMinus, SquarePlus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import ColumnSorting from '@/components/DataTable/ColumnSorting';
import { Button } from '@/components/ui/button';
import { RESPONSE_CODE, UNIFORM_TEXT } from '@/enums';

import DataTable from './components/DataTable';
export default function Internationalization() {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');
  const [dataSource, setDataSource] = useState<App.SystemManage.Internalization[]>([]);
  // 搜索 loading
  const [loading, setLoading] = useState(false);

  // 获取列表数据
  const getData = async (params = {}) => {
    setLoading(true);
    const query = new URLSearchParams(params);
    const response = await fetch(`/api/system-manage/internationalization?${query}`);
    if (response.status === RESPONSE_CODE.SUCCESS) {
      const { code, data = [] }: App.Common.IResponse = await response.json();
      if (code === RESPONSE_CODE.SUCCESS) {
        setDataSource(data);
      }
    }
    setLoading(false);
  };
  const columns: ColumnDef<App.SystemManage.Internalization>[] = [
    {
      accessorKey: 'name',
      header: t('internationalization.name'),
      cell: ({ row }) => {
        const depth = row.subRows?.[0]?.depth - 1 || 0;
        return row.getCanExpand() ? (
          <div className={`flex justify-center gap-2 items-center ml-${depth}`}>
            {row.getIsExpanded() ? (
              <SquareMinus size={18} onClick={row.getToggleExpandedHandler()} className="cursor-pointer" />
            ) : (
              <SquarePlus size={18} onClick={row.getToggleExpandedHandler()} className="cursor-pointer" />
            )}
            {row.getValue('name')}
          </div>
        ) : (
          row.getValue('name')
        );
      },
    },
    {
      accessorKey: 'zh',
      header: t('internationalization.zh'),
      cell: ({ row }) => row.getValue('zh') || UNIFORM_TEXT.NULL,
    },
    {
      accessorKey: 'en',
      header: t('internationalization.en'),
      cell: ({ row }) => row.getValue('en') || UNIFORM_TEXT.NULL,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <ColumnSorting column={column} title={tGlobal('createdAt')} />,
      cell: ({ row }) => dayjs(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      accessorKey: 'operation',
      header: tGlobal('operation'),
      cell: ({ row }) => (
        <>
          <Button variant="ghost" size="icon">
            <FilePenLine />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return <DataTable columns={columns} data={dataSource} loading={loading} refresh={getData} />;
}
