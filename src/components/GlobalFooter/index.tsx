/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 09:55:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-16 16:56:15
 * @Description: 底部版权信息
 */
'use client';
import { Icon } from '@iconify/react';
import { Button, Image, Link, Spacer, Tooltip } from '@nextui-org/react';
import { useTranslations } from 'next-intl';

export default function GlobalFooter() {
  const t = useTranslations('App');
  // 渲染备案
  const renderIcp = (url: string, icon: string, name: string = '') => (
    <Link href={url} color="foreground" isExternal size="sm" className="text-slate-500 text-xs">
      <Image src={icon} alt={name} width={16} height={16} />
      <Spacer x={1} />
      {name}
    </Link>
  );

  // 渲染社交图标
  const renderSocial = (tip: string, url: string = '', icon: string) => (
    <Tooltip showArrow content={tip} placement="top">
      <Button variant="light" size="sm" isIconOnly onPress={() => window.open(url)}>
        <Icon icon={icon} className="text-base" />
      </Button>
    </Tooltip>
  );
  return (
    <footer className="w-full mt-4">
      {/* 顶部分割线 */}
      <div className="flex items-center align-center text-center w-full flex-row">
        <div className="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"></div>
        <div className="font-medium text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap">
          <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 text-[10px] flex-shrink-0">
            <Image src="/logo.svg" alt="logo" width={20} height={20} />
          </span>
        </div>
        <div className="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"></div>
      </div>
      <div className="flex justify-between items-center px-4 md:px-8 lg:px-16 py-2 max-sm:flex-col -mt-2.5">
        {/* 备案 */}
        <div className="flex items-center gap-3 max-sm:flex-col">
          {renderIcp('https://beian.miit.gov.cn/#/Integrated/index', '/icp.png', process.env.NEXT_PUBLIC_SITE_ICP)}
          {renderIcp(
            'https://beian.mps.gov.cn/#/query/webSearch',
            '/gongan.png',
            process.env.NEXT_PUBLIC_SITE_GUAN_ICP,
          )}
        </div>
        {/* 社交图标 */}
        <div className="max-sm:order-first flex items-center">
          {/* 网站统计 */}
          {renderSocial(t('website-statistics'), process.env.NEXT_PUBLIC_SITE_STATISTICS, 'ri:bar-chart-2-line')}
          {/* Github */}
          {renderSocial('Github', `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`, 'ri:github-line')}
          {/* 微信 */}
          {renderSocial(t('wechat'), process.env.NEXT_PUBLIC_AUTHOR_WECHAT, 'ri:wechat-line')}
          {/* 邮箱 */}
          {renderSocial('Email', `mailto:${process.env.NEXT_PUBLIC_AUTHOR_EMAIL}`, 'ri:mail-line')}
          {/* 博客 */}
          {renderSocial(t('blog'), process.env.NEXT_PUBLIC_AUTHOR_BLOG, 'ri:quill-pen-ai-line')}
        </div>
      </div>
    </footer>
  );
}
