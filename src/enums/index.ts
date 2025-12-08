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
  ZH: { value: 'zh', label: '简体中文', prefix: "🇨🇳" },
  EN: { value: 'en', label: 'English', prefix: "🇺🇸" }
});

/**
 * @description: 主题色
 */
export const THEME_PRIMARY_COLOR = Enum({
  DEFAULT: { value: 'default', label: 'Default', color: 'oklch(0.205 0 0)' },
  AMBER_MINIMAL: { value: 'amber-minimal', label: 'Amber', color: 'oklch(0.7686 0.1647 70.0804)' },
  AMETHYST_HAZE: { value: 'amethyst-haze', label: 'Amethyst', color: 'oklch(0.6104 0.0767 299.7335)' },
  CANDYLAND: { value: 'candyland', label: 'Candyland', color: 'oklch(0.8677 0.0735 7.0855)' },
  DARKMATTER: { value: 'darkmatter', label: 'Darkmatter', color: 'oklch(0.6716 0.1368 48.5130)' },
  ELEGANT_LUXURY: { value: 'elegant-luxury', label: 'Elegant', color: 'oklch(0.4650 0.1470 24.9381)' },
  SAGE_GARDEN: { value: 'sage-garden', label: 'Garden', color: 'oklch(0.6333 0.0309 154.9039)' },
  SUPABASE: { value: 'supabase', label: 'Supabase', color: 'oklch(0.8348 0.1302 160.9080)' },
  TWITTER: { value: 'twitter', label: 'Twitter', color: 'oklch(0.6723 0.1606 244.9955)' },
});

/**
 * @description: 主题模式
 */
export const THEME_MODE = Enum({
  LIGHT: { value: 'light', label: 'theme-mode.light', icon: 'sun' },
  DARK: { value: 'dark', label: 'theme-mode.dark', icon: 'moon' },
  SYSTEM: { value: 'system', label: 'theme-mode.system', icon: 'laptop' }
});

/**
 * @description: 主题切换动画方向
 */
export const THEME_MODE_DIRECTION = Enum({
  LTR: { value: 'ltr', label: 'theme-mode.ltr', icon: 'arrow-left-right' },
  RTL: { value: 'rtl', label: 'theme-mode.rtl', icon: 'arrow-right-left' },
  BTT: { value: 'btt', label: 'theme-mode.btt', icon: 'arrow-down-up' },
  TTB: { value: 'ttb', label: 'theme-mode.ttb', icon: 'arrow-up-down' }
});

/**
 * @description: 色彩风格
 */
export const COLOR_STYLE = Enum({
  DEFAULT: { value: 'default', label: 'color-style.default', icon: 'sun' },
  GREY: { value: 'grey', label: 'color-style.grey', icon: 'contrast' },
  INVERT: { value: 'invert', label: 'color-style.invert', icon: 'accessibility' }
});

/**
 * @description: 标签页风格
 */
export const TABS_STYLE = Enum({
  BUTTON: { value: 'button', label: 'tabs-style.button', icon: 'grid-2x2' },
  TAG: { value: 'tag', label: 'tabs-style.tag', icon: 'notebook-tabs' }
});

/**
 * @description: 路由动画
 */
export const ROUTE_TRANSITION = Enum({
  BLUR_SLIDE: { value: 'blur-slide', label: 'route-transition.blur-slide' },
  FADE: { value: 'fade', label: 'route-transition.fade' },
  BLUR_FADE: { value: 'blur-fade', label: 'route-transition.blur-fade' },
  SLIDE_FADE: { value: 'slide-fade', label: 'route-transition.slide-fade' },
  ZOOM: { value: 'zoom', label: 'route-transition.zoom' },
  SWING: { value: 'swing', label: 'route-transition.swing' },
  FLIP: { value: 'flip', label: 'route-transition.flip' },
  SLIDE_UP: { value: 'slide-up', label: 'route-transition.slide-up' },
  DIAGONAL: { value: 'diagonal', label: 'route-transition.diagonal' }
});

/**
 * @description: OAuth Providers
 */
export const OAUTH_PROVIDERS = Enum({
  GOOGLE: { value: 'google', label: 'Google' },
  GITHUB: { value: 'github', label: 'Github' },
})