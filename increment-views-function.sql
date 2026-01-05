-- 创建增加文章浏览量的数据库函数
-- 在 Supabase SQL Editor 中执行此文件

-- 创建函数
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE posts
  SET views = views + 1
  WHERE slug = post_slug AND is_published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 测试函数（可选）
-- SELECT increment_post_views('your-post-slug');
-- SELECT slug, views FROM posts WHERE slug = 'your-post-slug';
