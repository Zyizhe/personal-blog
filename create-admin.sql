-- 创建管理员账号的 SQL 脚本
-- 注意：这个脚本需要在 Supabase SQL Editor 中执行

-- 方法 1: 使用 Supabase Auth Admin API（推荐）
-- 在 Supabase Dashboard 中：
-- 1. 进入 Authentication > Users
-- 2. 点击 "Add user" 按钮
-- 3. 输入邮箱: admin@example.com
-- 4. 输入密码: admin123456
-- 5. 勾选 "Auto Confirm User"
-- 6. 点击 "Create user"

-- 方法 2: 如果需要通过 SQL 创建（需要先获取用户 ID）
-- 步骤 1: 先通过注册页面或 Supabase Dashboard 创建用户
-- 步骤 2: 获取用户 ID 后，创建对应的 author 记录

-- 示例：假设用户 ID 是 'user-uuid-here'，创建 author 记录
-- INSERT INTO authors (id, name, avatar, bio)
-- VALUES (
--   'user-uuid-here',  -- 替换为实际的用户 ID
--   '管理员',
--   'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
--   '网站管理员'
-- );

-- 方法 3: 临时禁用 RLS 以便测试（仅用于开发环境）
-- 警告：这会让任何人都可以创建文章，仅用于测试！
-- ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE authors DISABLE ROW LEVEL SECURITY;

-- 测试完成后记得重新启用：
-- ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- 方法 4: 修改 RLS 策略，允许任何认证用户创建文章（推荐用于开发）
-- 删除原有的严格策略
DROP POLICY IF EXISTS "认证用户可更新自己的文章" ON posts;
DROP POLICY IF EXISTS "认证用户可删除自己的文章" ON posts;

-- 创建更宽松的策略（开发环境）
CREATE POLICY "认证用户可更新文章" ON posts FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "认证用户可删除文章" ON posts FOR DELETE 
  USING (auth.role() = 'authenticated');

-- 允许认证用户管理 authors 表
CREATE POLICY "认证用户可插入作者" ON authors FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "认证用户可更新作者" ON authors FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- 允许认证用户管理 categories 和 tags
CREATE POLICY "认证用户可插入分类" ON categories FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "认证用户可更新分类" ON categories FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "认证用户可插入标签" ON tags FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "认证用户可更新标签" ON tags FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- 允许认证用户管理文章标签关联
CREATE POLICY "认证用户可插入文章标签" ON post_tags FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "认证用户可删除文章标签" ON post_tags FOR DELETE 
  USING (auth.role() = 'authenticated');

-- 注意：以上策略适用于开发环境
-- 生产环境建议使用更严格的权限控制
