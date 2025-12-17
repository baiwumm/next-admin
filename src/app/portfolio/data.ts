export const data = {
  name: process.env.NEXT_PUBLIC_AUTHOR_NAME!,
  description: "一名扎根深圳的前端新手程序员，在互联网行业深耕多年，从最初的兴趣驱动到如今的职业探索，始终保持着对技术的敬畏与热爱",
  avatarUrl: "/me.jpg",
  work: [
    {
      company: "阿里巴巴集团 - 淘天事业部",
      href: "https://www.alibaba.com",
      badges: [],
      title: "高级前端开发工程师",
      logoUrl: "/portfolio/alibaba.png",
      start: "2021.03",
      end: "至今",
      description: "负责淘宝主站“百亿补贴”频道的商家运营平台前端架构与开发，采用 React 18 + TypeScript + qiankun 微前端架构，支持多团队并行开发与独立部署。",
    },
    {
      company: "字节跳动 - 工具链开发",
      href: "https://www.bytedance.com",
      badges: [],
      title: "前端开发专家 - 效率工具与基建方向",
      logoUrl: "/portfolio/bytedance.png",
      start: "2019.07",
      end: "2021.02",
      description: "作为核心开发者，参与打造公司级可视化搭建平台“Orion”，服务内部超 5000 名运营和产品人员。设计并实现 DSL（领域特定语言） 和 Schema 驱动渲染引擎，支持将可视化编排结果一键生成 React/Vue 多框架代码。",
    },
    {
      company: "腾讯集团 - 平台与内容事业群",
      href: "https://www.tencent.com",
      badges: [],
      title: "前端工程师 - 内容与互动方向",
      logoUrl: "/portfolio/tencent.png",
      start: "2017.09",
      end: "2019.06",
      description: "负责 QQ 空间“小世界”（短视频信息流） 频道的前端开发与重构工作。使用 Vue.js 技术栈，深度参与从 Vue 1.x 到 Vue 2.x 的迁移与架构升级。",
    }
  ],
  education: [
    {
      school: "浙江大学",
      href: "https://www.zju.edu.cn",
      degree: "工学学士 (B.Eng.)",
      logoUrl: "/portfolio/zju.png",
      start: "2013.09",
      end: "2017.06",
    },
    {
      school: "华东师范大学",
      href: "https://www.ecnu.edu.cn",
      degree: "工程硕士 (M.Eng.)",
      logoUrl: "/portfolio/ecnu.png",
      start: "2017.09",
      end: "2020.06",
    },
    {
      school: "加州大学伯克利分校",
      href: "https://www.berkeley.edu",
      degree: "工程硕士 (M.Eng.)",
      logoUrl: "/portfolio/berkeley.svg",
      start: "2018.07",
      end: "2018.08",
    },
  ],
  skills: [
    { src: "https://cdn.simpleicons.org/nextdotjs", alt: "Next.js", href: "https://nextjs.org" },
    { src: "https://cdn.simpleicons.org/nuxt", alt: "Nuxt.js", href: "https://nuxt.com" },
    { src: "https://cdn.simpleicons.org/react", alt: "React.js", href: "https://react.dev" },
    { src: "https://cdn.simpleicons.org/vuedotjs", alt: "Vue.js", href: "https://vuejs.org" },
    { src: "https://cdn.simpleicons.org/nestjs", alt: "Nest.js", href: "https://nestjs.com" },
    { src: "https://cdn.simpleicons.org/typescript", alt: "Typescript", href: "https://www.typescriptlang.org" },
    { src: "https://cdn.simpleicons.org/javascript", alt: "Javascript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { src: "https://cdn.simpleicons.org/html5", alt: "Html5", href: "http://html5.com" },
    { src: "https://cdn.simpleicons.org/prisma", alt: "Prisma", href: "https://prisma.yoga" },
    { src: "https://cdn.simpleicons.org/postgresql", alt: "Postgresql", href: "https://www.postgresql.org" },
    { src: "https://cdn.simpleicons.org/vercel", alt: "vercel", href: "https://www.vercel.COM" },
  ],
  projects: [
    {
      title: "谜叶象限",
      href: "https://baiwumm.com",
      description: "每一片叶子，都是未完成的坐标系,架构于 Halo 及增强体验的 THYUU/星度主题",
      tags: ["Halo", "Thyuu", "星度"],
      links: [
        {
          type: "Website",
          href: "https://baiwumm.com",
          icon: "globe",
        }
      ],
      image: "/portfolio/www.png",
    },
    {
      title: "Vue3 Admin",
      href: "https://vue3.baiwumm.com",
      description: "前端基于 Soybean Admin二次开发，后端基于 Nest.js + Prisma 的全栈后台应用",
      tags: [
        "Vue.js",
        "Nest.js",
        "PostgreSQL",
        "Prisma",
        "Vite.js",
        "Ant Design Vue"
      ],
      links: [
        {
          type: "Website",
          href: "https://vue3.baiwumm.com",
          icon: "globe",
        },
        {
          type: "Source",
          href: "https://github.com/baiwumm/vue3-admin",
          icon: "github",
        },
      ],
      image: "/portfolio/vue3.png",
    },
    {
      title: "Dream Site",
      href: "https://site.baiwumm.com",
      description: "一个现代化的个人站点导航系统，旨在为用户提供美观、高效的个人网站收藏与管理体验。无论你是开发者、设计师还是内容创作者，都可以用它来组织和展示你喜爱的网站资源。",
      tags: [
        "Nuxt.js",
        "Supabase",
        "Tailwindcss",
        "Motion",
      ],
      links: [
        {
          type: "Website",
          href: "https://site.baiwumm.com",
          icon: "globe",
        },
        {
          type: "Source",
          href: "https://github.com/baiwumm/dream-site",
          icon: "github",
        },
      ],
      image: "/portfolio/site.png",
    },
    {
      title: "今日热榜",
      href: "https://hot.baiwumm.com",
      description: "一个基于 Next.js 构建的现代化热点聚合平台，实时汇聚各大主流网站的热门内容，为用户提供一站式的热点资讯浏览体验。",
      tags: [
        "Next.js",
        "React.js",
        "HeroUI",
        "Tailwindcss",
      ],
      links: [
        {
          type: "Website",
          href: "https://hot.baiwumm.com",
          icon: "globe",
        },
        {
          type: "Source",
          href: "https://github.com/baiwumm/dream-site",
          icon: "github",
        },
      ],
      image: "/portfolio/hot.png",
    },
    {
      title: "Easy Api",
      href: "https://api.baiwumm.com",
      description: "一个基于 Nuxt 4 构建的简单易用的 API 服务平台，提供多种实用的 API 接口和管理后台",
      tags: [
        "Nuxt.js",
        "Supabase",
        "Tailwindcss",
        "Nuxt UI"
      ],
      links: [
        {
          type: "Website",
          href: "https://api.baiwumm.com",
          icon: "globe",
        }
      ],
      image: "/portfolio/api.png",
    },
    {
      title: "Cover Magic",
      href: "https://cover.baiwumm.com",
      description: "一款专业的封面设计工具，支持实时预览和高质量导出，帮助您轻松创建精美的封面图像。",
      tags: [
        "Vue.js",
        "Native UI",
        "Tailwindcss",
        "Vite.js"
      ],
      links: [
        {
          type: "Website",
          href: "https://cover.baiwumm.com",
          icon: "globe",
        },
        {
          type: "Source",
          href: "https://github.com/baiwumm/cover-magic",
          icon: "github",
        },
      ],
      image: "/portfolio/cover.png",
    },
  ]
}