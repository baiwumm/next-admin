/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 09:38:08
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-23 10:49:38
 * @Description: 组织管理
 */
import { Button } from "@heroui/react";
import { type FC } from 'react';

import PageContainer from '@/components/PageContainer';

const Organization: FC = () => {
  return (
    <PageContainer>
      <div className="flex justify-center items-center h-[500px]">
        <Button color="primary">组织管理</Button>
      </div>
    </PageContainer>
  )
}
export default Organization;