/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-18 15:47:10
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-18 16:12:10
 * @Description: 获取用户贡献日历
 */
import { NextRequest, NextResponse } from 'next/server';

import { RESPONSE } from '@/enums'
import { responseMessage } from '@/lib/utils';

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string; }> }) {
  const { searchParams } = new URL(request.url);
  const { username } = await params;
  const days = parseInt(searchParams.get('days') || '30', 10);

  if (!username) {
    return NextResponse.json(responseMessage(null, '缺少 username 参数', -1));
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return NextResponse.json(responseMessage(null, '缺少 Token！', -1));
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateISO = startDate.toISOString();
  const endDateISO = endDate.toISOString();

  const query = `
  query($username: String!, $startDate: DateTime!, $endDate: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $startDate, to: $endDate) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username,
          startDate: startDateISO,
          endDate: endDateISO, // 添加结束日期
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      NextResponse.json(responseMessage(null, result.errors[0].message, -1));
    }

    const contributions = result.data.user.contributionsCollection;
    const total = contributions.contributionCalendar.totalContributions;

    return NextResponse.json({
      username,
      days,
      totalContributions: total,
      startDate: startDateISO,
      // 可以返回更详细的数据
      details: contributions,
      // 按日期排序的日历数据
      dailyCommits: contributions.contributionCalendar.weeks
        .flatMap(week => week.contributionDays)
        .filter(day => {
          const dayDate = new Date(day.date);
          return dayDate >= startDate && dayDate <= endDate;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(responseMessage(null, '服务器错误', RESPONSE.FAIL));
  }
}
