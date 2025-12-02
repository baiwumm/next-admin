/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:23:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 15:19:46
 * @Description: 路由加载 Loading
 */
import { useTranslations } from 'next-intl';

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  const t = useTranslations('Common');
  return (
    <div className="flex justify-center items-center min-h-80">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-6" />
        <span className="text-sm font-bold">{t('loading')}</span>
      </div>
    </div>
  );
}