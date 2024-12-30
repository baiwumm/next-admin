/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-23 17:34:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-23 18:13:45
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
    const userName = searchParams.get('userName');
    const phone = searchParams.get('phone');
    // 分页处理，这里获取到的分页是字符串，需要转换成整数
    const take = toNumber(size);
    const skip = (toNumber(current) - 1) * take;
    // 条件判断
    const where: Prisma.UserWhereInput = {}; // 查询参数
    // 模糊查询
    if (userName) {
      where['userName'] = { contains: userName, mode: 'insensitive' };
    }
    if (phone) {
      where['phone'] = { contains: phone, mode: 'insensitive' };
    }
    const records = await prisma.user.findMany({
      skip,
      take,
      where,
      orderBy: [
        { sort: 'desc' }, // 按照sort字段升序
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

/**
 * @description: 新增用户
 * @param {Request} request
 */
export async function POST(request: Request) {
  try {
    // 解析请求体
    const { password, ...body } = await request.json(); // 如果是 JSON 数据
    // 密码加密
    const salt = await bcryptjs.genSalt(10);
    const hashPwd = await bcryptjs.hash(password, salt);
    const result = await prisma.user.create({
      data: {
        ...body,
        password: hashPwd,
      },
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
