# Supabase 集成检查清单

使用此检查清单确保正确设置 Supabase 集成。

## 📋 设置步骤

### 1. Supabase 项目设置

- [ ] 在 [supabase.com](https://supabase.com) 创建账号
- [ ] 创建新项目
- [ ] 记录项目 URL 和 anon key

### 2. 数据库设置

- [ ] 打开 Supabase SQL Editor
- [ ] 执行 `supabase-schema.sql` 创建表结构
- [ ] 执行 `supabase-seed.sql` 添加示例数据（可选）
- [ ] 创建浏览量增加函数：

```sql
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. 本地项目设置

- [ ] 克隆或下载项目代码
- [ ] 运行 `npm install` 或 `pnpm install`
- [ ] 复制 `.env.local.example` 为 `.env.local`
- [ ] 在 `.env.local` 中填入 Supabase 配置

### 4. 验证设置

- [ ] 运行 `npm run dev` 启动开发服务器
- [ ] 访问 `http://localhost:3000` 查看首页
- [ ] 检查是否能看到文章列表（如果添加了示例数据）
- [ ] 点击"写文章"按钮测试创建功能

### 5. 功能测试

- [ ] 测试文章列表展示
- [ ] 测试文章详情页
- [ ] 测试分类筛选
- [ ] 测试标签筛选
- [ ] 测试搜索功能
- [ ] 测试创建新文章
- [ ] 测试编辑文章
- [ ] 测试删除文章

## 🔧 可选配置

### 认证设置（推荐）

- [ ] 在 Supabase 启用 Email 认证
- [ ] 创建登录/注册页面
- [ ] 在管理页面添加认证检查
- [ ] 测试登录/登出功能

### 图片上传（可选）

- [ ] 在 Supabase 创建 Storage bucket
- [ ] 配置 bucket 权限
- [ ] 实现图片上传功能
- [ ] 更新文章编辑器支持图片上传

### 性能优化（可选）

- [ ] 检查数据库索引是否创建
- [ ] 配置 Next.js 图片优化
- [ ] 启用 CDN（如使用 Vercel）
- [ ] 配置缓存策略

## 🚀 部署检查

### Vercel 部署

- [ ] 将代码推送到 GitHub
- [ ] 在 Vercel 导入项目
- [ ] 配置环境变量（NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY）
- [ ] 部署并测试

### 生产环境检查

- [ ] 确认 RLS 策略已启用
- [ ] 检查所有 API 端点是否正常
- [ ] 测试所有核心功能
- [ ] 检查 SEO 设置
- [ ] 配置自定义域名（可选）

## ⚠️ 常见问题

### 问题：看不到文章列表

**解决方案**:
1. 检查数据库中是否有数据
2. 确认文章的 `is_published` 字段为 `true`
3. 检查浏览器控制台是否有错误

### 问题：无法创建文章

**解决方案**:
1. 检查 RLS 策略是否正确
2. 确认用户已登录（如果启用了认证）
3. 检查表单数据是否完整

### 问题：环境变量不生效

**解决方案**:
1. 确认 `.env.local` 文件在项目根目录
2. 重启开发服务器
3. 检查变量名是否以 `NEXT_PUBLIC_` 开头

## 📚 相关文档

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - 详细设置指南
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 项目架构说明
- [README.md](./README.md) - 项目概述

## ✅ 完成！

如果所有检查项都已完成，你的博客系统应该已经可以正常运行了！

有问题？查看文档或在 GitHub 提 issue。
