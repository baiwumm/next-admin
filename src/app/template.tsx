/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-30 16:35:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-30 16:53:24
 * @Description: 路由进场动画
 */
'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const variants = {
    hidden: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
  };

  return (
    <motion.main
      data-scroll
      className="mb-auto p-4"
      initial="hidden"
      animate="enter"
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}
