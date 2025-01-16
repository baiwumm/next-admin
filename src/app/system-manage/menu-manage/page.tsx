/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-14 11:17:14
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 16:41:43
 * @Description: 菜单管理
 */
'use client';

import { Icon } from '@iconify/react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import { useRequest, useSetState } from 'ahooks';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { get, pick } from '@/lib/radash';
import { isSuccess } from '@/lib/utils';
import { delMenu, getMenuList } from '@/services/system-manage/menu-manage';

import HeaderSearch from './components/HeaderSearch';
import SaveModal from './components/SaveModal';
import TableTemplate, { type Column } from './components/TableTemplate';

export default function MenuManage() {
  const t = useTranslations('Pages.menu-manage');
  const tGlobal = useTranslations('Global');
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  // 当前菜单 id
  const [menuId, setMenuId] = useState('');
  // 搜索表单
  const [searchParams, setSearchParams] = useSetState<App.SystemManage.MenuSearchParams>({
    name: '', // 用户名
    startTime: undefined, // 开始时间
    endTime: undefined, // 结束时间
  });

  // 新增/编辑表单
  const initFormData: App.SystemManage.MenuSaveParams = {
    parentId: undefined,
    name: '',
    path: '',
    icon: '',
    redirect: undefined,
    sort: 1,
  };
  const [formData, setFormData] = useSetState<App.SystemManage.MenuSaveParams>(initFormData);

  // 退出弹窗回调
  const handleCancel = () => {
    setMenuId('');
    setFormData(initFormData);
    onClose();
  };

  // 获取菜单列表
  const {
    data: menuList = [],
    loading,
    run,
  } = useRequest(async () => get(await getMenuList(searchParams), 'data', []));

  const { loading: delLoading, run: runDel } = useRequest(delMenu, {
    manual: true,
    onSuccess: ({ code, msg }) => {
      setMenuId('');
      if (isSuccess(code)) {
        toast.success(msg);
        run();
      }
    },
  });

  // 编辑回调
  const handleEdit = (row: App.SystemManage.Menu) => {
    setMenuId(row.id);
    setFormData(pick(row, Object.keys(initFormData)) as App.SystemManage.MenuSaveParams);
    onOpen();
  };

  // 删除回调
  const handleDelete = (id: string) => {
    setMenuId(id);
    runDel(id);
  };

  // 列配置项
  const columns: Column[] = [
    { key: 'name', label: t('name') },
    { key: 'path', label: t('path') },
    { key: 'icon', label: t('icon') },
    { key: 'parent', label: tGlobal('parent') },
    { key: 'redirect', label: t('redirect') },
    { key: 'sort', label: tGlobal('sort') },
    { key: 'createdAt', label: tGlobal('createdAt') },
    { key: 'action', label: tGlobal('action') },
  ];
  // 列设置
  const [visibleColumns, setVisibleColumns] = useState(new Set(columns.map((v) => v.key)));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <HeaderSearch
          loading={loading}
          refresh={run}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onOpen={onOpen}
        />
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
      <TableTemplate
        menuList={menuList}
        loading={loading}
        columns={columns}
        visibleColumns={visibleColumns}
        menuId={menuId}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        delLoading={delLoading}
      />
      <SaveModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        refresh={run}
        onClose={onClose}
        menuId={menuId}
        formData={formData}
        setFormData={setFormData}
        handleCancel={handleCancel}
        menuList={menuList}
      />
    </div>
  );
}
