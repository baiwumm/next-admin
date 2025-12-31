/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-30 18:13:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-31 09:47:50
 * @Description: 项目信息
 */
'use client'
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import pkg from '#/package.json';

type Item = { name: string, value: string }

const ProjectInfo: FC = () => {
  const t = useTranslations('Pages.About');

  // 处理构建时间
  const formatBuildTime = () => {
    const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME; // e.g. "2025-12-31T01:26:00Z"

    if (!buildTime) return '';

    const formatted = new Date(buildTime).toLocaleString('sv-SE', {
      hour12: false,
    });

    return formatted;
  }

  const items: Item[] = [
    { name: t('name'), value: process.env.NEXT_PUBLIC_APP_NAME! },
    { name: t('version'), value: pkg.version },
    { name: t('build-time'), value: formatBuildTime() }
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('project-info')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {items.map(({ name, value }, index) => (
            <div key={index} className="flex items-center border rounded-lg text-sm gap-4">
              <div className="text-secondary-foreground bg-secondary flex justify-center items-center p-3 shrink-0">{name}</div>
              <div className="font-bold min-w-0 flex-1">{value}</div>
            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  )
}
export default ProjectInfo;