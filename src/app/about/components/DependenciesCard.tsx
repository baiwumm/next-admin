/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-30 17:35:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-30 17:42:27
 * @Description: 依赖卡片
 */
'use client'
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import BlurFade from '@/components/BlurFade';
import { Badge, BadgeDot, Card, CardContent, CardHeader, CardHeading, CardTitle, CardToolbar } from '@/components/ui';
import pkg from '#/package.json';

type DependenciesCardProps = {
  fieldName: 'dependencies' | 'devDependencies';
}

const DependenciesCard: FC<DependenciesCardProps> = ({ fieldName }) => {
  const t = useTranslations('Pages.About');
  const values = pkg[fieldName];
  return (
    <Card>
      <CardHeader>
        <CardHeading>
          <CardTitle>{t(fieldName)}</CardTitle>
        </CardHeading>
      </CardHeader>
      <CardContent className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {Object.keys(values).map((key, index) => (
          <BlurFade key={key} delay={0.02 * index}>
            <Card className="w-full min-w-0">
              <CardHeader className="flex flex-row items-center justify-between gap-2 border-none">
                <CardHeading className="min-w-0 flex-1">
                  <CardTitle className="truncate">{key}</CardTitle>
                </CardHeading>
                <CardToolbar className="shrink-0">
                  <Badge variant="primary" appearance="light">
                    <BadgeDot /> {values[key as keyof typeof values]}
                  </Badge>
                </CardToolbar>
              </CardHeader>
            </Card>
          </BlurFade>
        ))}
      </CardContent>
    </Card>
  )
}
export default DependenciesCard;