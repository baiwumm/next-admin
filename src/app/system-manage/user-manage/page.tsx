/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 17:21:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-31 15:22:14
 * @Description: 用户管理
 */
'use client';

import { useDisclosure } from '@nextui-org/react';
import { useRequest, useSetState } from 'ahooks';
import { get, keys, pick } from 'lodash-es';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { isSuccess } from '@/lib/utils';
import { delUser, getUserList } from '@/services/system-manage/user-manage';

import SaveModal from './components/SaveModal';
import TableTemplate from './components/TableTemplate';

export default function UserManage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // 文章条数
  const [total, setTotal] = useState(1);
  // 当前用户 id
  const [userId, setUserId] = useState('');
  // 搜索表单
  const [searchParams, setSearchParams] = useSetState<App.SystemManage.UserSearchParams>({
    current: 1, // 当前页码
    size: 8, // 每页条数
    userName: '', // 用户名
    phone: '', // 手机号码
  });
  // 用户头像
  const [avatar, setAvatar] = useState<string | undefined>();

  // 新增/编辑表单
  const initFormData: App.SystemManage.UserSaveParams = {
    userName: '',
    cnName: '',
    email: '',
    phone: '',
    sex: 'MALE',
    status: 'ACTIVE',
    sort: 1,
    password: '',
  };
  const [formData, setFormData] = useSetState<App.SystemManage.UserSaveParams>(initFormData);

  // 退出弹窗回调
  const handleCancel = () => {
    setUserId('');
    setAvatar(undefined);
    setFormData(initFormData);
    onClose();
  };

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

  // 删除用户
  const { loading: delLoading, run: runDel } = useRequest(delUser, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      setUserId('');
      if (isSuccess(code)) {
        toast.success(msg);
        run();
      }
    },
  });

  // 编辑回调
  const handleEdit = (row: App.SystemManage.User) => {
    setUserId(row.id);
    setFormData(pick(row, keys(initFormData)) as App.SystemManage.UserSaveParams);
    if (row.avatar) {
      setAvatar(row.avatar);
    }
    onOpen();
  };

  // 删除回调
  const handleDelete = (id: string) => {
    setUserId(id);
    runDel(id);
  };

  useEffect(() => {
    run();
  }, [searchParams.current, run]);

  return (
    <div className="flex flex-col gap-4">
      <TableTemplate
        userList={userList}
        loading={loading}
        total={total}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleEdit={handleEdit}
        refresh={run}
        onOpen={onOpen}
        delLoading={delLoading}
        handleDelete={handleDelete}
        userId={userId}
      />
      <SaveModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        refresh={run}
        onClose={onClose}
        userId={userId}
        formData={formData}
        setFormData={setFormData}
        handleCancel={handleCancel}
        avatar={avatar}
        setAvatar={setAvatar}
      />
    </div>
  );
}
