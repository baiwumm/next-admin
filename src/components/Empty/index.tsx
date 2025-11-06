/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 14:19:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-06 14:29:39
 * @Description: 空状态
 */
import { Icon } from '@iconify-icon/react';
import { useTranslations } from 'next-intl';
import { type FC } from 'react';

type EmptyProps = {
  title?: string;
}

const Empty: FC<EmptyProps> = ({ title }) => {
  const t = useTranslations('Common');
  return (
    <div className="flex flex-col gap-2">
      <Icon icon="mdi:information-variant-circle-outline" className="text-6xl" />
      <p className="truncate text-sm/6 text-gray-400 dark:text-gray-300">{title || t('empty')}</p>
    </div>
  )
}
export default Empty;
