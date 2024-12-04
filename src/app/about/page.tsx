/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:30:47
 * @Description: 关于
 */
'use client';

import { Flex, Typography } from 'antd';

const { Title } = Typography;
export default function About() {
  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Title>关于</Title>
    </Flex>
  );
}
