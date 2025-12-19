/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 16:16:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-19 09:09:25
 * @Description: 底部版权
 */
import Image from 'next/image'
import { type FC } from 'react';

import pkg from "#/package.json";

const Footer: FC = () => {
  return (
    <footer className="p-4" id="footer">
      <div className="flex flex-col items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div>
          Copyright © {new Date().getFullYear()} by&nbsp;
          <a
            href={pkg.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {process.env.NEXT_PUBLIC_AUTHOR_NAME}
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <Image
              src="/icp.png"
              width={16}
              height={16}
              alt="icp"
            />
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {process.env.NEXT_PUBLIC_SITE_ICP}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/gongan.png"
              width={16}
              height={16}
              alt="gongan"
            />
            <a
              href="https://beian.mps.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              {process.env.NEXT_PUBLIC_SITE_GUAN_ICP}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;