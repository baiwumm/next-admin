/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:52:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-14 09:47:31
 * @Description: 路由退场动画
 */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";

// 阻止页面立即打开，先让退场动画走完，再显示新的页面内容
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const PageAnimatePresence = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.5,
          ease: 'easeOut'
        }}
        variants={{
          exitState: { opacity: 0, x: -50, filter: 'blur(1rem)' }
        }}
        className="w-full min-h-screen overflow-hidden"
      >
        <FrozenRouter>
          {children}
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimatePresence; 