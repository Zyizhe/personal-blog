-- Supabase 初始数据种子文件
-- 基于 mock-data.ts 的数据

-- 插入作者数据
INSERT INTO authors (id, name, avatar, bio) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '张三', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan', '前端开发工程师，专注于 React 和 Next.js'),
  ('550e8400-e29b-41d4-a716-446655440002', '李四', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi', '全栈开发工程师，热爱技术分享'),
  ('550e8400-e29b-41d4-a716-446655440003', '王五', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu', 'UI/UX 设计师，关注用户体验');

-- 插入分类数据
INSERT INTO categories (id, name, slug, description) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '前端开发', 'frontend', '关于前端技术的最新文章'),
  ('650e8400-e29b-41d4-a716-446655440002', '后端开发', 'backend', '服务器端开发相关文章'),
  ('650e8400-e29b-41d4-a716-446655440003', '全栈开发', 'fullstack', '全栈开发实践和思考'),
  ('650e8400-e29b-41d4-a716-446655440004', '设计', 'design', 'UI/UX 设计相关文章');

-- 插入标签数据
INSERT INTO tags (id, name, slug) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 'React', 'react'),
  ('750e8400-e29b-41d4-a716-446655440002', 'Next.js', 'nextjs'),
  ('750e8400-e29b-41d4-a716-446655440003', 'TypeScript', 'typescript'),
  ('750e8400-e29b-41d4-a716-446655440004', 'Node.js', 'nodejs'),
  ('750e8400-e29b-41d4-a716-446655440005', 'CSS', 'css'),
  ('750e8400-e29b-41d4-a716-446655440006', 'JavaScript', 'javascript'),
  ('750e8400-e29b-41d4-a716-446655440007', 'Vue', 'vue'),
  ('750e8400-e29b-41d4-a716-446655440008', 'Python', 'python');

-- 插入文章数据
INSERT INTO posts (id, title, slug, excerpt, content, cover_image, author_id, category_id, published_at, read_time, views, is_published) VALUES
  (
    '850e8400-e29b-41d4-a716-446655440001',
    'Next.js 14 新特性详解',
    'nextjs-14-features',
    '探索 Next.js 14 带来的新功能和改进，包括 Server Components、App Router 等',
    '# Next.js 14 新特性详解

Next.js 14 带来了许多令人兴奋的新特性和改进。本文将深入探讨这些新功能。

## Server Components

Server Components 是 Next.js 14 的核心特性之一。它们允许你在服务器端渲染组件，减少客户端 JavaScript 的加载量。

```tsx
// app/components/ServerComponent.tsx
export default async function ServerComponent() {
  const data = await fetch(''https://api.example.com/data'');
  return <div>{/* 渲染数据 */}</div>;
}
```

## App Router

App Router 提供了更灵活的路由系统，支持嵌套布局、并行路由等高级功能。

## 性能优化

Next.js 14 在性能方面做了大量优化，包括更快的构建速度和更好的运行时性能。

## 总结

Next.js 14 是一个重要的版本更新，为开发者提供了更好的开发体验和性能。',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    '550e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440001',
    '2024-01-15T10:00:00Z',
    5,
    1234,
    true
  );

-- 插入文章标签关联
INSERT INTO post_tags (post_id, tag_id) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001'),
  ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440002'),
  ('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440003');
