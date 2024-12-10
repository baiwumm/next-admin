import { getRequestConfig } from 'next-intl/server';

import { getLocale } from '@/i18n';

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
