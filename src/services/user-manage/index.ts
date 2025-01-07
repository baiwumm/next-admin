/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-26 10:22:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-26 10:30:16
 * @Description: 用户管理
 */
import { httpRequest } from '@/lib/request';

/**
 * @description: 获取用户列表
 */
export const getUserList = (params?: App.SystemManage.UserSearchParams) => {
  return httpRequest.get<App.SystemManage.User[]>('/user-manage', params);
};
