/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:43:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 09:18:15
 * @Description: 国际化
 */
import { Icon } from '@iconify/react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { setLocale } from '@/i18n';
import { INTL_LOCALES } from '@/lib/enums'

export default function LangSwitch() {
  const locale = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="LangSwitch" variant="ghost" className="rounded-full">
          <Icon icon='ri:translate-2' className='text-lg' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        {INTL_LOCALES.items.map(({ label, value, raw }) => (
          <DropdownMenuCheckboxItem key={value} checked={locale === value} onCheckedChange={() => setLocale(value)}>
            <Icon className="text-muted size-4 shrink-0" icon={raw.icon} />
            <span>{label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}