/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 09:40:34
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-23 11:08:04
 * @Description: 岗位管理
 */
import { Button } from "@heroui/react";
import { type FC } from 'react';

import PageContainer from '@/components/PageContainer';

const PostManage: FC = () => {
  return (
    <PageContainer>
      <div className="flex justify-center items-center h-[500px]">
        <Button color="primary">岗位管理</Button>
      </div>
    </PageContainer>
  )
}
export default PostManage;