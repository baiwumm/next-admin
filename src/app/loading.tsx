/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-10 11:30:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-03 15:01:22
 * @Description: 路由加载 Loading
 */
'use client';
import { Spinner } from '@heroui/react';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Common');
  return (
    <div className="flex justify-center items-center min-h-60">
      <Spinner label={t('loading')} color="primary" />
    </div>
  );
}