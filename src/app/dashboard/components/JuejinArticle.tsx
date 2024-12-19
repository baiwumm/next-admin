/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 17:04:59
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-19 11:14:05
 * @Description: 掘金文章列表
 */
'use client';

import { Pagination, Spinner, Tooltip, User } from '@nextui-org/react';
import { RiTimeLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { ceil, get, map, take, toString } from 'lodash-es';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { getJuejinArticle } from '@/services/auth';

export default function JuejinArticle() {
  // 固定几条
  const pageSize = 5;
  // 当前第几页
  const [currentPage, setCurrentPage] = useState(1);

  // 文章条数
  const [total, setTotal] = useState(0);

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
    <div className={`relative flex flex-col gap-2 pr-4 min-h-[100px] opacity-${loading ? '50' : '100'}`}>
      {loading ? (
        <div className="absolute flex justify-center items-center w-full h-full z-50">
          <Spinner />
        </div>
      ) : null}
      {map(juejinArticleList || [], ({ article_id, author_user_info, article_info, tags }: any) => {
        // 文章内容
        const content = get(article_info, 'brief_content', '');
        return (
          <button
            key={article_id}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
            onClick={() => window.open(`https://juejin.cn/post/${article_id}`)}
          >
            <User
              avatarProps={{
                src: get(author_user_info, 'avatar_large'),
              }}
              description={
                <div className="flex items-center gap-1 text-xs font-medium mt-1">
                  <RiTimeLine size={14} />
                  阅读时间：{get(article_info, 'read_time', '')}
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
                  <Badge key={tag.tag_id} variant="secondary">
                    {tag.tag_name}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        );
      })}
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
