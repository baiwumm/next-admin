/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 11:30:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-10 11:30:37
 * @Description: 路由过渡动画
 */
import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-60">
      <Spinner label="Loading..." color="primary" />
    </div>
  );
}