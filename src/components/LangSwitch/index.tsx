/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 09:29:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-10 17:21:58
 * @Description: 多语言切换
 */
'use client';

import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { setLocale } from '@/i18n';
import { type Locale, locales } from '@/i18n/config';

export default function LangSwitch() {
  const [ZH, EN] = locales;
  const locale = useLocale();

  // 切换语言
  function onChangeLang(value: Locale) {
    const locale = value as Locale;
    setLocale(locale);
  }
  return (
    <Button variant="ghost" size="icon" onClick={() => onChangeLang(locale === ZH ? EN : ZH)}>
      {locale === ZH ? '中' : 'EN'}
      <span className="sr-only">Toggle Lang</span>
    </Button>
  );
}
