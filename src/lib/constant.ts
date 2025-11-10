/**
 * @description: 主题
 */
export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

/**
 * @description: 请求状态码
 */
export const RESPONSE_CODE = {
  SUCCESS: 200, // 成功
  ERROR: 500, // 失败
} as const;

/**
 * @description: 请求状态对应的文案
 */
export const RESPONSE_MSG = {
  SUCCESS: '操作成功',
  ERROR: '操作失败',
} as const;

/**
 * @description: 公共文案
 */
export const UNIFORM_TEXT = {
  NULL: '--',
} as const;
