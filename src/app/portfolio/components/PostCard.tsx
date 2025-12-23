/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-19 11:10:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-22 11:01:53
 * @Description: 文章卡片
 */
import { Folder, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from "next/link";
import { type FC } from 'react';
import pkg from '#/package.json';
import { Badge, Button } from "@/components/ui";

export type PostCardProps = {
  categories: any[];
  contributors: any[];
  owner: Record<string, any>;
  post: Record<string, any>;
  stats: Record<string, any>;
  tags: any[];
}

const PostCard: FC<PostCardProps> = ({ categories = [], post = {}, stats = {}, tags = [] }) => {
  const BLOG_URL = pkg.author.url;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const date = new Date(post.spec.publishTime)
  const formattedDate = formatDate(date)
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-y-4">
        <div className="md:w-48 shrink-0">
          <div className="md:sticky md:top-8 pb-4">
            <time className="text-sm font-medium text-muted-foreground block mb-3">
              {formattedDate}
            </time>
            <Link href={`${BLOG_URL}${post.status.permalink}`} target='_blank'>
              <Button variant="outline" className="font-bold" size='sm'>
                阅读量：{stats.visit}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 md:pl-8 relative pb-10">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-border">
            {/* Timeline dot */}
            <div className="hidden md:block absolute -translate-x-1/2 size-3 bg-primary rounded-full z-10" />
          </div>

          <div className="space-y-4">
            <div className="relative z-10 flex flex-col gap-2">
              <Link href={`${BLOG_URL}${post.status.permalink}`} target='_blank'>
                <motion.h2 whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  className="text-2xl font-semibold tracking-tight overflow-hidden line-clamp-2 wrap-break-word">
                  {post.spec.title}
                </motion.h2>
              </Link>
              {/* 分类/标签 */}
              <div className="flex flex-wrap gap-2">
                {categories?.length ? categories.map((cate) => (
                  <Link key={cate.spec.slug} href={`${BLOG_URL}${cate.status.permalink}`} target='_blank'>
                    <Badge variant="secondary" size="sm">
                      <Folder /> {cate.spec.displayName}
                    </Badge>
                  </Link>
                )) : null}
                {tags?.length ? tags.map((tag) => (
                  <Link key={tag.spec.slug} href={`${BLOG_URL}${tag.status.permalink}`} target='_blank'>
                    <Badge variant="secondary" size="sm">
                      <Tag /> {tag.spec.displayName}
                    </Badge>
                  </Link>
                )) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Image src={post.spec.cover} alt={post.spec.title} width={800} height={400} className="object-cover aspect-1920/1080 rounded-md" />
              <p className="text-sm text-muted-foreground mt-2 overflow-hidden line-clamp-3 wrap-break-word">
                {post.status.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;