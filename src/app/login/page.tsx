/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-03 15:45:52
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-07 11:08:01
 * @Description: 登录页
 */
import { Button, Card, CardBody, CardHeader, Divider, User } from '@nextui-org/react';
import { RiGithubFill, RiGoogleFill } from '@remixicon/react';

import { signIn } from '@/auth';
import { GiteeFill } from '@/constants/icon';

export default async function Login() {
  return (
    <Card className="w-[400px]">
      <CardHeader className="justify-center">
        <User
          avatarProps={{
            src: '/logo.svg',
          }}
          description={process.env.NEXT_PUBLIC_PROJECT_DESC}
          name={process.env.NEXT_PUBLIC_PROJECT_NAME}
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-3 gap-4">
          <form
            action={async () => {
              'use server';
              await signIn('github', { callbackUrl: '/dashboard' });
            }}
          >
            <Button
              type="submit"
              color="default"
              variant="ghost"
              startContent={<RiGithubFill />}
              className="border w-full"
              size="sm"
            >
              Github
            </Button>
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('gitee', { callbackUrl: '/dashboard' });
            }}
          >
            <Button
              type="submit"
              color="default"
              variant="ghost"
              startContent={<GiteeFill />}
              className="border w-full"
              size="sm"
            >
              Gitee
            </Button>
          </form>
          <form
            action={async () => {
              'use server';
              await signIn('google', { callbackUrl: '/dashboard' });
            }}
          >
            <Button
              type="submit"
              color="default"
              variant="ghost"
              startContent={<RiGoogleFill />}
              className="border w-full"
              size="sm"
            >
              Google
            </Button>
          </form>
        </div>
      </CardBody>
      <div className="relative mt-2 pb-4">
        <Divider className="absolute inset-0 flex items-center" />
        <div className="relative flex justify-center text-xs uppercase -mt-2">
          <span className="bg-content1 px-2 text-muted-foreground text-foreground-400">请选择登录方式</span>
        </div>
      </div>
    </Card>
  );
}
