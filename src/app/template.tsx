/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:50:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-23 11:19:06
 * @Description: 路由进场动画
 */
"use client";

import { motion, type Variants } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const variants: Variants = {
    hidden: { opacity: 0, x: 20, filter: 'blur(1rem)' },
    enter: { opacity: 1, x: 0, filter: 'blur(0rem)' },
    exit: { opacity: 0, x: -20, filter: 'blur(1rem)' },
  };

  return (
    <motion.div
      data-scroll
      initial="hidden"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}