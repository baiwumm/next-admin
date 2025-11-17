/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 09:59:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 09:18:55
 * @Description: 登录页
 */
"use client";
import { addToast, Button, Card, CardBody, CardFooter, CardHeader, Divider, Form, Image, Input, Link } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { track } from '@vercel/analytics';
import { upperFirst } from 'es-toolkit'
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import { type FormEvent, useState } from "react";

import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

type AllowedPropertyValues = Parameters<typeof track>[1];

export default function Login() {
  const supabase = getSupabaseBrowserClient()
  const router = useRouter()
  const t = useTranslations('Pages.Login');
  const [emailLoading, setEmailLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (isSignup) {
      const { error } = await supabase.auth.signUp(data as { email: string; password: string; });
      track('Signup', data as AllowedPropertyValues);
      if (error) {
        addToast({
          title: t('signup-error'),
          description: error.message,
          color: 'danger'
        });
      } else {
        addToast({
          title: t('signup-success'),
          color: 'success'
        });
        form.reset() // ✅ 清空表单
        setIsSignup(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword(data as { email: string; password: string; });
      track('Login', data as AllowedPropertyValues);
      if (error) {
        addToast({
          title: t('login-error'),
          description: error.message,
          color: 'danger'
        });
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
      addToast({
        title: t('error'),
        description: error.message,
        color: 'danger'
      });
    }
    setOauthLoading(false)
    track('Provider', { provider: upperFirst(provider) });
  }

  return (
    <div className="w-full max-w-md p-4">
      <Card radius='md'>
        <CardHeader>
          <div className="flex justify-center items-center gap-3">
            <Image
              src="/logo.svg"
              width={42}
              height={42}
              alt="Logo"
            />
            <div className="flex flex-col">
              <p className="text-lg font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</p>
              <p className="text-small text-default-500">{process.env.NEXT_PUBLIC_APP_DESC}</p>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleEmailLogin}>
            <Input
              isRequired
              label={t('emial')}
              name="email"
              placeholder={t('emial-placeholder')}
              type="email"
              variant="bordered"
              isClearable
              labelPlacement='outside'
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="text-default-400 pointer-events-none text-2xl"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="text-default-400 pointer-events-none text-2xl"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label={t('password')}
              name="password"
              placeholder={t('password-placeholder')}
              type={isVisible ? "text" : "password"}
              variant="bordered"
              labelPlacement='outside'
            />
            <div className="flex justify-end items-center w-full">
              {isSignup ? (
                <p className="text-small text-center">
                  {t('has-account')}&nbsp;
                  <Link size="sm" onPress={() => setIsSignup(false)} className="cursor-pointer">
                    {t('login-now')}
                  </Link>
                </p>
              ) : (
                <p className="text-small text-center">
                  {t('need-account')}&nbsp;
                  <Link size="sm" onPress={() => setIsSignup(true)} className="cursor-pointer">
                    {t('signup')}
                  </Link>
                </p>
              )}
            </div>
            <Button className="w-full" color="primary" type="submit" isLoading={emailLoading} isDisabled={oauthLoading}>
              {t(isSignup ? 'register' : 'submit')}
            </Button>
          </Form>
        </CardBody>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <CardFooter>
          <div className="flex flex-col gap-2 w-full">
            <Button
              startContent={<Icon className="text-default-500" icon="devicon:github" width={24} />}
              variant="ghost"
              onPress={() => handleOAuthLogin('github')}
              isLoading={oauthLoading}
              isDisabled={emailLoading}
            >
              {t('github')}
            </Button>
            <Button
              startContent={<Icon icon="flat-color-icons:google" width={24} />}
              variant="ghost"
              onPress={() => handleOAuthLogin('google')}
              isLoading={oauthLoading}
              isDisabled={emailLoading}
            >
              {t('google')}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

