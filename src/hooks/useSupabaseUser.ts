/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-03 11:05:09
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-03 15:05:36
 * @Description: 获取用户信息
 */
'use client'
import { addToast } from "@heroui/react";
import type { User } from '@supabase/supabase-js'
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react'

import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser'

export function useSupabaseUser() {
  const t = useTranslations('Pages.Login');
  const supabase = getSupabaseBrowserClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (mounted) {
        if (error) {
          addToast({
            title: t('user-error'),
            description: error.message,
            color: 'danger'
          });
          setUser(null)
        } else {
          setUser(user)
        }
        setLoading(false)
      }
    }

    initUser()

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.subscription.unsubscribe()
    }
  }, [supabase, t])

  return { user, loading }
}
