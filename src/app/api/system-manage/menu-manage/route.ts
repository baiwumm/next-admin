/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-13 17:40:52
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-15 09:25:48
 * @Description: 菜单管理模块
 */
import { Prisma } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import prisma from '@/lib/prisma';
import { responseMessage } from '@/lib/utils';

/**
 * @description: 查询菜单管理列表
 * @param {Request} request
 */
export async function GET(request: NextRequest) {
  try {
    // 解析 URL 查询参数
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');

    // 条件判断
    const where: Prisma.MenuWhereInput = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }
    if (startTime && endTime) {
      where['createdAt'] = {
        gte: new Date(Number(startTime)),
        lte: new Date(Number(endTime)),
      };
    }

    const result = await prisma.menu.findMany({
      where,
      include: {
        parent: true,
      },
      orderBy: [
        { sort: 'asc' }, // 按照sort字段升序
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}

/**
 * @description: 新增菜单
 * @param {Request} request
 */
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据

    const result = await prisma.menu.create({
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
