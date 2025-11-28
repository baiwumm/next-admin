/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-12 10:07:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-12 17:14:48
 * @Description: 用户管理模块
 */
import { NextRequest, NextResponse } from 'next/server'

import { RESPONSE_MSG } from '@/lib/constant'
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin'
import { responseMessage } from '@/lib/utils'

/**
 * @description: 查询登录用户列表
 * @param {Request} request
 */
export async function GET(request: NextRequest) {
  try {
    // supabase 客户端
    const supabase = getSupabaseAdminClient();
    // 解析 URL 查询参数
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || 1;
    const perPage = Number(searchParams.get('perPage')) || 10;

    // 构建查询
    const { data: { users, total }, error } = await supabase.auth.admin.listUsers({
      page,
      perPage
    })

    // 执行失败
    if (error) {
      return responseMessage(error.message, RESPONSE_MSG.ERROR, 500)
    }

    return NextResponse.json(responseMessage({ records: users, total, current: page, size: perPage }));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}