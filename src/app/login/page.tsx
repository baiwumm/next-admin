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

export const GiteeFill = ({ fill = 'currentColor', size = 20 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.59.59 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"
      />
    </svg>
  );
};

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
