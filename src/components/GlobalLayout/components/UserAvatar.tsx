/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-01 09:02:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-10 17:43:14
 * @Description: 用户头像
 */
import { useRouter } from '@bprogress/next/app';
import { CircleAlert, IdCard, LogOut, User } from 'lucide-react';
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
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarIndicator,
  AvatarStatus,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Spinner
} from '@/components/ui';
import { LAYOUT_MODE } from '@/enums';
import { useControlledState } from '@/hooks/use-controlled-state';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';
import { useAppStore } from '@/store/useAppStore';

const UserAvatar: FC = () => {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const layoutMode = useAppStore((state) => state.layoutMode);
  // 是否侧栏布局
  const isSidebarLayout = layoutMode === LAYOUT_MODE.SIDEBAR;
  // 获取登录用户信息
  const { user, loading } = useSupabaseUser();
  const tR = useTranslations('Route');
  const tC = useTranslations('Common');
  const t = useTranslations('Components.Layout');
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
      await supabase.auth.signOut().then(() => {
        setIsOpen(false);
        // 跳转登录页面
        router.push('/login');
      })
    } finally {
      setLogoutLoading(false);
    }
  }

  return loading ? (
    <div className="w-full flex justify-center items-center">
      <Spinner variant='circle' className="size-4" />
    </div>
  ) : (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 w-full">
            <Avatar className="size-8">
              <AvatarImage
                alt="Online User"
                src={avatar}
              />
              <AvatarFallback className="text-primary bg-primary/10">
                <User />
              </AvatarFallback>
              <AvatarIndicator className="-end-1.5 -bottom-1.5">
                <AvatarStatus variant="online" className="size-2.5" />
              </AvatarIndicator>
            </Avatar>
            {isSidebarLayout ? (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {name}
                </span>
                <span className="truncate text-xs">
                  {user?.email}
                </span>
              </div>
            ) : null}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  alt="Online User"
                  src={avatar}
                />
                <AvatarFallback className="text-primary bg-primary/10">
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2 min-w-0">
                <p className="font-medium text-sm leading-none">{name}</p>
                <p className="text-muted-foreground text-xs leading-none overflow-hidden text-ellipsis whitespace-nowrap">
                  {user?.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/personal-center')}>
            <IdCard />
            <span>{tR('personal-center')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(true)} variant="destructive">
            <LogOut />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* 确认弹窗 */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CircleAlert className="size-5 text-blue-500" />
              <AlertDialogTitle>{tC('warm-tips')}</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{t('logout-comfirm')}</AlertDialogDescription>
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