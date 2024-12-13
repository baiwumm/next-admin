/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 10:47:16
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-13 18:01:18
 * @Description: 国际化
 */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnDef } from '@tanstack/react-table';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { forEach, get } from 'lodash-es';
import { Loader2, SquareMinus, SquarePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import ColumnSorting from '@/components/DataTable/ColumnSorting';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UNIFORM_TEXT } from '@/enums';
import {
  addInternalization,
  delInternalization,
  getInternalizationList,
  updateInternalization,
} from '@/services/system-manage/internationalization';
import { isSuccess } from '@/utils';

import ColumnOperation from './components/CloumnOperation';
import DataTable from './components/DataTable';
import { formSchema, searchFormSchema } from './components/formSchema';
import SaveDialog from './components/SaveDialog';
export default function Internationalization() {
  const t = useTranslations('Pages');
  const tGlobal = useTranslations('Global');
  // 显示弹窗
  const [open, setOpen] = useState(false);
  // 编辑时的 id
  const [id, setId] = useState('');

  // 搜索表单实例
  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      name: '',
      zh: '',
    },
  });

  // 表单实例
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      zh: '',
      en: '',
    },
  });

  // 获取列表数据
  const {
    data: dataSource = [],
    loading,
    run,
  } = useRequest(async () => {
    const params = searchForm.getValues();
    return get(await getInternalizationList(params), 'data', []);
  });

  // 退出弹窗
  const handleCancel = () => {
    setId('');
    form.reset();
    setOpen(false);
  };

  // 新增/编辑国际化
  const { loading: saveLoading, run: runSave } = useRequest(id ? updateInternalization : addInternalization, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      if (isSuccess(code)) {
        toast.success(msg);
        handleCancel();
        run();
      }
    },
  });

  // 删除国际化
  const { loading: delLoading, run: runDel } = useRequest(delInternalization, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      setId('');
      if (isSuccess(code)) {
        toast.success(msg);
        run();
      }
    },
  });

  // 编辑回调
  const handleEdit = (row: App.SystemManage.Internalization) => {
    setId(row.id);
    forEach(['name', 'zh', 'en'], (key: keyof z.infer<typeof formSchema>) => {
      form.setValue(key, row[key] || '');
    });
    setOpen(true);
  };

  // 删除回调
  const handleDelete = (id: string) => {
    setId(id);
    runDel(id);
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
      cell: ({ row }) =>
        row.getValue('zh') ? <Badge variant="secondary">{row.getValue('zh')}</Badge> : UNIFORM_TEXT.NULL,
    },
    {
      accessorKey: 'en',
      header: t('internationalization.en'),
      cell: ({ row }) =>
        row.getValue('zh') ? <Badge variant="secondary">{row.getValue('en')}</Badge> : UNIFORM_TEXT.NULL,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <ColumnSorting column={column} title={tGlobal('createdAt')} />,
      size: 100,
      cell: ({ row }) => dayjs(row.getValue('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      accessorKey: 'operation',
      header: tGlobal('operation'),
      size: 50,
      cell: ({ row }) =>
        delLoading && id === row.original.id ? (
          <Button variant="ghost" disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <ColumnOperation row={row.original} handleEdit={handleEdit} handleDelete={handleDelete} />
        ),
    },
  ];

  // 表单提交
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    runSave({ id: id || undefined, ...values });
  };
  return (
    <>
      <DataTable
        columns={columns}
        data={dataSource}
        loading={loading}
        refresh={run}
        setOpen={setOpen}
        form={searchForm}
      />
      <SaveDialog
        open={open}
        form={form}
        onSubmit={onSubmit}
        id={id}
        loading={saveLoading}
        handleCancel={handleCancel}
      />
    </>
  );
}
