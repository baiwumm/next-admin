/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-10 09:29:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-20 16:34:30
 * @Description: 多语言切换
 */
'use client';

import { cn, Tooltip } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { setLocale } from '@/i18n';
import { type Locale, locales } from '@/i18n/config';

export default function LangSwitch() {
  const t = useTranslations('Pages');
  const [ZH, EN] = locales;
  const locale = useLocale();
  const isZh = locale === ZH;

  // 切换语言
  function onChangeLang(value: Locale) {
    const locale = value as Locale;
    setLocale(locale);
  }
  return (
    <Tooltip showArrow content={isZh ? t('internationalization.zh') : t('internationalization.en')} placement="bottom">
      <Button variant="ghost" size="icon" onClick={() => onChangeLang(isZh ? EN : ZH)}>
        <span className={cn('rotate-0 scale-100 transition-all duration-300', !isZh ? '-rotate-90 scale-0' : '')}>
          中
        </span>
        <span
          className={cn('absolute rotate-90 scale-0 transition-all duration-300', !isZh ? 'rotate-0 scale-100' : '')}
        >
          En
        </span>
        <span className="sr-only">Toggle Lang</span>
      </Button>
    </Tooltip>
  );
}
