# Supabase 集成设置指南

本文档介绍如何将项目与 Supabase 集成，实现动态博客功能。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建账号
2. 创建新项目
3. 记录项目的 URL 和 anon key

## 2. 设置数据库

### 2.1 执行数据库架构

在 Supabase 控制台的 SQL Editor 中执行 `supabase-schema.sql` 文件中的 SQL 语句。

这将创建以下表：
- `authors` - 作者表
- `categories` - 分类表
- `tags` - 标签表
- `posts` - 文章表
- `post_tags` - 文章标签关联表

### 2.2 添加初始数据（可选）

执行 `supabase-seed.sql` 文件中的 SQL 语句，添加示例数据。

### 2.3 创建浏览量增加函数

在 SQL Editor 中执行以下 SQL，创建增加浏览量的函数：

```sql
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 3. 配置环境变量

1. 复制 `.env.local.example` 为 `.env.local`
2. 填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. 安装依赖

```bash
npm install
# 或
pnpm install
```

## 5. 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

## 6. 功能说明

### 6.1 查看文章

访问 `http://localhost:3000` 查看所有已发布的文章。

### 6.2 创建文章

1. 点击导航栏的"写文章"按钮
2. 访问 `/admin/posts/new`
3. 填写文章信息并提交

**注意**：需要先在 Supabase 中设置认证，或者临时修改 RLS 策略以允许匿名创建。

### 6.3 编辑文章

访问 `/admin/posts/edit/[文章ID]` 编辑现有文章。

## 7. 认证设置（推荐）

为了保护文章创建和编辑功能，建议设置 Supabase 认证：

### 7.1 启用邮箱认证

在 Supabase 控制台的 Authentication > Providers 中启用 Email 认证。

### 7.2 创建认证组件

创建登录/注册组件，使用 Supabase Auth：

```typescript
import { supabase } from '@/lib/supabase';

// 注册
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// 登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// 登出
await supabase.auth.signOut();
```

### 7.3 保护管理页面

在 `app/admin` 下的页面中添加认证检查：

```typescript
useEffect(() => {
  checkAuth();
}, []);

async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    router.push('/login');
  }
}
```

## 8. 数据库表结构说明

### authors（作者表）
- `id`: UUID 主键
- `name`: 作者名称
- `avatar`: 头像 URL
- `bio`: 个人简介

### categories（分类表）
- `id`: UUID 主键
- `name`: 分类名称
- `slug`: URL 友好的标识符
- `description`: 分类描述

### tags（标签表）
- `id`: UUID 主键
- `name`: 标签名称
- `slug`: URL 友好的标识符

### posts（文章表）
- `id`: UUID 主键
- `title`: 文章标题
- `slug`: URL 友好的标识符
- `excerpt`: 文章摘要
- `content`: 文章内容（Markdown 格式）
- `cover_image`: 封面图片 URL
- `author_id`: 作者 ID（外键）
- `category_id`: 分类 ID（外键）
- `published_at`: 发布时间
- `updated_at`: 更新时间
- `read_time`: 预计阅读时间（分钟）
- `views`: 浏览量
- `is_published`: 是否已发布

### post_tags（文章标签关联表）
- `post_id`: 文章 ID（外键）
- `tag_id`: 标签 ID（外键）

## 9. API 函数说明

在 `lib/api.ts` 中提供了以下函数：

- `getPosts()` - 获取所有已发布文章
- `getPostBySlug(slug)` - 根据 slug 获取文章
- `getPostsByCategory(categorySlug)` - 获取分类下的文章
- `getPostsByTag(tagSlug)` - 获取标签下的文章
- `searchPosts(query)` - 搜索文章
- `getCategories()` - 获取所有分类
- `getTags()` - 获取所有标签
- `createPost(post)` - 创建文章
- `updatePost(id, post)` - 更新文章
- `deletePost(id)` - 删除文章
- `incrementPostViews(slug)` - 增加文章浏览量

## 10. 从 Mock 数据迁移到 Supabase

### 10.1 更新现有页面

将现有页面中的 mock 数据导入替换为 API 调用：

```typescript
// 之前
import { posts } from '@/lib/mock-data';

// 之后
import { getPosts } from '@/lib/api';

export default async function Page() {
  const posts = await getPosts();
  // ...
}
```

### 10.2 保留 Mock 数据作为备份

可以保留 `lib/mock-data.ts` 文件作为类型定义和开发参考。

## 11. 故障排除

### 问题：无法连接到 Supabase

- 检查 `.env.local` 文件是否正确配置
- 确认 Supabase 项目 URL 和 key 是否正确
- 检查网络连接

### 问题：无法创建文章

- 检查 RLS 策略是否正确设置
- 确认用户已登录（如果启用了认证）
- 查看浏览器控制台的错误信息

### 问题：文章列表为空

- 确认数据库中有已发布的文章（`is_published = true`）
- 检查 SQL 查询是否正确执行
- 查看 Supabase 控制台的日志

## 12. 生产部署建议

1. **启用 RLS**：确保所有表都启用了行级安全策略
2. **设置认证**：保护管理功能，只允许授权用户访问
3. **备份数据**：定期备份 Supabase 数据库
4. **监控性能**：使用 Supabase 的监控工具跟踪性能
5. **优化查询**：为常用查询添加索引
6. **CDN 配置**：使用 CDN 加速图片和静态资源

## 13. 下一步

- 添加评论功能
- 实现文章草稿功能
- 添加文章搜索优化
- 实现文章点赞功能
- 添加作者管理页面
- 实现分类和标签管理
