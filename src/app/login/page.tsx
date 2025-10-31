/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-31 09:59:17
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-10-31 17:36:59
 * @Description: 登录页
 */
"use client";
import { addToast, Button, Divider, Form, Input } from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import React from "react";

export default function Login() {
  const t = useTranslations('Pages.Login');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    addToast({
      title: t('toast-title', { email: data.email as string }),
      description: t('toast-description')
    });
  };

  // 谷歌登录
  const googleLogin = () => {
    addToast({
      title: t('toast-description')
    });
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
      <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
        <Input
          isRequired
          label={t('emial')}
          name="email"
          placeholder={t('emial-placeholder')}
          type="email"
          variant="bordered"
          isClearable
        />
        <Button className="w-full" color="primary" type="submit">
          {t('submit')}
        </Button>
      </Form>
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="text-tiny text-default-500 shrink-0">OR</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          startContent={<Icon icon="flat-color-icons:google" width={24} />}
          variant="bordered"
          onPress={googleLogin}
        >
          {t('google')}
        </Button>
        <Button
          startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
          variant="bordered"
        >
          {t('github')}
        </Button>
      </div>
    </div>
  );
}

