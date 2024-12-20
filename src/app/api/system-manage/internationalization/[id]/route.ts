import { NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import prisma from '@/lib/prisma';
import { responseMessage } from '@/lib/utils';

/**
 * @description: 更新国际化
 * @param {Request} request
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 获取动态参数
    const { id } = await params;
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据
    // 判断父级不能是子级
    if (id === body.parentId) {
      return NextResponse.json(responseMessage(null, '父级不能是自己!', -1));
    }
    // 条件判断
    const where = {
      id: {
        not: id,
      },
      name: body.name,
      parentId: body.parentId || null,
    };
    // 同一层级不能有重复的key
    const hasChildren = await prisma.internalization.count({
      where,
    });
    if (hasChildren > 0) {
      return NextResponse.json(responseMessage(null, '同一层级 name 不能相同', -1));
    }
    const result = await prisma.internalization.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}

/**
 * @description: 删除国际化
 * @param {Request} request
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // 查询该国际化是否有子级
    const hasChildren = await prisma.internalization.count({
      where: {
        parentId: id,
      },
    });
    if (hasChildren > 0) {
      return NextResponse.json(responseMessage(null, '该国际化字段下有子级，不能删除!', -1));
    } else {
      const result = await prisma.internalization.delete({
        where: { id },
      });
      return NextResponse.json(responseMessage(result));
    }
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
