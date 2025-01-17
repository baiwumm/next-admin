/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-20 17:03:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 17:03:06
 * @Description: 内容盒子 Loading
 */
import { Spinner } from '@heroui/react';

type ContentLoadingProps = {
  loading: boolean;
};

export default function ContentLoading({ loading = false }: ContentLoadingProps) {
  if (!loading) {
    return null;
  }
  return (
    <div className="absolute flex justify-center items-center w-full h-full z-50">
      <Spinner />
    </div>
  );
}
