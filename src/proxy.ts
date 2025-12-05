/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:27:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-05 10:24:50
 * @Description: 代理层
 */
import { NextRequest, NextResponse } from 'next/server'

import { getSupabaseServerClient } from '@/lib/supabaseServer'

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = await getSupabaseServerClient() // ✅ 这里也要 await
  // 获取当前会话
  const { data: { session } } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname;

  // 注入当前请求的 pathname
  res.headers.set('x-current-pathname', path);

  // 规则1: 如果用户已登录，且访问的是 / 或 /login，则重定向到 /dashboard
  if (session && (path === '/' || path === '/login')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // 规则2: 如果用户未登录，且访问的不是 /login，则重定向到 /login
  if (!session && path !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 规则3: 如果用户未登录且访问 /login，或者已登录且访问 /dashboard 或其他受保护路由，则放行
  return res
}

// 配置匹配的路由
export const config = {
  matcher: [
    /*
     * 匹配所有路由，除了：
     * - _next (Next.js 内部文件)
     * - 静态资源 (如 .css, .png)
     * - API 路由 (可选，但通常不需要保护)
     */
    '/((?!_next|[^?]*\\.(?:html?|css|json|png|jpg|jpeg|gif|webp|avif|ico|bmp|svg|ttf|woff|woff2|webmanifest)$|api/.*).*)',
  ],
}