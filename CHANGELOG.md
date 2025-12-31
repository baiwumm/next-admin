# Changelog

## [2.6.11](///compare/2.6.10...2.6.11) (2025-12-31)

### Features

* **playground:** 新增“Masonry”瀑布流模块 2722140

## [2.6.10](///compare/2.6.9...2.6.10) (2025-12-31)

### Features

* 优化菜单接口调用时机 bffd6f2
* **About:** 新增“项目信息” 1e564b9
* **About:** 新增《关于》模块 26d3ed9
* **playground:** 新增“Terminal”终端模块 303d333

## [2.6.9](///compare/2.6.8...2.6.9) (2025-12-30)

### Features

* **playground:** 新增“code-block”代码模块 ec8ea32
* **proxy:** 非登录状态不允许调用接口 eebb0c7

### Performance Improvements

* **layout:** 布局逻辑优化 1996f9d

## [2.6.8](///compare/2.6.7...2.6.8) (2025-12-29)

### Features

* **Dashboard:** 新增《待办事项》看板 563406b

## [2.6.7](///compare/2.6.6...2.6.7) (2025-12-26)

### Features

* 添加 SEO 数据文件 45671d8

## [2.6.6](///compare/2.6.5...2.6.6) (2025-12-26)

### Features

* **Dashboard:** 新增 SaleStatistics 销售统计卡片 bf3cb02
* **Portfolio:** 新增 Github 贡献日历组件 4c3e021

## [2.6.5](///compare/2.6.4...2.6.5) (2025-12-25)

### Features

* **Dashboard:** 新增 CodeTimeCard 代码时间统计组件 9f1b1d8
* **Dashboard:** 新增统计卡片 aa7e3eb
* Halo 文章列表添加只发布的文章 eb1c0e3

### Performance Improvements

* **config:** 使用 remotePatterns 代替 domains 476b33a

## [2.6.4](///compare/2.6.3...2.6.4) (2025-12-22)

### Features

* **Portfolio:** 完善《个人档案》模块信息 c9dcc92

## [2.6.3](///compare/2.6.2...2.6.3) (2025-12-19)

### Features

* 新增 Scrollspy 组件 7027b60
* **Portfolio:** 新增 《近期文章》模块 6158c0b

### Performance Improvements

* 修改主体内容最小高度计算逻辑 6c5fdf4
* **Portfolio:** 优化数据展示 7f48378

## [2.6.2](///compare/2.6.1...2.6.2) (2025-12-18)

### Features

* 新增 ProgressCircle 和 BackTop 组件 88afb07
* **Portfolio:** 添加 Github 日历贡献图表 8950d3d
* **proxy:** 修改中间件逻辑 9296ab5
* **proxy:** 中间件过滤媒体文件 cc90012

## [2.6.1](///compare/2.6.0...2.6.1) (2025-12-17)

### Features

* 新增 ScrollProgress 滚动进度条 df71609
* 优化 中间件 逻辑，优化《个人档案》模块 1ab40db
* **PersonalCenter:** 完成《个人中心》模块的功能开发 509d2da

### Performance Improvements

* **BreadcrumbContainer:** 移除 motion 废弃的 API 061d64e
* **Portfolio:** 优化页面显示和用户体验 8fba512

## [2.6.0](///compare/2.5.0...2.6.0) (2025-12-15)

### Features

* 新增 Alert 组件，优化登录提示 45c182c
* **MenuManage:** 删除不用的引用 229e64c
* **MenuManage:** 完成菜单管理模块的 CURD 逻辑 e9db0aa
* **MenuManage:** 完成菜单管理模块的排版布局 6a1f014
* **MenuManage:** 细节优化 0efdcbb
* **MenuManage:** 新增 FormDialog 表单 9e5cc65
* **UserManage:** 细节优化 8b1c286
* **UserManage:** 邮箱支持复制 813108a

### Bug Fixes

* 修复菜单跳转动画重复的问题，多级菜单渲染逻辑优化，细节调整 9e0ef72

