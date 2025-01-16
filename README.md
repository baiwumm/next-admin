<p align="center"><img width="100" src="./public/logo.png" alt="Next Admin"></p>
<h1 align="center">Next Admin</h1>
<p align="center">挖掘发现 Next.js 的乐趣所在</p>

## ☘️ 项目简介
[Next Admin](https://next.baiwumm.com/) 是一个基于 [Next.js15](https://nextjs.org/) 从 0 到 1 构建的后台应用程序模板，目的在于学习和探索 [Next.js15](https://nextjs.org/).

- 🍁 技术栈： [Next.js15](https://nextjs.org/)、[NextUI](https://nextui.org/)、[TailwindCSS](https://www.tailwindcss.cn/)、[PostgreSQL](https://www.postgresql.org/)、[Prisma](https://prisma.yoga/)

- 🍂 线上预览： [https://next.baiwumm.com/](https://next.baiwumm.com/)

- [🪹 github 仓库地址](https://github.com/baiwumm/next-admin/)

- [🪺 码云仓库地址](https://gitee.com/baiwumm/next-admin/)

- ❤️ star：**如果可以的话，请顺手给个star，表示对作者的鼓励，万分感谢！**

## 🌿 系统功能设计
1. 国际化语言配置
2. 记录第三方登录平台用户信息
3. 从后台渲染卤肉菜单
4. 前端常见的一些实用的业务功能或者一些有趣的效果

## 🌳 环境和依赖
> 推荐本项目使用 [pnpm](https://github.com/pnpm/pnpm/) 包管理工具
- [Git](https://git-scm.com/) (你需要git来克隆和管理项目版本)
- [Node.js](https://nodejs.org/) (Node.js 版本要求 >= 18.x，推荐 20.8.0 或更高)
- [Pnpm](https://github.com/pnpm/pnpm/) (>= 9.x，推荐最新版本)
- [PostgreSQL](https://www.postgresql.org/) (推荐最新版本)

## 🌴 项目运行
1. 安装 [PostgreSQL](https://www.postgresql.org/) 数据库，修改 `.env` 文件中的数据库配置
```powershell
DATABASE_URL="postgresql://postgres:123456@localhost:5432/next-admin?schema=public"
```

2. 拉取项目代码
```powershell
git clone https://github.com/baiwumm/next-admin.git
cd next-admin
```

3. 安装依赖
```powershell
npm install -g pnpm
pnpm install
```

4. 开发模式运行
```powershell
pnpm dev
```

5. 编译项目
```powershell
pnpm build
```

## 🌱 功能模块

```
- 登录 / 注销

- 仪表盘

- 功能页
  - 验证码
  - 图片预览

- 系统设置
  - 用户管理
  - 菜单管理

- 关于

```

## 🍄 总结
1. 本项目没有经过严格的测试，有可能存在一定的 `Bug`。
2. 本项目仅供学习交流使用，请勿用于商业用途。
3. 欢迎提交 [Issues](https://github.com/baiwumm/next-admin/issues) 和 [PR](https://github.com/baiwumm/next-admin/pulls)，一起完善本项目。

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=baiwumm/next-admin&type=Date)](https://star-history.com/#baiwumm/next-admin&Date)