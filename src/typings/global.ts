import { type Locale } from '@/lib/constant'
import messages from '#/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}