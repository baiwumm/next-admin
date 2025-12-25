/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-24 18:04:24
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-24 18:06:07
 * @Description: 访问统计
 */
import { NextRequest, NextResponse } from 'next/server'

import { responseMessage } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {

    // Halo API URL
    const url = 'https://baiwumm.com/apis/api.data.statistics.xhhao.com/v1alpha1/umami/visits?type=weekly';

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
      return NextResponse.json(responseMessage(null, `接口请求失败: ${response.status} ${response.statusText}`, -1));
    }

    const data = await response.json();

    return NextResponse.json(responseMessage(data));
  } catch (err) {
    return NextResponse.json(responseMessage(null, (err as Error).message, -1));
  }
}