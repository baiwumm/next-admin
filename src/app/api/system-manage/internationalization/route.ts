/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-11 10:07:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 09:56:42
 * @Description: 国际化模块
 */
import { type NextRequest, NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import { prisma } from '@/lib/prisma';
import { convertFlatDataToTree, responseMessage } from '@/lib/utils';

/**
 * @description: 查询国际化列表
 * @param {Request} request
 */
export async function GET(request: NextRequest) {
  // 解析 URL 查询参数
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name'); // 获取单个参数
  const zh = searchParams.get('zh'); // 获取所有同名参数
  // 条件判断
  const where: Record<string, any> = {}; // 查询参数
  // 模糊查询
  if (name) {
    where['name'] = { contains: name, mode: 'insensitive' };
  }

  if (zh) {
    where['zh'] = { contains: zh, mode: 'insensitive' };
  }

  const result = await prisma.internalization.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
  });
  return NextResponse.json(responseMessage(convertFlatDataToTree(result)));
}

/**
 * @description: 新增国际化
 * @param {Request} request
 */
export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json(); // 如果是 JSON 数据
    // 条件判断
    const where = {
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
    const result = await prisma.internalization.create({
      data: body,
    });
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
