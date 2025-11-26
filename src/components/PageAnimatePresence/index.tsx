/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 13:52:26
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 13:58:17
 * @Description: 路由退场动画
 */
"use client";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";

import { AllTransitions, ROUTE_TRANSITION } from '@/lib/constant';
import { useAppStore } from '@/store/useAppStore';

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
  const transition = useAppStore((s) => s.transition);
  const variants: Variants = AllTransitions[transition] || ROUTE_TRANSITION.BLUR_SLIDE;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{ duration: 0.5 }}
        variants={{
          exitState: variants.exit
        }}
      >
        <FrozenRouter>
          {children}
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimatePresence; 