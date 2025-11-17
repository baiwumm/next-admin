/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-09 13:46:21
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 08:54:49
 * @Description: 全局 Loading
 */
'use client';
import { Spinner } from "@heroui/react";
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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
      <div className="fixed flex w-screen h-screen justify-center items-center flex-col z-[99] overflow-hidden bg-white dark:bg-slate-900">
        <Spinner label={t('label')} variant="gradient" size="lg" />
      </div>
    );
  }
  return null;
};
export default FullLoading;