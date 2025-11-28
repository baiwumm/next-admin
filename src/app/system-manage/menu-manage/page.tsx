/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:10:25
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 17:28:52
 * @Description: 菜单管理
 */
"use client";
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';

export default function MenuManage() {
  const t = useTranslations('Route');
  return (
    <div className="h-100 flex items-center justify-center">
      <Button>{t('menu-manage')}</Button>
    </div>
  )
}