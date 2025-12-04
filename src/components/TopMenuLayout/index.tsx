/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:20:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-04 15:19:58
 * @Description: 顶部菜单布局
 */
import { AnimatePresence, motion } from 'motion/react'
import { type FC, type ReactNode } from 'react';

import Navbar from './components/Navbar';

import Footer from '@/components/Footer';
import { useAppStore } from '@/store/useAppStore';

type TopMenuLayoutProps = {
  children?: ReactNode;
}

const TopMenuLayout: FC<TopMenuLayoutProps> = ({ children }) => {
  const showFooter = useAppStore((s) => s.showFooter);
  return (
    <>
      <Navbar />
      <main className='container mx-auto p-4 min-h-[calc(100vh-8rem)]'>
        {children}
      </main>
      <AnimatePresence mode="wait">
        {showFooter && (
          <motion.div
            key="footer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default TopMenuLayout;