/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-03 15:16:03
 * @LastEditors: 齐大胜 782395122@qq.com
 * @LastEditTime: 2025-02-22 17:07:15
 * @Description: 全局中间件
 */

// import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { auth } from '@/auth';
import { responseMessage } from '@/lib/utils';

export default auth(async (req) => {
  // 获取 JWT 令牌
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const authjsSessionToken = req?.cookies.get('authjs.session-token')?.value;
  const reqAuth = req.auth; // 其实callback的时候以及有req.auth了，这里只是演示如何获取
  const _cookieStore = await cookies();
  const cookieAuthjsSessionToken = _cookieStore.get('authjs.session-token')?.value;
  // 这里只用判断一个即可，或者用 || 也是可以的
  const isLogin = !!token && !!authjsSessionToken && !!cookieAuthjsSessionToken && !!reqAuth;
  // 退出登录
  const signoutApi = '/api/auth/signout';

  // 路由白名单，例如登录页
  const unprotectedRoutes = ['/login'];

  // 接口白名单
  const unprotectedApiRoutes = ['/login', 'auth/juejin'];

  // 定义需要保护的路由模式，例如所有非API路由
  const isProtectedRoute = !req.nextUrl.pathname.startsWith('/api/');

  // 退出登录
  if (req.nextUrl.pathname.includes(signoutApi)) {
    // 清空名为 "authjs.session-token" 和 "token" 的 Cookie
    const response = NextResponse.json(responseMessage(null, '退出成功', 0));

    // 这才是清除cookie的正确思路
    _cookieStore.delete('authjs.session-token');

    // 清除 Cookie，应该响应前处理，但是本次已经获取到了
    // response?.headers.set(
    //   "Set-Cookie",
    //   "authjs.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax"
    // );

    // 这个服务器端调用退出登录，清除cookie还是有问题，无法退出到登录页
    // 所以这里不是非必须的
    // signOut({redirectTo: '/login', redirect: true})

    return response;
  }

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

  if (isLogin && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
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
