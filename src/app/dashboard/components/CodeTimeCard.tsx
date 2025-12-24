/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 14:56:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-24 15:04:10
 * @Description: 总编码时间
 */
"use client"
import { useRequest } from 'ahooks';
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';

import CountingNumber from '@/components/CountingNumber';
import { Badge, Card, CardContent, CardHeader, CardTitle, CardToolbar, Spinner } from '@/components/ui';
import { TREND } from '@/enums';
import { cn, get } from '@/lib/utils';
import { getTotalTime } from '@/services/wakatime';

const CodeTimeCard: FC = () => {
  const t = useTranslations('Pages.Dashboard');
  const [hasLoaded, setHasLoaded] = useState(false);
  /**
    * @description: 获取总编码时间
    */
  const {
    data: codeTime,
    loading: codeTimeLoading,
    run: runCodeTime
  } = useRequest(async () => get<WakaTime.TotalTime>(await getTotalTime(), 'data'), {
    onSuccess: () => setHasLoaded(true)
  });

  const handleRefresh = () => {
    setHasLoaded(false);
    runCodeTime();
  };
  return (
    <Card className="relative">
      <CardHeader className="border-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">{t('code-time')}</CardTitle>
        <CardToolbar>
          <RotateCcw className={cn("cursor-pointer size-4", codeTimeLoading ? 'animate-spin' : '')} onClick={handleRefresh} />
        </CardToolbar>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="flex justify-between items-center">
          <CountingNumber
            key={hasLoaded ? 'loaded' : 'loading'}
            from={0}
            to={get(codeTime, 'current_30_est.hours', 0)}
            format={(value) => `${value.toFixed(1)}${t('hour')}`}
            className="text-xl font-medium text-foreground tracking-tight"
          />
          {hasLoaded ? (
            <Badge variant={codeTime?.trend === TREND.DOWN ? 'destructive' : 'success'} appearance="light">
              {codeTime?.trend === TREND.DOWN ? <ArrowDown /> : <ArrowUp />}
              <CountingNumber
                key={hasLoaded ? 'percent' : 'percent-placeholder'}
                from={0}
                to={codeTimeLoading ? 0 : get(codeTime, 'change_percent', 0)}
                format={(value) => `${value.toFixed(1)}%`}
                className="font-medium text-foreground"
              />
            </Badge>
          ) : null}
        </div>
        <div className="text-xs text-muted-foreground mt-2 border-t pt-2.5">
          {t('last-month')}:{' '}
          <CountingNumber
            key={hasLoaded ? 'prev' : 'prev-placeholder'}
            from={0}
            to={get(codeTime, 'previous_30_sim.hours', 0)}
            format={(value) => `${value.toFixed(1)}${t('hour')}`}
            className="font-medium text-foreground"
          />
        </div>
      </CardContent>
      <AnimatePresence>
        {codeTimeLoading && (
          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm rounded-md z-10"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
export default CodeTimeCard;