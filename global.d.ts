import zh from './messages/zh.json';

type Messages = typeof zh;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages { }
}