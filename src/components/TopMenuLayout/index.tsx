/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:20:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-28 17:47:31
 * @Description: 顶部菜单布局
 */
import { type FC, type ReactNode } from 'react';

import Navbar from './components/Navbar';

import Footer from '@/components/Footer';

type TopMenuLayoutProps = {
  children?: ReactNode;
}

const TopMenuLayout: FC<TopMenuLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto p-4 min-h-[calc(100vh-8rem)]'>
        {children}
      </main>
      <Footer />
    </>
  );
};
export default TopMenuLayout;