/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:52:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-30 14:15:02
 * @Description: 路由退场动画
 */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useContext, useRef } from "react";

// 冻结当前的 LayoutRouterContext，防止在动画期间被更新
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext); // ✅ 直接使用，不要 ?? {}

  // ✅ 使用 useMemo 只在第一次创建并“冻结” context
  const frozenContext = useMemo(() => {
    return context;
  }, [context]); // 空依赖：只运行一次

  // 如果 context 不存在，直接返回 children（防御）
  if (!context) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const PageAnimatePresence = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 100 }} // ✅ 修复：添加 initialState
        animate={{ opacity: 1, x: 0 }}   // ✅ 修复：添加 animateState
        exit={{ opacity: 0, x: -100 }}    // ✅ 修复：添加 exitState
        transition={{
          duration: 0.5,
          ease: 'easeOut'
        }}
        className="w-full min-h-screen"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimatePresence;