/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-04 11:35:19
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-04 11:37:38
 * @Description: 菜单管理模块
 */
import { httpRequest } from '@/lib/request';

const BASE_URL = '/system-settings/menu-manage';

/**
 * @description: 获取菜单列表
 */
export const getMenuList = (params?: Partial<Pick<System.Menu, 'path'>>) => {
  return httpRequest.get<System.Menu[]>(BASE_URL, params);
};

/**
 * @description: 新增菜单
 */
export const addMenu = (params: System.MenuSaveParams) => {
  return httpRequest.post<System.Menu>(BASE_URL, params);
};

/**
 * @description: 更新菜单
 */
export const updateMenu = ({ id, ...params }: System.MenuSaveParams) => {
  return httpRequest.put<System.Menu>(`${BASE_URL}/${id}`, params);
};

/**
 * @description: 删除菜单
 */
export const delMenu = (id: string) => {
  return httpRequest.delete<System.Menu>(`${BASE_URL}/${id}`);
};