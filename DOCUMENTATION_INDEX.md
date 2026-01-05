# 📚 文档索引

本项目的完整文档指南。根据你的需求选择合适的文档。

## 🎯 我想...

### 快速开始
👉 [QUICK_START.md](./QUICK_START.md) - 5 分钟快速启动指南

### 了解项目
👉 [README.md](./README.md) - 项目概述和基本信息

### 设置 Supabase
👉 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - 详细的 Supabase 配置指南

### 检查设置是否正确
👉 [CHECKLIST.md](./CHECKLIST.md) - 逐步检查清单

### 了解项目架构
👉 [ARCHITECTURE.md](./ARCHITECTURE.md) - 技术架构和设计文档

### 查看所有改动
👉 [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - 完整的改动列表

### 迁移 Mock 数据
👉 [scripts/migrate-mock-to-supabase.md](./scripts/migrate-mock-to-supabase.md) - 数据迁移指南

## 📖 文档分类

### 入门文档

| 文档 | 用途 | 阅读时间 |
|------|------|----------|
| [QUICK_START.md](./QUICK_START.md) | 快速启动项目 | 5 分钟 |
| [README.md](./README.md) | 项目概述 | 3 分钟 |
| [CHECKLIST.md](./CHECKLIST.md) | 设置检查清单 | 10 分钟 |

### 配置文档

| 文档 | 用途 | 阅读时间 |
|------|------|----------|
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Supabase 详细配置 | 15 分钟 |
| [.env.local.example](./.env.local.example) | 环境变量模板 | 1 分钟 |

### 技术文档

| 文档 | 用途 | 阅读时间 |
|------|------|----------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 项目架构说明 | 20 分钟 |
| [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) | 改动总结 | 10 分钟 |

### 数据库文档

| 文件 | 用途 | 说明 |
|------|------|------|
| [supabase-schema.sql](./supabase-schema.sql) | 数据库表结构 | 创建所有表和索引 |
| [supabase-seed.sql](./supabase-seed.sql) | 示例数据 | 添加初始数据 |
| [scripts/migrate-mock-to-supabase.md](./scripts/migrate-mock-to-supabase.md) | 数据迁移 | Mock 数据迁移指南 |

## 🎓 学习路径

### 初学者路径

1. **开始**: [QUICK_START.md](./QUICK_START.md)
   - 快速启动项目
   - 创建第一篇文章

2. **理解**: [README.md](./README.md)
   - 了解项目功能
   - 熟悉项目结构

3. **配置**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - 深入了解 Supabase 配置
   - 设置认证和权限

4. **验证**: [CHECKLIST.md](./CHECKLIST.md)
   - 确认所有功能正常
   - 测试各项功能

### 开发者路径

1. **架构**: [ARCHITECTURE.md](./ARCHITECTURE.md)
   - 理解项目架构
   - 了解数据流

2. **改动**: [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md)
   - 查看所有改动
   - 了解实现细节

3. **数据库**: [supabase-schema.sql](./supabase-schema.sql)
   - 理解表结构
   - 学习 RLS 策略

4. **扩展**: [ARCHITECTURE.md](./ARCHITECTURE.md) 的扩展性部分
   - 添加新功能
   - 优化性能

## 🔍 按主题查找

### Supabase 相关

- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - 完整设置指南
- [supabase-schema.sql](./supabase-schema.sql) - 数据库结构
- [supabase-seed.sql](./supabase-seed.sql) - 示例数据
- [lib/supabase.ts](./lib/supabase.ts) - 客户端配置
- [lib/api.ts](./lib/api.ts) - API 封装

### 文章管理相关

- [app/admin/page.tsx](./app/admin/page.tsx) - 管理后台
- [app/admin/posts/new/page.tsx](./app/admin/posts/new/page.tsx) - 创建文章
- [app/admin/posts/edit/[id]/page.tsx](./app/admin/posts/edit/[id]/page.tsx) - 编辑文章

### 前端展示相关

- [app/page.tsx](./app/page.tsx) - 首页
- [app/posts/[slug]/page.tsx](./app/posts/[slug]/page.tsx) - 文章详情
- [components/Header.tsx](./components/Header.tsx) - 导航栏
- [components/PostCard.tsx](./components/PostCard.tsx) - 文章卡片

## 📋 常见任务

### 任务：首次设置项目

1. [QUICK_START.md](./QUICK_START.md) - 快速开始
2. [CHECKLIST.md](./CHECKLIST.md) - 验证设置

### 任务：添加新功能

1. [ARCHITECTURE.md](./ARCHITECTURE.md) - 了解架构
2. [lib/api.ts](./lib/api.ts) - 添加 API 函数
3. 创建新页面或组件

### 任务：部署到生产环境

1. [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 的部署部分
2. [CHECKLIST.md](./CHECKLIST.md) 的部署检查
3. [README.md](./README.md) 的部署说明

### 任务：故障排查

1. [QUICK_START.md](./QUICK_START.md) 的问题解决部分
2. [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 的故障排除
3. [CHECKLIST.md](./CHECKLIST.md) 的常见问题

## 🎯 推荐阅读顺序

### 第一次使用

```
QUICK_START.md → README.md → CHECKLIST.md
```

### 深入学习

```
ARCHITECTURE.md → SUPABASE_SETUP.md → CHANGES_SUMMARY.md
```

### 开发新功能

```
ARCHITECTURE.md → lib/api.ts → 相关组件代码
```

## 💡 文档使用技巧

### 搜索功能

在 VS Code 中：
- 按 `Cmd/Ctrl + Shift + F` 全局搜索
- 搜索关键词如 "RLS", "认证", "部署" 等

### 快速导航

在 VS Code 中：
- 按 `Cmd/Ctrl + P` 快速打开文件
- 输入文件名如 "quick" 快速找到 QUICK_START.md

### Markdown 预览

在 VS Code 中：
- 按 `Cmd/Ctrl + Shift + V` 预览 Markdown
- 或点击右上角的预览图标

## 📞 获取帮助

### 文档中找不到答案？

1. 检查 [CHECKLIST.md](./CHECKLIST.md) 的常见问题部分
2. 查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 的故障排除
3. 查看浏览器控制台的错误信息
4. 查看 Supabase 控制台的日志

### 外部资源

- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)

## 🔄 文档更新

本文档索引会随着项目更新而更新。如果添加了新文档，请在此处添加链接。

---

**提示**: 建议将此文档加入书签，方便快速查找所需文档。

最后更新: 2026-01-05
