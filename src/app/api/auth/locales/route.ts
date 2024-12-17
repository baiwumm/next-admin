/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-17 14:19:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-17 14:19:09
 * @Description: 获取国际化数据层级数据
 */
import { NextResponse } from 'next/server';

import { RESPONSE_MSG } from '@/enums';
import { prisma } from '@/lib/prisma';
import { convertFlatDataToTree, convertToLocalization, responseMessage } from '@/utils';

/**
 * @description: 获取国际化数据层级数据
 */
export async function GET() {
  try {
    // 查询全部数据
    const sqlData = await prisma.internalization.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
    // 将数据转成树形结构
    const localesTree = convertFlatDataToTree(sqlData);
    // 转成层级对象
    const result = convertToLocalization(localesTree);
    return NextResponse.json(responseMessage(result));
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
