-- 更新 RLS 策略：确保用户只能删除自己的文章
-- 在 Supabase SQL Editor 中执行此脚本

-- 删除旧的宽松策略
DROP POLICY IF EXISTS "认证用户可删除文章" ON posts;
DROP POLICY IF EXISTS "认证用户可更新文章" ON posts;

-- 创建新的严格策略：只能删除和更新自己的文章
CREATE POLICY "用户只能删除自己的文章" ON posts FOR DELETE 
  USING (auth.uid()::text = author_id::text);

CREATE POLICY "用户只能更新自己的文章" ON posts FOR UPDATE 
  USING (auth.uid()::text = author_id::text);

-- 确保用户可以查看所有已发布的文章（保持不变）
-- 这个策略应该已经存在，如果没有则创建
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'posts' 
    AND policyname = '公开读取已发布文章'
  ) THEN
    CREATE POLICY "公开读取已发布文章" ON posts FOR SELECT 
      USING (is_published = true);
  END IF;
END $$;

-- 确保认证用户可以创建文章（保持不变）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'posts' 
    AND policyname = '认证用户可创建文章'
  ) THEN
    CREATE POLICY "认证用户可创建文章" ON posts FOR INSERT 
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- 验证策略
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'posts'
ORDER BY policyname;
