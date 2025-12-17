/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:18:04
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 09:03:56
 * @Description: 404 页面
 */
"use client";

import { useRouter } from '@bprogress/next/app';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Button } from '@/components/ui';

const NotFound: FC = () => {
  const t = useTranslations('Pages.NotFound');
  const router = useRouter();
  return (
    <div className="min-h-150 flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">404</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{t('title')}</p>
        <div className="flex items-center justify-center mt-10">
          <Button onClick={() => router.push('/dashboard')}>{t('button')}</Button>
        </div>
      </div>
    </div>
  )
}
export default NotFound;