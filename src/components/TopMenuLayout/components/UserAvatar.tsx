/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-01 09:02:39
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-01 09:59:46
 * @Description: 用户头像
 */
import { useRouter } from '@bprogress/next/app';
import { AlertDialog, Avatar, Button, Dropdown, Label, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log('dropdownOpen', dropdownOpen)
  // 退出确认弹窗
  const [isOpen, setIsOpen] = useState(false);
  // 用户名称
  const name = user?.user_metadata.name || user?.user_metadata.user_name || t('anonymous-user');
  // 用户头像
  const avatar = user?.user_metadata.avatar_url as string;

  // 退出登录
  const handleLogout = async () => {
    setLogoutLoading(true);
    // 登出
    supabase.auth.signOut().then(() => {
      setLogoutLoading(false);
      setIsOpen(false);
      // 跳转登录页面
      router.push('/login');
    });
  }

  // 渲染退出弹窗
  const LogoutAlert = (
    <AlertDialog.Container isOpen={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Dialog className="sm:w-[400px]">
        <AlertDialog.Header>
          <AlertDialog.Icon status="warning">
            <Icon className="text-lg" icon="ri:error-warning-line" />
          </AlertDialog.Icon>
          <AlertDialog.Heading>确认要退出登录吗?</AlertDialog.Heading>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <Button variant="tertiary" onPress={() => setIsOpen(false)}>
            {tC('cancel')}
          </Button>
          <Button onPress={handleLogout} isPending={logoutLoading}>
            {tC('confirm')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  )

  return loading || logoutLoading ? (
    <Spinner size="sm" color="accent" />
  ) : (
    <>
      <Dropdown isOpen={dropdownOpen} onOpenChange={setDropdownOpen}>
        <Dropdown.Trigger onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar size='sm'>
                <Avatar.Image alt="Online User" src={avatar} />
                <Avatar.Fallback color='accent'>
                  <Icon icon="ri:user-3-line" className="text-lg" />
                </Avatar.Fallback>
              </Avatar>
              <span className="ring-background absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2" />
            </div>
            <div className="flex-col gap-0.5 items-start hidden sm:flex">
              <span className="text-xs font-bold">{name}</span>
              <span className="text-xs text-muted">{user?.email}</span>
            </div>
          </div>
        </Dropdown.Trigger>
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Item id="personal-center" textValue="Personal Center">
              <Icon className="text-muted size-4 shrink-0" icon="mdi:card-account-details-outline" />
              <Label>{tR('personal-center')}</Label>
            </Dropdown.Item>
            <Dropdown.Item id="logout" textValue="Logout" onClick={() => setIsOpen(true)}>
              <Icon className="text-muted size-4 shrink-0" icon="mdi:logout" />
              <Label>{t('logout')}</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
      {/* 退出弹窗 */}
      {LogoutAlert}
    </>
  )
}
export default UserAvatar;