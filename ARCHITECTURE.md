# 项目架构说明

## 技术栈

- **前端框架**: Next.js 16 (App Router)
- **UI 框架**: React 19
- **样式**: Tailwind CSS 4
- **语言**: TypeScript 5
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth

## 项目结构

```
.
├── app/                          # Next.js App Router 页面
│   ├── admin/                    # 管理后台
│   │   ├── page.tsx             # 文章列表管理
│   │   └── posts/
│   │       ├── new/             # 创建新文章
│   │       └── edit/[id]/       # 编辑文章
│   ├── category/[slug]/         # 分类页面
│   ├── posts/[slug]/            # 文章详情页
│   ├── search/                  # 搜索页面
│   ├── tag/[slug]/              # 标签页面
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
│
├── components/                   # React 组件
│   ├── Footer.tsx               # 页脚
│   ├── Header.tsx               # 导航栏（含"写文章"入口）
│   ├── MarkdownContent.tsx      # Markdown 渲染
│   ├── PostCard.tsx             # 文章卡片
│   └── SearchBar.tsx            # 搜索栏
│
├── lib/                         # 工具库
│   ├── api.ts                   # Supabase API 封装
│   ├── mock-data.ts             # Mock 数据（类型定义）
│   ├── supabase.ts              # Supabase 客户端配置
│   └── utils.ts                 # 工具函数
│
├── public/                      # 静态资源
├── scripts/                     # 脚本文件
│   └── migrate-mock-to-supabase.md
│
├── supabase-schema.sql          # 数据库表结构
├── supabase-seed.sql            # 初始数据
├── SUPABASE_SETUP.md            # Supabase 设置指南
└── ARCHITECTURE.md              # 本文件
```

## 数据流

### 读取数据流程

```
用户请求 → Next.js 页面 → lib/api.ts → Supabase → PostgreSQL
                                              ↓
                                         返回数据
                                              ↓
                                    组件渲染 → 用户界面
```

### 写入数据流程

```
用户提交表单 → 客户端组件 → lib/api.ts → Supabase Auth 验证
                                              ↓
                                         RLS 策略检查
                                              ↓
                                         写入 PostgreSQL
                                              ↓
                                         返回结果
```

## 核心功能模块

### 1. 文章展示模块

**文件**: `app/page.tsx`, `app/posts/[slug]/page.tsx`

**功能**:
- 展示文章列表
- 文章详情页
- 相关文章推荐
- 浏览量统计

### 2. 分类和标签模块

**文件**: `app/category/[slug]/page.tsx`, `app/tag/[slug]/page.tsx`

**功能**:
- 按分类筛选文章
- 按标签筛选文章
- 分类导航

### 3. 搜索模块

**文件**: `app/search/page.tsx`, `components/SearchBar.tsx`

**功能**:
- 全文搜索
- 实时搜索建议

### 4. 文章管理模块

**文件**: `app/admin/`

**功能**:
- 创建文章
- 编辑文章
- 删除文章
- 文章列表管理
- 草稿/发布状态管理

## 数据库设计

### ER 图

```
┌─────────────┐
│   authors   │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐      ┌──────────────┐
│    posts    │──────│  categories  │
└──────┬──────┘ N:1  └──────────────┘
       │
       │ N:M
       │
┌──────▼──────┐      ┌──────────────┐
│  post_tags  │──────│     tags     │
└─────────────┘      └──────────────┘
```

### 关系说明

- **authors → posts**: 一对多（一个作者可以写多篇文章）
- **categories → posts**: 一对多（一个分类包含多篇文章）
- **posts ↔ tags**: 多对多（通过 post_tags 关联表）

## API 层设计

### lib/api.ts

提供统一的数据访问接口，封装 Supabase 查询逻辑。

**主要函数**:

```typescript
// 读取操作
getPosts()                    // 获取所有文章
getPostBySlug(slug)          // 获取单篇文章
getPostsByCategory(slug)     // 按分类获取
getPostsByTag(slug)          // 按标签获取
searchPosts(query)           // 搜索文章

// 写入操作
createPost(post)             // 创建文章
updatePost(id, post)         // 更新文章
deletePost(id)               // 删除文章
incrementPostViews(slug)     // 增加浏览量
```

## 安全策略

### Row Level Security (RLS)

1. **公开读取**: 所有用户可以读取已发布的文章
2. **认证写入**: 只有登录用户可以创建文章
3. **作者权限**: 用户只能编辑/删除自己的文章
4. **管理员权限**: 管理员可以管理所有内容

### 环境变量

敏感信息通过环境变量管理：

```env
NEXT_PUBLIC_SUPABASE_URL=...      # Supabase 项目 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=... # 匿名访问密钥
```

## 性能优化

### 1. 数据库层面

- 为常用查询字段添加索引（slug, published_at 等）
- 使用全文搜索索引优化搜索性能
- 合理使用 JOIN 减少查询次数

### 2. 应用层面

- Next.js 静态生成（SSG）用于文章详情页
- 服务端渲染（SSR）用于动态内容
- 图片优化（Next.js Image 组件）

### 3. 缓存策略

- Supabase 自动缓存
- Next.js 路由缓存
- CDN 缓存静态资源

## 扩展性考虑

### 未来可添加的功能

1. **评论系统**: 添加 comments 表
2. **点赞功能**: 添加 likes 表
3. **用户关注**: 添加 follows 表
4. **文章收藏**: 添加 bookmarks 表
5. **草稿自动保存**: 使用 localStorage 或数据库
6. **图片上传**: 集成 Supabase Storage
7. **SEO 优化**: 添加 sitemap 和 robots.txt
8. **RSS 订阅**: 生成 RSS feed
9. **多语言支持**: 使用 i18n
10. **数据分析**: 集成 Google Analytics

### 表结构扩展示例

```sql
-- 评论表
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 点赞表
CREATE TABLE likes (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);
```

## 部署架构

### 推荐部署方案

```
┌─────────────┐
│   Vercel    │  ← Next.js 应用
└──────┬──────┘
       │
       │ API 调用
       │
┌──────▼──────┐
│  Supabase   │  ← 数据库 + 认证 + 存储
└─────────────┘
```

### 部署步骤

1. 在 Supabase 创建项目并配置数据库
2. 在 Vercel 部署 Next.js 应用
3. 配置环境变量
4. 设置自定义域名（可选）

## 开发工作流

### 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入 Supabase 配置

# 3. 启动开发服务器
npm run dev
```

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 组件使用函数式写法
- 使用 async/await 处理异步操作

## 故障排查

### 常见问题

1. **无法连接 Supabase**: 检查环境变量配置
2. **RLS 策略错误**: 检查用户权限和策略设置
3. **图片加载失败**: 检查图片 URL 和 Next.js Image 配置
4. **构建失败**: 检查 TypeScript 类型错误

### 日志查看

- **客户端**: 浏览器控制台
- **服务端**: Vercel 日志或本地终端
- **数据库**: Supabase 日志面板

## 维护建议

1. **定期备份**: 定期备份 Supabase 数据库
2. **监控性能**: 使用 Supabase 监控工具
3. **更新依赖**: 定期更新 npm 包
4. **安全审计**: 定期检查安全漏洞
5. **代码审查**: 重要功能需要代码审查
