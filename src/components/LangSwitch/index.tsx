/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:43:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-03 10:11:17
 * @Description: 国际化
 */
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { setLocale } from '@/i18n';
import { INTL_LOCALES } from '@/enums'

export default function LangSwitch() {
  const locale = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" aria-label="LangSwitch" variant="ghost" className="rounded-full">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        {INTL_LOCALES.items.map(({ label, value, raw }) => (
          <DropdownMenuCheckboxItem key={value} checked={locale === value} onCheckedChange={() => setLocale(value)}>
            <span>{raw.prefix}</span>
            <span>{label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}