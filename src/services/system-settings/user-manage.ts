/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-12 10:16:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-12 10:20:16
 * @Description: 用户管理模块
 */
import { httpRequest } from '@/lib/request';

const BASE_URL = '/system-settings/user-manage';

/**
 * @description: 获取登录用户列表
 */
export const getUserList = (params: App.SystemSettings.SearchUserParams) => {
  return httpRequest.get<App.Common.PaginatingQueryRecord<App.SystemSettings.User>>(BASE_URL, params);
};