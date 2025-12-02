/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-01 09:02:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 17:46:11
 * @Description: 用户头像
 */
import { useRouter } from '@bprogress/next/app';
import { IdCard, LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type FC, type MouseEvent, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/animate-ui/components/radix/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner";
import { useControlledState } from '@/hooks/use-controlled-state';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

const UserAvatar: FC = () => {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  // 获取登录用户信息
  const { user, loading } = useSupabaseUser();
  const tR = useTranslations('Route');
  const tC = useTranslations('Common');
  const t = useTranslations('Components.TopMenuLayout');
  // 注销 Loading
  const [logoutLoading, setLogoutLoading] = useState(false);
  // 退出确认弹窗
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useControlledState({
    value: false,
  });
  // 用户名称
  const name = user?.user_metadata.name || user?.user_metadata.user_name || t('anonymous-user');
  // 用户头像
  const avatar = user?.user_metadata.avatar_url as string;

  // 退出登录
  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // ⚠️ 阻止 AlertDialogAction 默认关闭行为
    setLogoutLoading(true);
    try {
      // 登出
      supabase.auth.signOut().then(() => {
        setIsOpen(false);
        // 跳转登录页面
        router.push('/login');
      })
    } finally {
      setLogoutLoading(false);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <Avatar>
                <AvatarImage src={avatar} alt="Online User" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <span className="ring-background absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2" />
            </div>
            <div className="flex-col gap-0.5 items-start hidden sm:flex">
              <span className="text-xs font-bold">{name}</span>
              <span className="text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50">
          <DropdownMenuItem onClick={() => router.push('/personal-center')}>
            <IdCard />
            <span>{tR('personal-center')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <LogOut />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 确认弹窗 */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认要退出登录吗?</AlertDialogTitle>
            <AlertDialogDescription>Alert Dialog Description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tC('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} disabled={logoutLoading}>
              {logoutLoading ? <Spinner /> : null}
              {logoutLoading ? t('logout-in') : tC('confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default UserAvatar;