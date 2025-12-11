/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-11 14:06:31
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-11 14:07:37
 * @Description: 空数据
 */
import { Inbox } from "lucide-react";
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from '@/components/ui';

const EmptyContent: FC = () => {
  const t = useTranslations('Common');
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyDescription>{t('empty')}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
export default EmptyContent;