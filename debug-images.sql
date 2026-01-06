-- 检查数据库中的图片 URL
-- 在 Supabase SQL Editor 中执行此脚本

-- 查看所有文章的封面图片 URL
SELECT 
  id,
  title,
  cover_image,
  CASE 
    WHEN cover_image IS NULL THEN '❌ NULL'
    WHEN cover_image = '' THEN '❌ 空字符串'
    WHEN cover_image LIKE 'http://%' THEN '⚠️ HTTP (不安全)'
    WHEN cover_image LIKE 'https://%' THEN '✅ HTTPS'
    ELSE '❓ 其他格式'
  END as url_status,
  LENGTH(cover_image) as url_length
FROM posts
ORDER BY created_at DESC;

-- 统计图片 URL 状态
SELECT 
  CASE 
    WHEN cover_image IS NULL THEN 'NULL'
    WHEN cover_image = '' THEN '空字符串'
    WHEN cover_image LIKE 'http://%' THEN 'HTTP'
    WHEN cover_image LIKE 'https://%' THEN 'HTTPS'
    ELSE '其他'
  END as status,
  COUNT(*) as count
FROM posts
GROUP BY status;
