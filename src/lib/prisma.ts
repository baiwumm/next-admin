// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// 确保在开发环境中每次请求都创建新的 PrismaClient 实例
// 这样可以避免连接池耗尽的问题。
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = globalThis.prisma || new PrismaClient();
} else {
  // 在生产环境中，我们可以安全地使用单例模式，
  // 因为服务器通常是无状态的，且每个请求都是独立的。
  const prisma = new PrismaClient();
  globalThis.prisma = prisma;
}

export const prisma = globalThis.prisma;
