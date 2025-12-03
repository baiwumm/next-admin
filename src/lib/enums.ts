import { Enum } from 'enum-plus';

/**
 * @description: 请求状态
 */
export const RESPONSE = Enum({
  SUCCESS: { value: 200, label: '请求成功' },
  FAIL: { value: 500, label: '请求失败' }
})

/**
 * @description: 语言配置
 */
export const INTL_LOCALES = Enum({
  ZH: { value: 'zh', label: '简体中文', icon: "flag:cn-4x3" },
  EN: { value: 'en', label: 'English', icon: "flag:um-4x3" }
});

/**
 * @description: 主题模式
 */
export const THEME_MODE = Enum({
  LIGHT: { value: 'light', label: 'theme-mode.light' },
  DARK: { value: 'dark', label: 'theme-mode.dark' },
  SYSTEM: { value: 'system', label: 'theme-mode.system' }
});

/**
 * @description: 色彩风格
 */
export const COLOR_STYLE = Enum({
  DEFAULT: { value: 'default', label: 'color-style.default' },
  GREY: { value: 'grey', label: 'color-style.grey' },
  INVERT: { value: 'invert', label: 'color-style.invert' }
});

/**
 * @description: 标签页风格
 */
export const TABS_STYLE = Enum({
  GOOGLE: { value: 'google', label: 'tabs-style.google' },
  BUTTON: { value: 'button', label: 'tabs-style.button' },
  TAG: { value: 'tag', label: 'tabs-style.tag' }
});

/**
 * @description: 路由动画
 */
export const ROUTE_TRANSITION = Enum({
  BLUR_SLIDE: { value: 'blur-slide', label: 'route-transition.blur-slide' },
  FADE: { value: 'fade', label: 'route-transition.fade' },
  BLUR: { value: 'blur', label: 'route-transition.blur' },
  SLIDE: { value: 'slide', label: 'route-transition.slide' },
  ZOOM: { value: 'zoom', label: 'route-transition.zoom' },
  SWING: { value: 'swing', label: 'route-transition.swing' },
  FLIP: { value: 'flip', label: 'route-transition.flip' },
  SLIDE_UP: { value: 'slide-up', label: 'route-transition.slide-up' },
  DIAGONAL: { value: 'diagonal', label: 'route-transition.diagonal' }
});