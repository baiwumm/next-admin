/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-20 09:19:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 14:51:59
 * @Description: Github 提交日志
 */
'use client';

// 引入中文语言包
import 'dayjs/locale/zh-cn';

import { Avatar, Chip, cn, Listbox, ListboxItem, Spinner, Tooltip } from '@nextui-org/react';
import { RiGitCommitLine, RiResetRightLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { get, map } from 'lodash-es';
import { useTranslations } from 'next-intl';

import { Empty } from '@/components/ui/empty';
import { isSuccess } from '@/lib/utils';
// dayjs 相对时间
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

export default function GithubCommit() {
  const t = useTranslations('Pages');
  /**
   * @description: 请求项目 commit 日志
   */
  const {
    data: commitList,
    loading,
    run,
  } = useRequest(async () => {
    const response = await fetch('https://api.github.com/repos/baiwumm/next-admin/commits?page=1&per_page=10');
    if (isSuccess(response.status)) {
      const result = await response.json();
      return result;
    }
    return [];
  });

  // 渲染顶部内容
  const renderTopContent = (
    <div className="flex items-center justify-between px-2">
      <Chip variant="flat" className="capitalize">
        {t('dashboard.github-log')}
      </Chip>
      <Tooltip content={t('dashboard.get-latest')}>
        <RiResetRightLine
          className={`h-4 w-4 text-muted-foreground cursor-pointer ${loading ? 'animate-spin' : ''}`}
          onClick={() => run()}
        />
      </Tooltip>
    </div>
  );
  return (
    <div
      className={cn(
        'relative border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 ml-4 min-h-[100px]',
        `opacity-${loading ? '50' : '100'}`,
      )}
    >
      {loading ? (
        <div className="absolute flex justify-center w-full items-center h-full z-50">
          <Spinner />
        </div>
      ) : null}
      {commitList?.length ? (
        <Listbox aria-label={t('dashboard.github-log')} variant="faded" topContent={renderTopContent}>
          {map(commitList, (item) => (
            <ListboxItem key={item.sha} showDivider textValue={item.sha}>
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <RiGitCommitLine />
                  <div className="font-sm font-semibold">{item.commit.message}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={get(item, 'committer.login', '')}
                    className="w-6 h-6"
                    src={get(item, 'committer.avatar_url', '')}
                  />
                  <span className="text-xs">{get(item, 'committer.login', '')}</span>
                  <span className="text-xs">{t('dashboard.committed')}</span>
                  <span className="text-xs text-default-400">{dayjs(item.commit.author.date).fromNow()}</span>
                </div>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      ) : (
        <Empty />
      )}
    </div>
  );
}