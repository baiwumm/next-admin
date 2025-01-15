/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-14 11:06:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-14 11:13:27
 * @Description: 菜单管理
 */
import { httpRequest } from '@/lib/request';

const BASE_URL = '/system-manage/menu-manage';

/**
 * @description: 获取菜单列表
 */
export const getMenuList = (params?: App.SystemManage.MenuSearchParams) => {
  return httpRequest.get<App.SystemManage.Menu[]>(BASE_URL, params);
};

/**
 * @description: 新增菜单
 */
export const addMenu = (params: App.SystemManage.MenuSaveParams) => {
  return httpRequest.post<App.SystemManage.Menu>(BASE_URL, params);
};

/**
 * @description: 更新菜单
 */
export const updateMenu = ({ id, ...params }: App.SystemManage.MenuSaveParams) => {
  return httpRequest.put<App.SystemManage.Menu>(`${BASE_URL}/${id}`, params);
};

/**
 * @description: 删除菜单
 */
export const delMenu = (id: string) => {
  return httpRequest.delete<App.SystemManage.Menu>(`${BASE_URL}/${id}`);
};
