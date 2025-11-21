/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:50:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-21 17:11:39
 * @Description: 路由进场动画
 */
"use client";

import { motion, type Variants } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(1rem)' },
    enter: { opacity: 1, scale: 1, filter: 'blur(0rem)' },
  };

  return (
    <motion.main
      data-scroll
      initial="hidden"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}