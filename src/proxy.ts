/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:27:43
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 11:05:23
 * @Description: 代理层
 */
import { NextRequest, NextResponse } from 'next/server'

import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { responseMessage } from '@/lib/utils'

// ✅ 白名单：这些路径无需登录
const PUBLIC_ROUTES = ['/portfolio']

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = await getSupabaseServerClient() // ✅ 这里也要 await
  // 获取当前会话
  const { data: { session } } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname;
  const method = req.method

  // 🔒 如果是 API 且非 GET（仅当你包含 API 路由时生效）
  if (path.startsWith('/api/') && method !== 'GET') {
    return NextResponse.json(responseMessage(null, '客官，不允许乱动哟！', -1))
  }

  // 注入当前请求的 pathname
  res.headers.set('x-current-pathname', path);

  // ✅ 检查是否在白名单中
  const isPublicRoute = PUBLIC_ROUTES.some(route => {
    // 简单匹配静态路径
    if (route.endsWith('*')) {
      const prefix = route.slice(0, -2) // 移除 ':path*' 或 '/*' 的 * 部分
      return path.startsWith(prefix)
    }
    return route === path
  })

  // 如果是公开路由，直接放行（不重定向）
  if (isPublicRoute) {
    return res
  }

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
    '/((?!_next|[^?]*\\.(?:html?|css|json|png|jpg|jpeg|gif|webp|avif|ico|bmp|svg|ttf|woff|woff2|webmanifest)$).*)',
  ],
}