### Performance Improvements

* 优化菜单高亮逻辑，处理路由不在菜单上显示的逻辑 c445d21
* 优化路由标题显示逻辑 e3cbe93

## [2.5.0](///compare/2.4.1...2.5.0) (2025-12-11)

### Features

* **UserManage:** 完成用户管理模块的功能 acfc755

### Performance Improvements

* 新增 DataGrid 组件，优化组件 12f0dd2
* **UserAvatar:** 优化头像显示 a8bb3de

## [2.4.1](///compare/2.4.0...2.4.1) (2025-12-09)

### Features

* 完成点击按钮刷新页面的功能 f58a44f
* 新增 BreadcrumbContainer 面包屑组件 929d046

## [2.4.0](///compare/2.3.4...2.4.0) (2025-12-09)

### Features

* 新增侧边栏布局 42d9868

## [2.3.4](///compare/2.3.3...2.3.4) (2025-12-08)

### Features

* 测试路由动画 4851806
* **AppSettings:** 新增 RouteTranstion 路由过渡效果配置 f5d4587
* **AppSettings:** 新增 TabsStyle 标签风格配置 b525a69
* update next c996ffd

### Performance Improvements

* 引入 RippleButton 涟漪波纹按钮，优化 Button 引入方式 dfadca3
* 优化 ui 组件路劲导入 702dc4f
* 优化主体内容最小高度显示 6f86d6e

## [2.3.3](///compare/2.3.2...2.3.3) (2025-12-05)

### Features

* **AppSettings:** 新增 DynamicTabs 标签页和相关配置 a800813

## [2.3.2](///compare/2.3.1...2.3.2) (2025-12-05)

### Features

* **layout:** 优化页面标题显示 c2acce0
* **ui:** 新增 checkbox 和 table 组件 6968c9a

### Performance Improvements

* 优化 enum 枚举文件结构 a350835
* 优化 typings 类型文件结构，优化 eslint 报红提示 05af22a
* **login:** 优化登录交互体验 bb10b29

## [2.3.1](///compare/2.3.0...2.3.1) (2025-12-04)

### Features

* **Navbar:** 新增 MobileMenu 组件，优化菜单在不同设备下的兼容问题 faf25bb

## [2.3.0](///compare/2.2.1...2.3.0) (2025-12-04)

### Features

* **AppSettings:** 新增 ColorStyles 色彩风格选择组件 27d1701
* **AppSettings:** 新增 PrimaryColorPicker 主题色选择组件 0e12acf
* **AppSettings:** 新增 ShowFooter 是否显示底部组件 f4f63e3
* **AppSettings:** 新增 ThemeToggle 主题切换组件 af6011b
* **AppSettings:** 新增 ThemeToggleDirection 主题切换动画方向组件 dc7414c
* **layout:** 新增 meta 版本信息 ff70c1c
* **MenuContainer:** 完成顶部菜单的功能开发 3fb37e3
* **PrimaryColorPicker:** 增加主题色切换动画 8040e5f
* **Spinner:** 更新加载样式 aa4c404

### Performance Improvements

* 样式细节优化 83de371

## [2.2.1](///compare/2.2.0...2.2.1) (2025-12-03)

### Performance Improvements

* 去除 @iconify/react 包 b154875

## [2.2.0](///compare/2.1.0...2.2.0) (2025-12-03)

### Features

* 新增 enum-plus，优化变量枚举方式，细节完善 f02819e

### Performance Improvements

* 去除 es-toolkit 包 6a22593

## [2.1.0](///compare/2.0.0...2.1.0) (2025-12-02)

### Features

* 新增刚需资源 f2d70a1
* 新增刚需资源 db7e7e2
* **components:** 新增 FullScreen 全屏组件 fb4e970
* **Login:** 完成登录页页面的功能开发 bb2b218

## [2.0.0](///compare/1.10.3...2.0.0) (2025-11-28)

### Features

* 添加统计代码 12b1cbb

### Performance Improvements

* 细节优化调整 3d52393
