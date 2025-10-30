/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 11:30:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-30 13:49:46
 * @Description: 路由加载 Loading
 */
import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-60">
      <Spinner label="页面正在加载中..." color="primary" />
    </div>
  );
}