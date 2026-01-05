# Next.js 博客项目

这是一个使用 Next.js 16 和 Supabase 构建的现代化博客系统。

## 功能特性

- ✅ 文章展示和详情页
- ✅ 分类和标签筛选
- ✅ 全文搜索
- ✅ 文章创建和编辑
- ✅ Markdown 支持
- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ SEO 优化
- ✅ 浏览量统计

## 技术栈

- **前端**: Next.js 16 (App Router) + React 19 + TypeScript
- **样式**: Tailwind CSS 4
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 3. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL Editor 中执行 `supabase-schema.sql` 创建表结构
3. （可选）执行 `supabase-seed.sql` 添加示例数据

### 4. 配置环境变量

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 文件，填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目结构

```
├── app/                    # Next.js 页面
│   ├── admin/             # 管理后台
│   ├── posts/             # 文章详情
│   ├── category/          # 分类页面
│   └── tag/               # 标签页面
├── components/            # React 组件
├── lib/                   # 工具库
│   ├── api.ts            # Supabase API 封装
│   ├── supabase.ts       # Supabase 客户端
│   └── utils.ts          # 工具函数
├── supabase-schema.sql   # 数据库表结构
└── supabase-seed.sql     # 初始数据
```

## 核心功能

### 文章管理

- **创建文章**: 访问 `/admin/posts/new`
- **编辑文章**: 访问 `/admin/posts/edit/[id]`
- **管理后台**: 访问 `/admin`

### 文章展示

- **首页**: 展示所有文章
- **文章详情**: `/posts/[slug]`
- **分类筛选**: `/category/[slug]`
- **标签筛选**: `/tag/[slug]`
- **搜索**: `/search?q=关键词`

## 文档

- [Supabase 设置指南](./SUPABASE_SETUP.md) - 详细的 Supabase 配置说明
- [架构说明](./ARCHITECTURE.md) - 项目架构和设计文档
- [数据迁移指南](./scripts/migrate-mock-to-supabase.md) - Mock 数据迁移说明

## 数据库表结构

- `authors` - 作者信息
- `categories` - 文章分类
- `tags` - 文章标签
- `posts` - 文章内容
- `post_tags` - 文章标签关联（多对多）

详细的表结构请查看 `supabase-schema.sql`。

## 开发指南

### 添加新功能

1. 在 `lib/api.ts` 中添加 API 函数
2. 创建或修改页面组件
3. 更新类型定义（如需要）

### 修改样式

项目使用 Tailwind CSS，可以直接在组件中使用 Tailwind 类名。

### 数据库迁移

如果需要修改数据库结构：

1. 在 Supabase SQL Editor 中执行 SQL
2. 更新 `lib/supabase.ts` 中的类型定义
3. 更新相关的 API 函数

## 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署

### 其他平台

项目可以部署到任何支持 Next.js 的平台，如 Netlify、Railway 等。

## 常见问题

### 无法连接到 Supabase

- 检查 `.env.local` 文件是否正确配置
- 确认 Supabase 项目 URL 和 key 是否正确

### 无法创建文章

- 检查 Supabase RLS 策略是否正确设置
- 确认用户已登录（如果启用了认证）

### 图片无法显示

- 检查图片 URL 是否有效
- 确认 Next.js Image 组件配置正确

更多问题请查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 的故障排除部分。

## 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

## 许可证

MIT
