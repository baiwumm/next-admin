/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 11:37:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-24 11:38:04
 * @Description: 数字递增动画
 */
'use client';

import { animate, motion, useInView, UseInViewOptions, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface CountingNumberProps {
  from?: number;
  to?: number;
  duration?: number; // seconds
  delay?: number; // ms
  className?: string;
  startOnView?: boolean;
  once?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  onComplete?: () => void;
  format?: (value: number) => string;
}

export default function CountingNumber({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  className,
  startOnView = true,
  once = false,
  inViewMargin,
  onComplete,
  format,
  ...props
}: CountingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: inViewMargin });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [display, setDisplay] = useState(from);
  const motionValue = useMotionValue(from);

  // Should start animation?
  const shouldStart = !startOnView || (isInView && (!once || !hasAnimated));

  useEffect(() => {
    if (!shouldStart) return;
    setHasAnimated(true);
    const timeout = setTimeout(() => {
      const controls = animate(motionValue, to, {
        duration,
        onUpdate: (v) => setDisplay(v),
        onComplete,
      });
      return () => controls.stop();
    }, delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStart, from, to, duration, delay]);

  return (
    <motion.span ref={ref} className={cn('inline-block', className)} {...props}>
      {format ? format(display) : Math.round(display)}
    </motion.span>
  );
}
