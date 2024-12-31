/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-31 14:23:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-31 14:23:16
 * @Description: 文件上传
 */
import { httpRequest } from '@/lib/request';

/**
 * @description: 文件上传
 */
export const uploadFile = (params: FormData) => {
  return httpRequest.post('/upload', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
