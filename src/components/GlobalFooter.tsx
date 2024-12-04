/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-04 09:17:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-04 17:39:23
 * @Description: 底部布局
 */
'use client';

import { Flex, Layout, Typography } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

const { Footer } = Layout;

export default function GlobalFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Flex gap="small" justify="center">
        <Text>Copyright © {dayjs().year()} by</Text>
        <a href="https://baiwumm.com/" target="_blank" className="link-hover">
          白雾茫茫丶
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank" className="link-hover">
          粤ICP备2023007649号
        </a>
      </Flex>
    </Footer>
  );
}
