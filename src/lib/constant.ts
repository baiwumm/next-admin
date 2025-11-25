import { type Variants } from "framer-motion";

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

/**
 * @description: 路由动画
 */
export const ROUTE_TRANSITION = {
  BLUR_SLIDE: 'blurSlide',
  FADE: 'fade',
  BLUR: 'blur',
  SLIDE: 'slide',
  ZOOM: 'zoom',
  SWING: 'swing',
  FLIP: 'flip',
  SLIDE_UP: 'slideUp',
  DIAGONAL: 'diagonal'
} as const;
export type RouteTransitionValue = typeof ROUTE_TRANSITION[keyof typeof ROUTE_TRANSITION];

/**
 * @description: 所有动画的集合
 */
export const AllTransitions: Record<RouteTransitionValue, Variants> = {
  // 默认动画，左右模糊渐变
  [ROUTE_TRANSITION.BLUR_SLIDE]: {
    hidden: { opacity: 0, x: 20, filter: 'blur(10px)' },
    enter: { opacity: 1, x: 0, filter: 'blur(0)' },
    exit: { opacity: 0, x: -20, filter: 'blur(10px)' },
  },
  // 淡入淡出 (Fade In / Fade Out)
  [ROUTE_TRANSITION.FADE]: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  // 模糊渐变（Blur Fade In）/
  [ROUTE_TRANSITION.BLUR]: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    enter: { opacity: 1, filter: 'blur(0)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
  },
  // 右侧淡入，左侧淡出（Slide In / Slide Out）
  [ROUTE_TRANSITION.SLIDE]: {
    hidden: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  // 从小到大（Zoom In）
  [ROUTE_TRANSITION.ZOOM]: {
    // 页面开始时很小并透明
    hidden: { opacity: 0, scale: 0.8 },
    // 页面放大到正常尺寸
    enter: { opacity: 1, scale: 1 },
    // 页面退出时缩小并淡出
    exit: { opacity: 0, scale: 0.8 },
  },
  // 左右摆动（Swing In）
  [ROUTE_TRANSITION.SWING]: {
    hidden: { opacity: 0, rotate: -45, x: -20 },
    enter: { opacity: 1, rotate: 0, x: 0 },
    exit: { opacity: 0, rotate: 45, x: 20 },
  },
  // 翻转效果（Flip In / Flip Out）
  [ROUTE_TRANSITION.FLIP]: {
    hidden: { opacity: 0, rotateY: 90 },
    enter: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90 },
  },
  // 向上滑动 (Slide Up) - 页面向上推出/拉入
  [ROUTE_TRANSITION.SLIDE_UP]: {
    hidden: { opacity: 0, y: 100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
  // 对角线动画（Diagonal In / Out）
  [ROUTE_TRANSITION.DIAGONAL]: {
    hidden: { opacity: 0, x: 100, y: -100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: 100 },
  }
}

/**
 * @description: 色彩风格
 */
export const COLOR_STYLE = {
  DEFAULT: 'default',
  GREY: 'grey',
  INVERT: 'invert'
} as const;
export type ColorStyleValue = typeof COLOR_STYLE[keyof typeof COLOR_STYLE];