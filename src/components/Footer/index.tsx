/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 14:38:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-06 14:52:46
 * @Description: 底部版权
 */
import Image from 'next/image'
import { type FC } from 'react';

import pkg from "../../../package.json";

const Footer: FC = () => {
  return (
    <footer>
      <div className="flex flex-col items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <div>
          Copyright © {new Date().getFullYear()} by&nbsp;
          <a
            href={pkg.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            白雾茫茫丶
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
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              粤ICP备2023007649号
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
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              粤公网安备44030402006402号
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;
