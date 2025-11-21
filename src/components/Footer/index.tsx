/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 14:38:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-21 17:47:46
 * @Description: 底部版权
 */
import { Image } from "@heroui/react"
import { type FC } from 'react';

import pkg from "../../../package.json";

const Footer: FC = () => {
  return (
    <footer>
      <div className="flex flex-col items-center gap-1 text-tiny text-gray-500 dark:text-gray-400">
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
