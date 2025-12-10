/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-10-30 17:43:44
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-10 16:00:41
 * @Description: 国际化
 */
import { Languages } from 'lucide-react';
import { useLocale } from 'next-intl';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui';
import { INTL_LOCALES } from '@/enums'
import { setLocale } from '@/i18n';

export default function LangSwitch() {
  const locale = useLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button mode="icon" aria-label="LangSwitch" variant="dashed" radius="full" size='sm'>
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