/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:59:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:28:48
 * @Description: 工作台
 */
'use client';

import { Flex, Typography } from 'antd';

const { Title } = Typography;

export default function Dashboard() {
  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Title>工作台</Title>
    </Flex>
  );
}
