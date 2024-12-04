/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-05-28 15:10:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 15:05:12
 * @Description: 全局 Loading
 */
import { Flex, Spin } from 'antd';

export default function Loading() {
  return (
    <Flex align="center" gap="middle">
      <Spin />
    </Flex>
  );
}
