/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 09:59:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-03 14:44:58
 * @Description: 登录页
 */
"use client";
import { addToast, Button, Divider, Form, Input, Link } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from "react";

import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser'

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
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-4">
      <div className="flex justify-center items-center gap-2">
        <Image
          src="/logo.svg"
          width={48}
          height={48}
          alt="Logo"
          className="rounded"
        />
        <div className="flex flex-col">
          <p className="text-xl font-medium">{process.env.NEXT_PUBLIC_APP_NAME}</p>
          <p className="text-small text-default-500">{process.env.NEXT_PUBLIC_APP_DESC}</p>
        </div>
      </div>
      <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleEmailLogin}>
        <Input
          isRequired
          label={t('emial')}
          name="email"
          placeholder={t('emial-placeholder')}
          type="email"
          variant="bordered"
          isClearable
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
        />
        <div className="flex justify-end items-center w-full">
          {isSignup ? (
            <Link size="sm" onPress={() => setIsSignup(false)} className="cursor-pointer">
              {t('login-now')}
            </Link>
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
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="text-tiny text-default-500 shrink-0">OR</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
          variant="bordered"
          onPress={() => handleOAuthLogin('github')}
          isLoading={oauthLoading}
          isDisabled={emailLoading}
        >
          {t('github')}
        </Button>
        <Button
          startContent={<Icon icon="flat-color-icons:google" width={24} />}
          variant="bordered"
          onPress={() => handleOAuthLogin('google')}
          isLoading={oauthLoading}
          isDisabled={emailLoading}
        >
          {t('google')}
        </Button>
      </div>
    </div>
  );
}

