/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-10 17:00:46
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-10 17:15:06
 * @Description: 404 页面
 */
"use client";

import { Button } from "@heroui/react";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

const NotFound: FC = () => {
  const t = useTranslations('Components.NotFound');
  return (
    <div className="min-h-[calc(100vh-11rem)] flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">404</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{t('title')}</p>
        <div className="flex items-center justify-center mt-10">
          <Button color="primary" href="/dashboard" as={Link}>{t('button')}</Button>
        </div>
      </div>
    </div>
  )
}
export default NotFound;