/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 17:21:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-27 17:53:47
 * @Description: 用户管理
 */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@nextui-org/react';
import { useRequest } from 'ahooks';
import { forEach, get } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { isSuccess } from '@/lib/utils';
import { addUser, delUser, getUserList, updateUser } from '@/services/system-manage/user-manage';

import { formSchema, searchFormSchema } from './components/formSchema';
import HeaderSearch from './components/HeaderSearch';
import SaveModal from './components/SaveModal';
import TableTemplate from './components/TableTemplate';

export default function UserManage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // 固定几条
  const pageSize = 5;
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);
  // 文章条数
  const [total, setTotal] = useState(1);
  // 当前用户 id
  const [userId, setUserId] = useState('');
  // 搜索表单实例
  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      userName: '',
    },
  });

  // 表单实例
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      cnName: '',
      email: '',
      phone: '',
      sex: 'MALE',
      status: 'ACTIVE',
      sort: 1,
      password: '',
    },
  });

  // 获取用户列表
  const {
    data: userList = [],
    loading,
    run,
  } = useRequest(async () => {
    const params = searchForm.getValues();
    const res = get(
      await getUserList({
        ...params,
        current: currentPage,
        size: pageSize,
      }),
      'data',
      {},
    );
    setTotal(get(res, 'total', 1));
    return get(res, 'records', []);
  });

  // 新增/编辑用户
  const { loading: saveLoading, runAsync: runSave } = useRequest(userId ? updateUser : addUser, {
    manual: true,
  });

  // 删除用户
  const { loading: delLoading, runAsync: runDel } = useRequest(delUser, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      if (isSuccess(code)) {
        toast.success(msg);
        setUserId('');
        run();
      }
    },
  });

  // 编辑回调
  const handleEdit = (row: App.SystemManage.User) => {
    setUserId(row.id);
    forEach(Object.keys(formSchema.shape) as (keyof typeof formSchema.shape)[], (key) => {
      form.setValue(key, row[key]);
    });
    onOpen();
  };

  // 删除回调
  const handleDelete = (id: string) => {
    setUserId(id);
    runDel(id);
  };

  useEffect(() => {
    run();
  }, [currentPage, run]);

  return (
    <div className="flex flex-col gap-4">
      <HeaderSearch loading={loading} refresh={run} form={searchForm} onOpen={onOpen} />
      <TableTemplate
        userList={userList}
        loading={loading}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleEdit={handleEdit}
        refresh={run}
        form={searchForm}
        onOpen={onOpen}
        delLoading={delLoading}
        handleDelete={handleDelete}
        userId={userId}
      />
      <SaveModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        saveLoading={saveLoading}
        runSave={runSave}
        refresh={run}
        onClose={onClose}
        form={form}
        userId={userId}
        setUserId={setUserId}
      />
    </div>
  );
}
