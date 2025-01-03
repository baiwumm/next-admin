/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-06 10:31:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-03 15:03:42
 * @Description: 404页面
 */

import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col w-full gap-6" style={{ height: 'calc(100vh - 8.4rem)' }}>
      <h2 className="font-black text-xl">客官，你走丢了哟！😉</h2>
      <Link href="/dashboard">
        <Button color="primary">返回首页</Button>
      </Link>
    </div>
  );
}
