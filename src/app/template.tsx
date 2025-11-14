/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:50:05
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-14 10:24:07
 * @Description: 路由进场动画
 */
"use client";

import { motion, type Variants } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const variants: Variants = {
    hidden: { opacity: 0, x: 50 },
    enter: { opacity: 1, x: 0 },
  };

  return (
    <motion.main
      data-scroll
      initial="hidden"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      {children}
    </motion.main>
  );
}