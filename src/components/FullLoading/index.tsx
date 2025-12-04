/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 14:14:54
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 15:35:40
 * @Description: 全局 Loading
 */
"use client"
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Spinner } from "@/components/ui/spinner";

const FullLoading = () => {
  const t = useTranslations('Components.FullLoading');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // 判断组件是否挂载
  if (!mounted) {
    return (
      <div className="fixed flex w-screen h-screen justify-center items-center flex-col z-99 overflow-hidden bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-2">
          <Spinner className="size-6" variant="circle-filled" />
          <span className="font-bold">{t('label')} </span>
        </div>
      </div>
    );
  }
  return null;
};
export default FullLoading;