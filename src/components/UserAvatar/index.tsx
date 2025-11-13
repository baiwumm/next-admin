/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-06 16:59:11
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-12 14:59:36
 * @Description: 用户头像
 */
import {
  addToast,
  Avatar,
  type AvatarProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  User
} from "@heroui/react";
import { Icon } from '@iconify-icon/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FC, useState } from 'react';

import { useSupabaseUser } from '@/hooks/useSupabaseUser'
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser'
import { useAppStore } from '@/store/useAppStore';

const UserAvatar: FC = () => {
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  // 获取登录用户信息
  const { user, loading } = useSupabaseUser();
  const tR = useTranslations('Route');
  const t = useTranslations('Components.Header');
  // 注销 Loading
  const [logoutLoading, setLogoutLoading] = useState(false);
  const isMobile = useAppStore((s) => s.isMobile);

  // 退出登录
  const handleLogout = async () => {
    setLogoutLoading(true);
    const { error } = await supabase.auth.signOut()
    if (error) {
      addToast({
        title: t('logout-error'),
        description: error.message,
        color: 'danger'
      });
    } else {
      // 登出后跳转登录页
      router.replace('/login')
    }
    setLogoutLoading(false);
  }

  const name = user?.user_metadata.name || user?.user_metadata.user_name || t('anonymous-user');
  // 用户头像属性
  const avatarProps: AvatarProps = {
    showFallback: true,
    name,
    src: user?.user_metadata.avatar_url as string,
    color: 'primary'
  }
  return loading || logoutLoading ? (
    <Spinner size="sm" label={logoutLoading ? t('logout-loading') : t('user-loading')} />
  ) : (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        {isMobile ? (
          <Avatar {...avatarProps} />
        ) : (
          <User
            className="transition-transform cursor-pointer ml-2"
            name={name}
            description={user?.email}
            avatarProps={avatarProps}
          />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="settings" startContent={<Icon icon='mdi:card-account-details-outline' />}>{tR('personal-center')}</DropdownItem>
        <DropdownItem key="logout" startContent={<Icon icon="mdi:logout" />} onPress={handleLogout}>
          {t('logout')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default UserAvatar;