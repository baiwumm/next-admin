/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.
import zh from './messages/zh.json';

type Messages = typeof zh;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages { }
}