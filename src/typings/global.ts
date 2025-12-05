import { INTL_LOCALES } from '@/enums';
import messages from '#/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: typeof INTL_LOCALES.valueType;
    Messages: typeof messages;
  }
}