/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-03 15:16:03
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-15 15:13:52
 * @Description: 全局中间件
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { responseMessage } from '@/lib/utils';

export default auth(async (req: NextRequest) => {
  const isLogin = !!req.auth?.user;
  // 路由白名单，例如登录页
  const unprotectedRoutes = ['/login'];

  // 接口白名单
  const unprotectedApiRoutes = ['/login', 'auth/juejin'];

  // 定义需要保护的路由模式，例如所有非API路由
  const isProtectedRoute = !req.nextUrl.pathname.startsWith('/api/');

  // 检查请求的方法是否为GET
  if (req.method !== 'GET' && !unprotectedApiRoutes.some((route) => req.nextUrl.pathname.includes(route))) {
    if (!isLogin) {
      return NextResponse.json(responseMessage(null, '请先登录', -1));
    }
    // 如果不是GET请求，返回一个带有消息的响应
    if (!isProtectedRoute) {
      return NextResponse.json(responseMessage(null, '演示系统，禁止操作', -1));
    }
  }

  // 检查是否为不受保护的路由
  const isUnprotectedRoute = unprotectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

  if (isUnprotectedRoute) {
    // 如果已登录，则跳转到首页
    if (isLogin && req.nextUrl.pathname.startsWith('/login')) {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // 对于不受保护的路由，继续执行默认行为
  }

  // 如果没有找到有效的token并且请求不是去往登录页，则重定向到登录页
  if (!isLogin && !req.nextUrl.pathname.startsWith('/login') && isProtectedRoute) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    // 可选：将原始URL作为查询参数传递给登录页，以便登录后重定向回去
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // 对于所有其他情况，继续执行默认行为
  return NextResponse.next();
});

// 配置此中间件应用于所有路由，除了静态资源
export const config = {
  matcher: [
    '/((?!_next|static|favicon.ico|.*\.(?:css|js|map|json|webmanifest|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$).*)',
  ],
};
