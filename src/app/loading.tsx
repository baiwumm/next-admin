/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:31:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-06 10:31:28
 * @Description: 全局 Loading
 */

import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-60">
      <Spinner label="Loading..." color="primary" />
    </div>
  );
}
