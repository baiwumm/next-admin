/**
 * @description: 路由枚举
 */
export enum ROUTES_NAME {
  DASHBOARD = 'dashboard',
  ABOUT = 'about',
  SYSTEM_MANAGE = 'system-manage',
  INTERNATIONALIZATION = 'internationalization',
  FEATURES = 'features',
  VIEWER = 'viewer',
}

/**
 * @description: 请求状态码
 */
export enum RESPONSE_CODE {
  SUCCESS = 200, // 成功
  ERROR = 500, // 失败
}

/**
 * @description: 请求状态对应的文案
 */
export enum RESPONSE_MSG {
  SUCCESS = '操作成功',
  ERROR = '操作失败',
}

/** @description: 公共文案 */
export enum UNIFORM_TEXT {
  NULL = '--',
}

/** @description: localstorage key */
export enum LOCALSTORAGE_KEY {
  TOKEN = 'token',
}

/**
 * @description: 国际化语言
 */
export enum LOCALES {
  zh = 'zh', // 中文
  en = 'en', // 英文
}
