/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-03 15:50:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-21 17:00:43
 * @Description: 菜单管理
 */
'use client';
import {
  useDisclosure
} from "@heroui/react";
import { useRequest } from 'ahooks'
import { filter, get, map } from 'es-toolkit/compat'
import { useTranslations } from 'next-intl';
import { type FC, type FormEvent, useRef, useState } from "react";

import DataTable from './components/DataTable';
import SaveModal from './components/SaveModal';

import { getMenuList } from '@/services/system-settings/menu-manage';

const MenuManage: FC = () => {
  const t = useTranslations('Common');
  const tM = useTranslations('Pages.MenuManage');
  // 搜索表单实例
  const searchRormRef = useRef<HTMLFormElement>(null);
  // 编辑表单实例
  const formRef = useRef<HTMLFormElement>(null);
  // 保存弹窗
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  // 当前数据 id
  const [currentId, setCurrentId] = useState('');
  // 当前行
  const [currentRow, setCurrentRow] = useState<App.SystemSettings.Menu | null>(null);

  // 列配置项
  const columns: App.Common.ColumnOption[] = [
    { name: tM('label'), uid: "label" },
    { name: tM('path'), uid: "path" },
    { name: tM('icon'), uid: "icon" },
    { name: tM('desc'), uid: "desc", show: false },
    { name: tM('redirect'), uid: "redirect" },
    { name: t('sort'), uid: "sort", sortable: true },
    { name: t('created_at'), uid: "created_at", sortable: true },
    { name: t('updated_at'), uid: "updated_at", sortable: true, show: false },
    { name: t('actions'), uid: "actions" },
  ];
  const [visibleColumns, setVisibleColumns] = useState(new Set(map(filter(columns, v => v.show !== false), 'uid')));

  // 请求菜单列表
  const { data: menuList, run: fetchMenuList, loading } = useRequest(async () => {
    let params: Partial<Pick<App.SystemSettings.Menu, 'path'>> = {};
    if (searchRormRef.current) {
      // 获取所有输入字段的值
      const formData = new FormData(searchRormRef.current);
      params = Object.fromEntries(formData.entries());
    }
    const res = await getMenuList(params);
    return get(res, 'data', [])
  })

  // 搜索回调
  const hanldeSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMenuList();
  };

  // 编辑回调
  const handleEdit = (row: App.SystemSettings.Menu) => {
    setCurrentId(row.id);
    setCurrentRow(row);
    onOpen();
  }

  // 退出弹窗回调
  const handleClose = () => {
    setCurrentId('');
    setCurrentRow(null);
    onClose();
    formRef.current?.reset();
  }
  return (
    <>
      {/* 数据表格 */}
      <DataTable
        dataSource={menuList as App.SystemSettings.Menu[]}
        loading={loading}
        columns={columns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        fetchMenuList={fetchMenuList}
        handleEdit={handleEdit}
        searchRormRef={searchRormRef}
        hanldeSearch={hanldeSearch}
        onOpen={onOpen}
      />
      {/* 保存弹窗 */}
      <SaveModal
        open={isOpen}
        onOpenChange={onOpenChange}
        id={currentId}
        fetchMenuList={fetchMenuList}
        formRef={formRef}
        currentRow={currentRow}
        handleClose={handleClose}
        menuList={menuList as App.SystemSettings.Menu[]}
      />
    </>
  );
};

export default MenuManage;


