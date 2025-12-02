/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-28 17:26:18
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 14:42:13
 * @Description: 登录页面
 */
"use client";
import { useRouter } from '@bprogress/next/app';
import { Button, Card, FieldError, Form, Input, Label, Link, Separator, Spinner, TextField } from '@heroui/react';
import { Icon } from '@iconify/react';
import { track } from '@vercel/analytics';
import { upperFirst } from 'es-toolkit';
import { map } from 'es-toolkit/compat'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

type AllowedPropertyValues = Parameters<typeof track>[1];

type Providers = 'github' | 'google';

type FormData = {
  email: string;
  password: string;
}

export default function Login() {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const t = useTranslations('Pages.Login');
  const [emailLoading, setEmailLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  // 是否注册
  const [isSignup, setIsSignup] = useState(false);

  // 表单提交
  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // 判断是注册还是登录
    if (isSignup) {
      const { error } = await supabase.auth.signUp(data as FormData);
      track('Signup', data as AllowedPropertyValues);
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
      const { error } = await supabase.auth.signInWithPassword(data as FormData);
      track('Login', data as AllowedPropertyValues);
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
      <Card className="shadow-xl rounded-xl">
        <Card.Header>
          <div className="flex items-center gap-3">
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
        </Card.Header>
        <Separator />
        <Card.Content>
          <Form className="flex flex-col gap-4" onSubmit={handleEmailLogin}>
            <TextField
              name="email"
              type="email"
              isRequired
            >
              <Label>{t('email')}</Label>
              <Input className="w-full" placeholder={t('email-placeholder')} />
              <FieldError />
            </TextField>
            <TextField
              minLength={6}
              name="password"
              type="password"
              isRequired
            >
              <Label>{t('password')}</Label>
              <Input type="password" className="w-full" placeholder={t('password-placeholder')} />
              <FieldError />
            </TextField>
            <div className="flex justify-end items-center w-full">
              {isSignup ? (
                <p className="text-small text-center">
                  {t('has-account')}&nbsp;
                  <Link onPress={() => setIsSignup(false)} className="cursor-pointer">
                    {t('login-now')}
                  </Link>
                </p>
              ) : (
                <p className="text-small text-center">
                  {t('need-account')}&nbsp;
                  <Link onPress={() => setIsSignup(true)} className="cursor-pointer">
                    {t('signup')}
                  </Link>
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" isPending={emailLoading} isDisabled={oauthLoading}>
              {({ isPending }) => (
                <>
                  {isPending ? <Spinner color="current" size="sm" /> : <Icon icon="ri:check-line" className="text-lg" />}
                  {isPending ? t('login-in') : t(isSignup ? 'register' : 'submit')}
                </>
              )}
            </Button>
          </Form>
        </Card.Content>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Separator className="flex-1" />
        </div>
        <Card.Footer>
          <div className="flex w-full flex-col gap-3">
            {map(['github', 'google'], (auth: Providers) => (
              <Button
                key={auth}
                className="w-full"
                variant="tertiary"
                isPending={oauthLoading}
                isDisabled={emailLoading}
                onPress={() => handleOAuthLogin(auth)}
              >
                {({ isPending }) => (
                  <>
                    {isPending ? <Spinner color="current" size="sm" /> : <Icon icon={`devicon:${auth}`} className="text-lg" />}
                    {t(auth)}
                  </>
                )}
              </Button>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}