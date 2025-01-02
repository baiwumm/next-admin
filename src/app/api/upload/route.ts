/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-31 10:53:33
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-02 13:43:07
 * @Description: 文件上传
 */
import crypto from 'crypto';
import dayjs from 'dayjs';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

import { RESPONSE_MSG } from '@/enums';
import { responseMessage } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    // 获取二进制文件数据
    const formData = await req.formData();

    const f = formData.get('file');

    if (!f) {
      return NextResponse.json({}, { status: 400 });
    }

    const file = f as File;

    const yearMonth = dayjs().format('YYYYMM');

    // 获取当前年月并创建对应的文件夹
    const uploadDir = path.join(process.cwd(), 'public/uploads', yearMonth);

    // 如果文件夹不存在，则创建
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // 将文件保存到服务器的文件系统中
    const fileArrayBuffer = await file.arrayBuffer();

    // 生成哈希值作为文件名
    const hash = crypto.randomBytes(16).toString('hex');

    // 生成文件名
    const fileName = `${hash}.${file.name.split('.')[1]}`;

    // 将文件上传到 uploads 文件夹
    await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(fileArrayBuffer));

    return NextResponse.json(
      responseMessage({
        fileName,
        size: file.size,
        url: `/uploads/${yearMonth}/${fileName}`,
      }),
    );
  } catch (error) {
    return NextResponse.json(responseMessage(error, RESPONSE_MSG.ERROR, -1));
  }
}
