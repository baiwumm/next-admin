/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 14:56:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-25 14:51:29
 * @Description: 统计卡片
 */
import { ArrowDown, ArrowUp, RotateCcw } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Messages, useTranslations } from 'next-intl';
import { type FC, type ReactNode } from 'react';

import { type StatisticData } from '../utils'

import CountingNumber from '@/components/CountingNumber';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, CardToolbar, Spinner } from '@/components/ui';
import { TREND } from '@/enums';
import { get } from '@/lib/utils';

type StatisticDataProps = {
  title: keyof Messages['Pages']['Dashboard'];
  titleIcon: ReactNode;
  data?: StatisticData;
  loading: boolean;
  hasLoaded: boolean;
  handleRefresh: VoidFunction;
  day: number;
}

const StatisticCards: FC<StatisticDataProps> = ({ title, titleIcon, data, loading = false, hasLoaded = false, handleRefresh, day }) => {
  const t = useTranslations('Pages.Dashboard');
  return (
    <Card className="relative">
      <CardHeader className="border-0">
        <CardTitle className="flex items-center gap-2">
          {titleIcon}
          <span className="text-sm font-semibold text-foreground">{t(title)}</span>
        </CardTitle>
        <CardToolbar>
          <Button variant="ghost" mode="icon" size='xs' radius='full' onClick={handleRefresh}>
            <RotateCcw />
          </Button>
        </CardToolbar>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="flex justify-between items-center">
          <CountingNumber
            key={hasLoaded ? 'loaded' : 'loading'}
            from={0}
            to={get(data, 'data', 0)}
            className="text-2xl font-bold text-foreground tracking-tight"
          />
          {hasLoaded ? (
            <Badge variant={data?.trend === TREND.DOWN ? 'destructive' : 'success'} appearance="light">
              {data?.trend === TREND.DOWN ? <ArrowDown /> : <ArrowUp />}
              <CountingNumber
                key={hasLoaded ? 'percent' : 'percent-placeholder'}
                from={0}
                to={loading ? 0 : get(data, 'percent', 0)}
                format={(value) => `${value.toFixed(1)}%`}
                className="font-medium text-foreground"
              />
            </Badge>
          ) : null}
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 border-t pt-2.5">
          <CountingNumber
            key={hasLoaded ? 'prev' : 'prev-placeholder'}
            from={0}
            to={get(data, 'comparison', 0)}
            format={(value) => `${t('last-month')}: ${value.toFixed(0)}`}
            className="font-medium text-foreground"
          />
          <Badge variant="primary" appearance="light" size="xs">{t('trend-days', { day })}</Badge>
        </div>
      </CardContent>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-background/25 backdrop-blur-xs rounded-md z-10"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
export default StatisticCards;