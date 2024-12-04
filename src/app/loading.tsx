/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-05-28 15:10:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:29:54
 * @Description: 全局 Loading
 */
import { Flex, Spin } from 'antd';

export default function Loading() {
  return (
    <Flex align="center" gap="middle" justify="center" style={{ height: '100%' }}>
      <Spin />
    </Flex>
  );
}
