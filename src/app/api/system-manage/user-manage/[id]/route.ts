import { NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import prisma from '@/lib/prisma';
import { responseMessage } from '@/lib/utils';

/**
 * @description: 更新用户
 * @param {Request} request
 */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 获取动态参数
    const { id } = await params;
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据
    const result = await prisma.user.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    // 判断是否违反 postgresql 唯一性约束
    if (error.code === 'P2002') {
      return NextResponse.json(responseMessage(null, '用户名、电子邮箱、手机号已存在!', -1));
    }
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}

/**
 * @description: 删除用户
 * @param {Request} request
 */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // 限制 admin 账号不能删除
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user && user.userName.toLowerCase() === 'admin') {
      return NextResponse.json(responseMessage(null, 'admin 账号不能删除!', -1));
    }
    const result = await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
