/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 17:22:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-18 17:25:19
 * @Description: 权限模块
 */
import { httpRequest } from '@/utils/request';

/**
 * @description: 获取掘金文章列表
 */
export const getJuejinArticle = (params: App.Auth.JuejinParams) => {
  return httpRequest.post<App.Common.PaginatingQueryRecord>('/auth/juejin', params);
};
