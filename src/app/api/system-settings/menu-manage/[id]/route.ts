import { NextRequest, NextResponse } from 'next/server'

import { RESPONSE } from '@/lib/enums'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { responseMessage } from '@/lib/utils'

/**
 * @description: 修改菜单
 * @param {Request} request
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // supabase 客户端
    const supabase = await getSupabaseServerClient();
    // 获取动态参数
    const { id } = await params;
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据

    // 判断父级不能是自己
    if (id === body.parent_id) {
      return NextResponse.json(responseMessage(null, '父级不能是自己!', -1));
    }

    // 更新菜单
    const { data, error } = await supabase
      .from('n_menus')
      .update(body)
      .eq('id', id); // 根据 ID 更新指定菜单

    // 如果插入失败
    if (error) {
      // 判断是否违反唯一性约束（PostgreSQL 错误代码 23505）
      if (error.code === '23505') {
        return NextResponse.json(responseMessage(null, '路由地址已存在!', -1));
      }

      // 其他错误
      return NextResponse.json(responseMessage(error.message, RESPONSE.label(1), RESPONSE.FAIL));
    }

    // 返回更新后的菜单数据
    return NextResponse.json(responseMessage(data ? data[0] : data));
  } catch (err) {
    return NextResponse.json(responseMessage(err, RESPONSE.label(1), -1));
  }
}

/**
 * @description: 删除菜单
 * @param {Request} request
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // supabase 客户端
    const supabase = await getSupabaseServerClient();
    const { id } = await params;

    // 首先检查该菜单是否有子菜单
    const { data: children, error: checkChildrenError } = await supabase
      .from('n_menus')
      .select('id')
      .eq('parent_id', id); // 查找所有 parent_id 等于该菜单 ID 的子菜单

    if (checkChildrenError) {
      return NextResponse.json(responseMessage(checkChildrenError.message, RESPONSE.label(1), RESPONSE.FAIL));
    }

    // 如果有子菜单，不能删除
    if (children.length > 0) {
      return NextResponse.json(responseMessage(null, '该菜单有子菜单，不能删除!', -1));
    }

    // 删除菜单
    const { data, error } = await supabase
      .from('n_menus')
      .delete()
      .eq('id', id); // 根据 ID 删除菜单

    if (error) {
      return NextResponse.json(responseMessage(error.message, RESPONSE.label(1), RESPONSE.FAIL));
    }

    // 返回成功响应
    return NextResponse.json(responseMessage(data ? data[0] : data));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE.label(1), -1));
  }
}