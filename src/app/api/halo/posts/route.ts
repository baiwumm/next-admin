/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-19 13:46:23
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-19 14:01:10
 * @Description: 获取 Halo 文章列表
 */
import { NextRequest, NextResponse } from 'next/server'

import { responseMessage } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 透传所有查询参数（自动过滤掉空值或 null）
    const params = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value);
      }
    }

    // Halo API URL
    const haloApiUrl = 'https://baiwumm.com/apis/api.console.halo.run/v1alpha1/posts';
    const url = `${haloApiUrl}?${params.toString()}`;

    const token = process.env.HALO_TOKEN;
    if (!token) {
      return NextResponse.json(responseMessage(null, '缺少 Token！', -1));
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      // 关闭 Next.js 自动缓存（因为是管理接口，数据可能频繁变）
      cache: 'no-store',
      // 可选：设置超时（fetch 默认无超时）
    });

    if (!response.ok) {
      return NextResponse.json(responseMessage(null, `获取 Halo 文章失败: ${response.status} ${response.statusText}`, -1));
    }

    const data = await response.json();

    return NextResponse.json(responseMessage(data));
  } catch (err) {
    return NextResponse.json(responseMessage(null, (err as Error).message, -1));
  }
}