# 🚀 快速开始指南

5 分钟内启动你的博客系统！

## 前置要求

- Node.js 18+ 
- npm 或 pnpm
- Supabase 账号（免费）

## 步骤 1: 安装依赖 (1 分钟)

```bash
npm install
# 或
pnpm install
```

## 步骤 2: 创建 Supabase 项目 (2 分钟)

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 创建新项目（记住数据库密码）
4. 等待项目初始化完成

## 步骤 3: 设置数据库 (1 分钟)

1. 在 Supabase 控制台，点击左侧 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase-schema.sql` 的全部内容
4. 粘贴并点击 "Run" 执行
5. 再次新建查询，复制 `supabase-seed.sql` 内容并执行（添加示例数据）

## 步骤 4: 配置环境变量 (30 秒)

1. 在 Supabase 控制台，点击左侧 "Settings" → "API"
2. 复制 "Project URL" 和 "anon public" key
3. 在项目根目录创建 `.env.local` 文件：

```bash
cp .env.local.example .env.local
```

4. 编辑 `.env.local`，填入你的配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 步骤 5: 启动项目 (30 秒)

```bash
npm run dev
# 或
pnpm dev
```

## 🎉 完成！

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

你应该能看到：
- ✅ 首页显示文章列表
- ✅ 导航栏有"写文章"按钮
- ✅ 可以点击文章查看详情

## 🎯 下一步

### 创建你的第一篇文章

1. 点击导航栏的"写文章"按钮
2. 填写文章信息：
   - 标题：例如 "我的第一篇文章"
   - 摘要：简短描述
   - 内容：使用 Markdown 格式
   - 选择分类和标签
3. 勾选"立即发布"
4. 点击"创建文章"

### 访问管理后台

访问 [http://localhost:3000/admin](http://localhost:3000/admin) 查看所有文章。

## ⚠️ 遇到问题？

### 问题 1: 看不到文章列表

**原因**: 数据库中没有数据或数据未发布

**解决**:
```sql
-- 在 Supabase SQL Editor 中执行
SELECT * FROM posts WHERE is_published = true;
```

如果没有结果，执行 `supabase-seed.sql` 添加示例数据。

### 问题 2: 无法连接 Supabase

**原因**: 环境变量配置错误

**解决**:
1. 检查 `.env.local` 文件是否存在
2. 确认 URL 和 Key 是否正确
3. 重启开发服务器

### 问题 3: 创建文章失败

**原因**: RLS 策略限制

**临时解决**（仅用于开发）:
```sql
-- 在 Supabase SQL Editor 中执行
-- 临时禁用 posts 表的 RLS（仅用于测试）
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
```

**正式解决**: 设置 Supabase 认证（参考 SUPABASE_SETUP.md）

## 📚 更多资源

- [完整设置指南](./SUPABASE_SETUP.md)
- [项目架构说明](./ARCHITECTURE.md)
- [设置检查清单](./CHECKLIST.md)
- [改动总结](./CHANGES_SUMMARY.md)

## 💡 提示

### 使用 Markdown 编写文章

文章内容支持 Markdown 格式，例如：

```markdown
# 一级标题

## 二级标题

这是一段文字，支持 **粗体** 和 *斜体*。

- 列表项 1
- 列表项 2

\`\`\`javascript
// 代码块
console.log('Hello World');
\`\`\`
```

### 添加封面图片

使用免费图片服务：
- [Unsplash](https://unsplash.com) - 高质量免费图片
- [Pexels](https://pexels.com) - 免费图片和视频

复制图片 URL 粘贴到"封面图片 URL"字段。

### 自定义分类和标签

在 Supabase Table Editor 中：
1. 打开 `categories` 或 `tags` 表
2. 点击 "Insert row" 添加新记录
3. 填写 name 和 slug（URL 友好的标识符）

## 🎨 自定义样式

项目使用 Tailwind CSS，可以直接修改组件中的类名来调整样式。

例如，修改主题色：
- 蓝色 → `blue-600`
- 绿色 → `green-600`
- 紫色 → `purple-600`

## 🚀 部署到生产环境

### 使用 Vercel（推荐）

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 添加环境变量（与 .env.local 相同）
6. 点击 "Deploy"

几分钟后，你的博客就上线了！

## ✅ 检查清单

- [ ] 依赖已安装
- [ ] Supabase 项目已创建
- [ ] 数据库表已创建
- [ ] 示例数据已添加
- [ ] 环境变量已配置
- [ ] 开发服务器已启动
- [ ] 可以访问首页
- [ ] 可以查看文章详情
- [ ] 可以创建新文章

全部完成？恭喜你！🎉

## 🆘 需要帮助？

如果遇到任何问题：

1. 查看 [CHECKLIST.md](./CHECKLIST.md) 确认所有步骤
2. 查看 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 的故障排除部分
3. 检查浏览器控制台的错误信息
4. 检查 Supabase 控制台的日志

祝你使用愉快！✨
