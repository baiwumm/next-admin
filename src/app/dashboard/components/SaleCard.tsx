/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 13:49:07
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-19 12:05:24
 * @Description: 总销售额卡片
 */
'use client';

import { Spinner } from '@nextui-org/react';
import { RiArrowDownLine, RiArrowUpLine, RiResetRightLine } from '@remixicon/react';
import { useMount, useSetState } from 'ahooks';
import { random, toNumber } from 'lodash-es';
import { ReactNode, useState } from 'react';
import CountUp from 'react-countup';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SaleCard() {
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
        total: random(10000000, 100000000, true),
        date: toNumber(random(1, 100, true).toFixed(2)),
        week: toNumber(random(1, 100, true).toFixed(2)),
        complete: toNumber(random(1, 100, true).toFixed(2)),
        loading: false,
      });
    }, 1500);
  };

  useMount(() => {
    initData();

    // 创建一个包含随机箭头组件的数组
    const randomArrows = Array.from({ length: 3 }).map(() =>
      random() < 0.5 ? (
        <RiArrowDownLine key={random()} size={16} color="#F5222D" />
      ) : (
        <RiArrowUpLine key={random()} size={16} color="#52C41A" />
      ),
    );

    // 更新状态以触发重新渲染
    setArrows(randomArrows);
  });
  return (
    <Card>
      <div className={`relative transition-opacity opacity-${data.loading ? '50' : '100'}`}>
        {data.loading ? (
          <div className="absolute flex justify-center items-center w-full h-full z-50">
            <Spinner />
          </div>
        ) : null}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
          <CardTitle className="text-sm font-medium">总销售额</CardTitle>
          <RiResetRightLine
            className={`h-4 w-4 text-muted-foreground cursor-pointer ${data.loading ? 'animate-spin' : ''}`}
            onClick={() => initData()}
          />
        </CardHeader>
        <CardContent className="pb-4">
          <div className="text-2xl font-bold">
            <CountUp end={data.total} prefix="¥" separator="," decimals={2} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-6">
            <div className="flex items-center gap-1 ">
              <span>日同比</span>
              {arrows[0]}
              <CountUp end={data.date} suffix="%" />
            </div>
            <div className="flex items-center gap-1 ">
              <span>周同比</span>
              {arrows[1]}
              <CountUp end={data.week} suffix="%" />
            </div>
          </div>
          <Separator className="mt-4" />
        </CardContent>
        <CardFooter className="pb-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <span>前年同期业绩完成率</span>
            {arrows[2]}
            <CountUp end={data.complete} suffix="%" />
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
