/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 17:21:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-07 15:19:06
 * @Description: 用户管理
 */
'use client';

import { useRequest, useSetState } from 'ahooks';
import { useEffect, useState } from 'react';

import { get } from '@/lib/radash';
import { getUserList } from '@/services/user-manage';

import TableTemplate from './components/TableTemplate';

export default function UserManage() {
  // 文章条数
  const [total, setTotal] = useState(1);
  // 搜索表单
  const [searchParams, setSearchParams] = useSetState<App.SystemManage.UserSearchParams>({
    current: 1, // 当前页码
    size: 8, // 每页条数
    name: '', // 用户名
    email: '', // 电子邮箱
  });

  // 获取用户列表
  const {
    data: userList = [],
    loading,
    run,
  } = useRequest(async () => {
    const res = get(await getUserList(searchParams), 'data', {});
    setTotal(get(res, 'total', 1));
    return get(res, 'records', []);
  });

  useEffect(() => {
    run();
  }, [searchParams.current, run]);

  return (
    <TableTemplate
      userList={userList}
      loading={loading}
      total={total}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      refresh={run}
    />
  );
}
