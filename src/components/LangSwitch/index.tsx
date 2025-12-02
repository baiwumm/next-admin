/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:43:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-02 16:02:10
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
import { type Locale, LOCALES } from '@/lib/constant';

type Option = {
  label: string;
  value: Locale;
  icon: string;
}

export default function LangSwitch() {
  const locale = useLocale();

  const LocaleOptions: Option[] = [
    {
      label: '简体中文',
      value: LOCALES.ZH,
      icon: 'flag:cn-4x3'
    },
    {
      label: 'English',
      value: LOCALES.EN,
      icon: 'flag:um-4x3'
    }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="LangSwitch" variant="ghost" className="rounded-full">
          <Icon icon='ri:translate-2' className='text-lg' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        {LocaleOptions.map(({ label, value, icon }) => (
          <DropdownMenuCheckboxItem key={value} checked={locale === value} onCheckedChange={() => setLocale(value)}>
            <Icon className="text-muted size-4 shrink-0" icon={icon} />
            <span>{label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}