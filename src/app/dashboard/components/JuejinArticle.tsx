/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 17:04:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-02 09:24:04
 * @Description: 掘金文章列表
 */
'use client';

import { Chip, cn, Pagination, Tooltip, User } from '@nextui-org/react';
import { RiArticleLine, RiFontSize2, RiTimeLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { ceil, get, map, take, toString } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import ContentLoading from '@/components/ContentLoading';
import { Empty } from '@/components/ui/empty';
import { getJuejinArticle } from '@/services/auth';

export default function JuejinArticle() {
  const t = useTranslations('Pages');
  // 固定几条
  const pageSize = 5;
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);

  // 文章条数
  const [total, setTotal] = useState(1);

  // 获取掘金文章列表
  const {
    data: juejinArticleList,
    run: fetchJuejinArticleList,
    loading,
  } = useRequest(
    async (params) => {
      const common = {
        sort_type: 2,
        user_id: '1917147257534279',
      };
      const result = await getJuejinArticle({
        ...params,
        ...common,
      });
      setTotal(get(result, 'data.total', 0));
      return take(get(result, 'data.records', []), pageSize);
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    fetchJuejinArticleList({ cursor: toString(pageSize * (currentPage - 1)) });
  }, [currentPage, fetchJuejinArticleList]);
  return (
    <div className={cn('relative flex flex-col gap-3 pr-4', `opacity-${loading ? '50' : '100'}`)}>
      <ContentLoading loading={loading} />
      {juejinArticleList?.length ? (
        map(juejinArticleList || [], ({ article_id, author_user_info, article_info, tags }: any) => {
          // 文章内容
          const content = get(article_info, 'brief_content', '');
          return (
            <div
              key={article_id}
              className="flex flex-col items-start gap-2 p-3 text-left text-sm transition-all hover:bg-slate-100 dark:hover:bg-default-100 cursor-pointer rounded-small border-small dark:border-default-100"
              onClick={() => window.open(`https://juejin.cn/post/${article_id}`)}
            >
              <User
                avatarProps={{
                  src: get(author_user_info, 'avatar_large'),
                }}
                description={
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs font-medium mt-1">
                      <RiTimeLine size={14} />
                      {t('dashboard.read')}：{get(article_info, 'read_time', '')}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium mt-1">
                      <RiArticleLine size={14} />
                      {t('dashboard.published')}：
                      {dayjs(parseInt(get(article_info, 'ctime'), 10) * 1000).format('YYYY-MM-DD HH:mm')}
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium mt-1">
                      <RiFontSize2 size={14} />
                      {t('dashboard.words')}：{get(article_info, 'content_count', 0)}
                    </div>
                  </div>
                }
                name={<div className="font-semibold">{get(article_info, 'title', '')}</div>}
              />
              <Tooltip content={<div className="max-w-[600px]">{content}</div>}>
                <div className="line-clamp-2 text-xs text-muted-foreground leading-5">{content}</div>
              </Tooltip>
              {tags.length ? (
                <div className="flex items-center gap-2">
                  {map(tags, (tag) => (
                    <Chip key={tag.tag_id} size="sm" variant="flat">
                      {tag.tag_name}
                    </Chip>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <Empty />
      )}
      {/* 分页 */}
      <div className="flex justify-center">
        <Pagination
          loop
          showControls
          size="sm"
          initialPage={currentPage}
          total={ceil(total / pageSize)}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
