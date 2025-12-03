/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:26:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 08:42:50
 * @Description: 登录页面
 */
"use client";
import { useRouter } from '@bprogress/next/app';
import { zodResolver } from "@hookform/resolvers/zod"
import { track } from '@vercel/analytics';
import { upperFirst } from 'es-toolkit';
import { map } from 'es-toolkit/compat'
import { Check, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { toast } from 'sonner';
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner";
import { GithubIcon, GoogleIcon } from '@/lib/icons'
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

type AllowedPropertyValues = Parameters<typeof track>[1];

type Providers = 'github' | 'google';

export default function Login() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const t = useTranslations('Pages.Login');
  const [emailLoading, setEmailLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  // 是否注册
  const [isSignup, setIsSignup] = useState(false);
  // 是否显示密码
  const [showPassword, setShowPassword] = useState(false);

  // 字段验证规则
  const formSchema = z.object({
    email: z.email(t('email-valid')),
    password: z
      .string()
      .min(1, t('password-placeholder'))
      .min(6, t('password-min', { min: 6 }))
  })

  // 创建表单实例
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 表单提交
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setEmailLoading(true);
    // 判断是注册还是登录
    if (isSignup) {
      const { error } = await supabase.auth.signUp(values);
      track('Signup', values as AllowedPropertyValues);
      if (error) {
        toast.error(t('signup-error'), {
          description: error.message
        })
      } else {
        toast.error(t('signup-success'))
        form.reset() // ✅ 清空表单
        setIsSignup(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword(values);
      track('Login', values as AllowedPropertyValues);
      if (error) {
        toast.error(t('login-error'), {
          description: error.message
        })
      } else {
        // 登录成功，Middleware 会自动跳转到 /dashboard
        router.refresh() // 触发服务端状态检查
      }
    }
    setEmailLoading(false)
  };

  // 谷歌或者 Github 登录
  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    setOauthLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    if (error) {
      toast.error(t('login-error'), {
        description: error.message
      })
    }
    setOauthLoading(false)
    track('Provider', { provider: upperFirst(provider) });
  }
  return (
    <div className="w-full max-w-md p-4">
      <Card className="gap-4">
        <CardHeader>
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logo.svg"
              width={42}
              height={42}
              alt="Logo"
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</p>
              <p className="text-small text-default-500">{process.env.NEXT_PUBLIC_APP_DESC}</p>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>
                      {t('email')}
                    </FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput placeholder={t('email-placeholder')} {...field} />
                        <InputGroupAddon>
                          <Mail />
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span>
                      {t('password')}
                    </FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput placeholder={t('password-placeholder')} type={showPassword ? 'text' : 'password'} {...field} />
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff /> : <Eye />}
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={oauthLoading || emailLoading}>
                {emailLoading ? <Spinner /> : <Check />}
                {emailLoading ? t('login-in') : t(isSignup ? 'register' : 'submit')}
              </Button>
            </form>
          </Form>
          <div className="flex justify-end items-center w-full">
            {isSignup ? (
              <p className="text-sm text-center">
                {t('has-account')}
                <Button variant="link" onClick={() => setIsSignup(false)}>
                  {t('login-now')}
                </Button>
              </p>
            ) : (
              <p className="text-sm text-center">
                {t('need-account')}
                <Button variant="link" onClick={() => setIsSignup(true)}>
                  {t('signup')}
                </Button>
              </p>
            )}
          </div>
        </CardContent>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Separator className="flex-1" />
        </div>
        <CardFooter className="flex-col gap-2">
          <div className="flex w-full flex-col gap-3">
            {map(['github', 'google'], (auth: Providers) => (
              <Button
                key={auth}
                className="w-full"
                variant="outline"
                disabled={oauthLoading || emailLoading}
                onClick={() => handleOAuthLogin(auth)}
              >
                <>
                  {oauthLoading ? <Spinner /> : auth === 'github' ? <GithubIcon /> : <GoogleIcon />}
                  {t(auth)}
                </>
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}