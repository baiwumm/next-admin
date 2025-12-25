/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 14:56:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-25 14:51:53
 * @Description: 实时浏览量
 */
"use client";
import { Activity, ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, useEffect, useRef, useState } from 'react';

import CountingNumber from '@/components/CountingNumber';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardToolbar
} from '@/components/ui';
import { cn, randomNumber } from '@/lib/utils';

const RealTimeCard: FC = () => {
  const t = useTranslations('Pages.Dashboard');

  const [data, setData] = useState(() => randomNumber(10, 100));
  const [prevData, setPrevData] = useState(data);
  const [peak, setPeak] = useState(data);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [randomValues, setRandomValues] = useState(() => [
    Math.random(),
    Math.random(),
    Math.random()
  ])

  // 更新数据并跟踪变化
  useEffect(() => {
    const updateData = () => {
      setPrevData(data);
      const delta = randomNumber(-3, 5);
      const newValue = Math.max(1, data + delta);
      setData(newValue);
      setPeak((p) => Math.max(p, newValue));
      setRandomValues([Math.random(), Math.random(), Math.random()])
    };

    const delay = randomNumber(3000, 6000);
    intervalRef.current = setInterval(updateData, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data]);

  // 计算变化量
  const delta = data - prevData;
  return (
    <Card>
      <CardHeader className="border-0">
        <CardTitle className="flex items-center gap-2">
          <Activity className="size-6 text-blue-500 dark:text-blue-400" />
          <span className="text-sm font-semibold text-foreground">
            {t('real-time')}
          </span>
        </CardTitle>
        <CardToolbar>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping"></div>
            <div className="relative w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </CardToolbar>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {/* 主数字 + 趋势 */}
        <div className="flex items-baseline gap-2">
          <CountingNumber
            key={data} // 触发动画
            from={prevData}
            to={data}
            className="text-2xl font-bold text-foreground tracking-tight"
          />
          <Badge variant={delta > 0 ? 'destructive' : 'success'} appearance="ghost">
            {delta > 0 ? <ArrowDown /> : <ArrowUp />}
            <CountingNumber
              from={0}
              to={Math.abs(delta)}
              format={(value) => `${value.toFixed(0)}`}
              className="font-medium text-foreground"
            />
          </Badge>
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 border-t pt-2.5">
          <CountingNumber
            from={0}
            to={peak}
            format={(value) => `${t('today-peak')}: ${value.toFixed(0)}`}
            className="font-medium text-foreground"
          />
          {/* 活跃指示器（可选） */}
          <div className="flex space-x-1 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn('w-1.5 h-1.5 rounded-full', randomValues[i] > 0.4 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600')}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeCard;