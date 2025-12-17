/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-17 17:00:32
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 17:06:48
 * @Description: 获取 Github 仓库信息
 */
import { NextRequest, NextResponse } from 'next/server';

import { responseMessage } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string; repo: string }> }
) {
  const { username, repo } = await params;

  // 输入校验（可选但推荐）
  if (!username || !repo) {
    return NextResponse.json(responseMessage(null, '缺少 username 或者 repo 参数', -1));
  }

  // 检查环境变量
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return NextResponse.json(responseMessage(null, '缺少 Token！', -1));
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': process.env.NEXT_PUBLIC_APP_NAME!, // 自定义 User-Agent
      },
      // 可选：设置缓存（避免频繁请求 GitHub）
      next: { revalidate: 300 }, // 5 分钟缓存
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('GitHub API error:', res.status, errorData);

      // 如果是 404，透传；否则返回通用错误
      if (res.status === 404) {
        return new Response(
          JSON.stringify({ error: 'Repository not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to fetch repository data' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Unexpected error in GitHub API route:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}