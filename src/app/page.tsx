/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 09:16:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 14:41:28
 * @Description: 首页
 */
"use client";
import { Button } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { Button as RsuiteButton } from 'rsuite';
import { toast } from 'sonner';

import LangSwitch from '@/components/LangSwitch';

export default function Home() {
  const t = useTranslations('Route');
  return (
    <>
      <Button variant="danger-soft" onPress={() => toast.error(t('dashboard'))}>{t('dashboard')}</Button>
      <RsuiteButton onClick={() => toast.success(t('personal-center'))}>{t('personal-center')}</RsuiteButton>
      <LangSwitch />
    </>
  );
}
