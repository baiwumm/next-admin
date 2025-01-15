import { NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import prisma from '@/lib/prisma';
import { responseMessage } from '@/lib/utils';

/**
 * @description: 更新菜单
 * @param {Request} request
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 获取动态参数
    const { id } = await params;
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据
    // 判断父级不能是自己
    if (id === body.parentId) {
      return responseMessage(null, '父级不能是自己!', -1);
    }
    const result = await prisma.menu.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    // 判断是否违反 postgresql 唯一性约束
    if (error.code === 'P2002') {
      return NextResponse.json(responseMessage(null, '菜单名称、菜单地址已存在!', -1));
    }
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}

/**
 * @description: 删除菜单
 * @param {Request} request
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // 查询该菜单是否有子级
    const hasChildren = await prisma.menu.count({
      where: {
        parentId: id,
      },
    });
    if (hasChildren > 0) {
      return NextResponse.json(responseMessage(null, '该菜单下有子级，不能删除!', -1));
    } else {
      const result = await prisma.menu.delete({
        where: { id },
      });
      return NextResponse.json(responseMessage(result));
    }
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
