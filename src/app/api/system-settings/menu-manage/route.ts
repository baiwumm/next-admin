/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-04 10:19:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-14 13:42:08
 * @Description: 菜单管理模块
 */
import { NextRequest, NextResponse } from 'next/server'

import { RESPONSE } from '@/enums'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { convertFlatDataToTree, responseMessage } from '@/lib/utils'

/**
 * @description: 查询菜单管理列表
 * @param {Request} request
 */
export async function GET(request: NextRequest) {
  try {
    // supabase 客户端
    const supabase = await getSupabaseServerClient();
    // 解析 URL 查询参数
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');
    // 构建查询
    let query = supabase
      .from('n_menus')
      .select('*')
      .order('sort', { ascending: false })
      .order('created_at', { ascending: false })

    // 如果有 path 参数，则使用模糊查询
    if (path) {
      query = query.ilike('path', `%${path}%`)
    }

    // 执行查询
    const { data: menus, error } = await query;

    // 执行失败
    if (error) {
      return responseMessage(null, error.message, RESPONSE.FAIL)
    }

    return NextResponse.json(responseMessage(convertFlatDataToTree(menus || [])));
  } catch (err) {
    return NextResponse.json(responseMessage(null, (err as Error).message, -1));
  }
}

/**
 * @description: 新增菜单
 * @param {Request} request
 */
export async function POST(request: NextRequest) {
  try {
    // supabase 客户端
    const supabase = await getSupabaseServerClient();
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据

    // 插入数据
    const { data, error } = await supabase
      .from('n_menus')
      .insert(body);

    // 如果插入失败
    if (error) {
      // 判断是否违反唯一性约束（PostgreSQL 错误代码 23505）
      if (error.code === '23505') {
        return NextResponse.json(responseMessage(null, '路由地址已存在！', -1));
      }

      // 其他错误
      return NextResponse.json(responseMessage(null, error.message, RESPONSE.FAIL));
    }
    return NextResponse.json(responseMessage(data));
  } catch (err) {
    return NextResponse.json(responseMessage(null, (err as Error).message, -1));
  }
}
