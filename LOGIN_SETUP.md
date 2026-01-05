# 登录功能设置指南

## 🎯 快速开始

### 方法 1: 使用 Supabase Dashboard 创建管理员（推荐）

1. 打开 Supabase 控制台
2. 进入 **Authentication** → **Users**
3. 点击 **"Add user"** 按钮
4. 填写信息：
   - Email: `admin@example.com`
   - Password: `admin123456`
   - 勾选 **"Auto Confirm User"**（自动确认用户）
5. 点击 **"Create user"**
6. 复制生成的 User ID

### 方法 2: 通过注册页面创建账号

1. 启动开发服务器：`npm run dev`
2. 访问 http://localhost:3000/register
3. 填写注册信息：
   - 昵称：管理员
   - 邮箱：admin@example.com
   - 密码：admin123456
   - 确认密码：admin123456
4. 点击"注册"
5. 注册成功后会自动跳转到登录页面

### 方法 3: 修改 RLS 策略（开发环境）

如果你想让任何登录用户都能创建和管理文章（适合开发测试），执行 `create-admin.sql` 文件：

1. 打开 Supabase SQL Editor
2. 复制 `create-admin.sql` 的内容
3. 粘贴并执行

这会修改 RLS 策略，允许所有认证用户管理内容。

## 📝 使用流程

### 1. 注册账号

访问 http://localhost:3000/register

- 填写邮箱和密码
- 系统会自动创建对应的 author 记录
- 注册成功后跳转到登录页

### 2. 登录

访问 http://localhost:3000/login

- 输入邮箱和密码
- 登录成功后跳转到管理后台

### 3. 创建文章

登录后：
- 点击导航栏的"写文章"按钮
- 或访问 http://localhost:3000/admin/posts/new
- 填写文章信息并发布

### 4. 管理文章

- 访问 http://localhost:3000/admin
- 查看所有文章列表
- 编辑或删除文章

### 5. 登出

点击导航栏的"登出"按钮

## 🔐 权限说明

### 当前权限设置（开发环境）

执行 `create-admin.sql` 后：

- ✅ 任何登录用户都可以创建文章
- ✅ 任何登录用户都可以编辑文章
- ✅ 任何登录用户都可以删除文章
- ✅ 任何登录用户都可以管理分类和标签
- ✅ 未登录用户只能查看已发布的文章

### 生产环境建议

在生产环境中，应该使用更严格的权限控制：

```sql
-- 用户只能编辑自己的文章
CREATE POLICY "用户可更新自己的文章" ON posts FOR UPDATE 
  USING (auth.uid()::text = author_id::text);

-- 用户只能删除自己的文章
CREATE POLICY "用户可删除自己的文章" ON posts FOR DELETE 
  USING (auth.uid()::text = author_id::text);
```

## 🎨 界面说明

### 导航栏变化

**未登录时**:
- 显示"登录"按钮

**已登录时**:
- 显示"管理"链接
- 显示"写文章"按钮
- 显示"登出"按钮

### 页面保护

以下页面需要登录才能访问：
- `/admin` - 管理后台
- `/admin/posts/new` - 创建文章
- `/admin/posts/edit/[id]` - 编辑文章

如果未登录访问这些页面，会自动跳转到登录页面。

## 🔧 故障排查

### 问题 1: 注册后无法登录

**原因**: Supabase 可能需要邮箱验证

**解决方案**:
1. 在 Supabase Dashboard 中禁用邮箱验证
2. 进入 **Authentication** → **Settings** → **Email Auth**
3. 关闭 **"Enable email confirmations"**

### 问题 2: 登录后仍然提示"请先登录"

**原因**: RLS 策略限制

**解决方案**:
1. 执行 `create-admin.sql` 文件
2. 或临时禁用 RLS（仅用于开发）

### 问题 3: 创建文章时提示权限错误

**原因**: author_id 与当前用户不匹配

**解决方案**:
1. 确保 authors 表中有对应的记录
2. 检查 author_id 是否与用户 ID 一致

### 问题 4: 注册时提示"创建作者记录失败"

**原因**: authors 表的 RLS 策略限制

**解决方案**:
执行以下 SQL：

```sql
CREATE POLICY "认证用户可插入作者" ON authors FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');
```

## 📊 数据库关系

```
auth.users (Supabase Auth)
    ↓
    │ user.id
    ↓
authors.id (自定义表)
    ↓
    │ author_id
    ↓
posts.author_id (文章表)
```

注册流程：
1. 在 `auth.users` 创建用户
2. 在 `authors` 创建对应记录（使用相同的 ID）
3. 创建文章时使用 `user.id` 作为 `author_id`

## 🎓 测试账号

如果你执行了 `create-admin.sql`，可以使用以下测试账号：

- **邮箱**: admin@example.com
- **密码**: admin123456

或者通过注册页面创建自己的账号。

## 🚀 下一步

1. ✅ 创建管理员账号
2. ✅ 登录系统
3. ✅ 创建第一篇文章
4. ✅ 测试编辑和删除功能
5. 🔜 添加更多功能（见 TODO.md）

## 💡 提示

- 开发环境可以使用宽松的权限策略
- 生产环境务必使用严格的权限控制
- 定期备份数据库
- 使用强密码

---

**相关文档**:
- [QUICK_START.md](./QUICK_START.md) - 快速开始
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Supabase 设置
- [TODO.md](./TODO.md) - 后续功能

**最后更新**: 2026-01-05
