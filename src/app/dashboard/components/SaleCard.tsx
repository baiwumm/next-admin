/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 13:49:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-20 17:55:33
 * @Description: 总销售额卡片
 */
'use client';
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useMount, useSetState } from 'ahooks';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';

import ContentLoading from '@/components/ContentLoading';
import { random } from '@/lib/radash';

export default function SaleCard() {
  const t = useTranslations('Pages.dashboard');
  const [arrows, setArrows] = useState<ReactNode[]>([]);

  // 总销售额数据
  const [data, setData] = useSetState({
    total: 0,
    date: 0,
    week: 0,
    complete: 0,
    loading: false,
  });

  // 初始化总销售额数据
  const initData = () => {
    setData({
      loading: true,
    });
    setTimeout(() => {
      setData({
        total: random(10000000, 100000000),
        date: random(1, 100),
        week: random(1, 100),
        complete: random(1, 100),
        loading: false,
      });
    }, 1500);
  };

  useMount(() => {
    initData();

    // 创建一个包含随机箭头组件的数组
    const randomArrows = Array.from({ length: 3 }).map(() =>
      random(0, 1) < 0.5 ? (
        <Icon icon="ri:arrow-down-line" key={random(0, 1)} color="#F5222D" className="text-base" />
      ) : (
        <Icon icon="ri:arrow-up-line" key={random(0, 1)} color="#52C41A" className="text-base" />
      ),
    );

    // 更新状态以触发重新渲染
    setArrows(randomArrows);
  });
  return (
    <Card radius="sm">
      <div className={`relative transition-opacity opacity-${data.loading ? '50' : '100'}`}>
        <ContentLoading loading={data.loading} />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
          <div className="text-sm font-medium">{t('sales-total')}</div>
          <Icon
            icon="ri:reset-right-line"
            className={`h-4 w-4 text-muted-foreground cursor-pointer ${data.loading ? 'animate-spin' : ''}`}
            onClick={() => initData()}
          />
        </CardHeader>
        <CardBody className="pb-4">
          <div className="text-2xl font-bold">
            <CountUp end={data.total} prefix="¥" separator="," decimals={2} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-6">
            <div className="flex items-center gap-1 ">
              <span>{t('daily')}</span>
              {arrows[0]}
              <CountUp end={data.date} suffix="%" />
            </div>
            <div className="flex items-center gap-1 ">
              <span>{t('week')}</span>
              {arrows[1]}
              <CountUp end={data.week} suffix="%" />
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="pb-2 pt-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <span>{t('sales-complete-rate')}</span>
            {arrows[2]}
            <CountUp end={data.complete} suffix="%" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
