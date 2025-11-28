/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:16:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 09:57:29
 * @Description: 首页
 */
import { Button } from '@heroui/react';
import { Button as RsuiteButton } from 'rsuite';

export default function Home() {
  return (
    <>
      <Button variant="danger-soft">Click me</Button>
      <RsuiteButton>Default</RsuiteButton>
    </>
  );
}
