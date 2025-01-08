/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 16:23:30
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-18 16:57:48
 * @Description: 获取掘金列表
 */
import { get } from '@/lib/radash';
import { type NextRequest, NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import { responseMessage } from '@/lib/utils';

/**
 * @description: 获取掘金列表
 */
export async function POST(request: NextRequest) {
  try {
    const url = 'https://api.juejin.cn/content_api/v1/article/query_list';
    // 获取请求体
    const params = await request.json();

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error('获取掘金列表失败');
    }
    const data = await res.json();

    return NextResponse.json(
      responseMessage({
        records: get(data, 'data', []),
        total: get(data, 'count', 0),
      }),
    );
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
