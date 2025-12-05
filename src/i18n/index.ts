'use server';

import { cookies } from 'next/headers';

import { INTL_LOCALES } from '@/enums'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value as typeof INTL_LOCALES.valueType || INTL_LOCALES.ZH;
}

export async function setLocale(locale: typeof INTL_LOCALES.valueType) {
  (await cookies()).set(COOKIE_NAME, locale);
}
