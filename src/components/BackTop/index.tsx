/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 11:05:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-23 11:11:17
 * @Description: 回到顶部
 */
'use client';

import { CircularProgress, Tooltip } from '@nextui-org/react';
import { useMount } from 'ahooks';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function BackTop() {
  const t = useTranslations('App');
  // 使用useScroll钩子来追踪滚动信息
  const { scrollYProgress } = useScroll();
  // 滚动百分比
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollPercentage(Math.round(latest * 100));
  });

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 为平滑滚动
    });
  };

  // 保持每次加载时回到顶部
  useMount(() => {
    scrollToTop();
  });
  return (
    <Tooltip showArrow content={t('back-top')} placement="bottom-end">
      <div className="cursor-pointer" onClick={scrollToTop}>
        <CircularProgress
          aria-label="Back Top"
          size="sm"
          value={scrollPercentage}
          color="success"
          formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
          showValueLabel={true}
        />
      </div>
    </Tooltip>
  );
}
