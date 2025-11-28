/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:29:20
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 17:29:35
 * @Description: 控制台
 */
"use client";
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations('Route');
  return (
    <div className="h-100 flex items-center justify-center">
      <Button>{t('dashboard')}</Button>
    </div>
  )
}