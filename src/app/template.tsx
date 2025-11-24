/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:50:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-23 15:39:36
 * @Description: 路由进场动画
 */
"use client";
import { motion, type Variants } from "framer-motion";

import { AllTransitions, ROUTE_TRANSITION } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

export default function Template({ children }: { children: React.ReactNode }) {
  const transition = useAppStore((s) => s.transition);
  const variants: Variants = AllTransitions[transition] || ROUTE_TRANSITION.BLUR_SLIDE;

  return (
    <motion.div
      data-scroll
      initial="hidden"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}