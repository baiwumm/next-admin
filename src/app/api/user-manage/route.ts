/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 17:34:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-07 15:14:54
 * @Description: 用户管理模块
 */
import { Prisma } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import { toNumber } from 'lodash-es';
import { type NextRequest, NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import prisma from '@/lib/prisma';
import { responseMessage } from '@/lib/utils';

/**
 * @description: 查询用户管理列表
 * @param {Request} request
 */
export async function GET(request: NextRequest) {
  try {
    // 解析 URL 查询参数
    const { searchParams } = new URL(request.url);
    const size = searchParams.get('size') || '10';
    const current = searchParams.get('current') || '1';
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = toNumber(size);
    const skip = (toNumber(current) - 1) * take;
    // 条件判断
    const where: Prisma.UserWhereInput = {}; // 查询参数
    // 模糊查询
    if (name) {
      where['name'] = { contains: name, mode: 'insensitive' };
    }
    if (email) {
      where['email'] = { contains: email, mode: 'insensitive' };
    }
    const records = await prisma.user.findMany({
      skip,
      take,
      where,
      include: {
        accounts: true,
      },
      orderBy: [
        { createdAt: 'desc' }, // 如果sort相同，再按照createdAt字段降序
      ],
    });
    // 总条数
    const total = await prisma.user.count({ where });
    return NextResponse.json(
      responseMessage({
        records,
        total,
        current: toNumber(current),
        size: take,
      }),
    );
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
