# Mock 数据迁移到 Supabase 指南

本文档说明如何将 `lib/mock-data.ts` 中的数据迁移到 Supabase。

## 方法 1：使用 Supabase SQL Editor（推荐）

已经在 `supabase-seed.sql` 文件中准备好了初始数据，直接在 Supabase SQL Editor 中执行即可。

## 方法 2：使用 Node.js 脚本迁移

如果你想保留完整的 mock 数据，可以创建一个迁移脚本。

### 步骤 1：创建迁移脚本

创建文件 `scripts/migrate.ts`：

```typescript
import { createClient } from '@supabase/supabase-js';
import { authors, categories, tags, posts } from '../lib/mock-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('开始迁移数据...');

  // 1. 迁移作者
  console.log('迁移作者数据...');
  for (const author of authors) {
    const { error } = await supabase.from('authors').insert({
      id: author.id,
      name: author.name,
      avatar: author.avatar,
      bio: author.bio,
    });
    if (error) console.error('作者迁移失败:', author.name, error);
  }

  // 2. 迁移分类
  console.log('迁移分类数据...');
  for (const category of categories) {
    const { error } = await supabase.from('categories').insert({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    if (error) console.error('分类迁移失败:', category.name, error);
  }

  // 3. 迁移标签
  console.log('迁移标签数据...');
  for (const tag of tags) {
    const { error } = await supabase.from('tags').insert({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    });
    if (error) console.error('标签迁移失败:', tag.name, error);
  }

  // 4. 迁移文章
  console.log('迁移文章数据...');
  for (const post of posts) {
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image: post.coverImage,
        author_id: post.author.id,
        category_id: post.category.id,
        published_at: post.publishedAt,
        read_time: post.readTime,
        views: post.views,
        is_published: true,
      })
      .select()
      .single();

    if (postError) {
      console.error('文章迁移失败:', post.title, postError);
      continue;
    }

    // 5. 迁移文章标签关联
    for (const tag of post.tags) {
      const { error: tagError } = await supabase.from('post_tags').insert({
        post_id: post.id,
        tag_id: tag.id,
      });
      if (tagError) console.error('文章标签关联失败:', post.title, tag.name, tagError);
    }
  }

  console.log('数据迁移完成！');
}

migrate().catch(console.error);
```

### 步骤 2：安装 ts-node

```bash
npm install -D ts-node
```

### 步骤 3：运行迁移脚本

```bash
npx ts-node scripts/migrate.ts
```

## 方法 3：手动在 Supabase 控制台添加

1. 打开 Supabase 控制台
2. 进入 Table Editor
3. 逐个表添加数据

### 添加作者

在 `authors` 表中添加：
- 张三
- 李四
- 王五

### 添加分类

在 `categories` 表中添加：
- 前端开发 (frontend)
- 后端开发 (backend)
- 全栈开发 (fullstack)
- 设计 (design)

### 添加标签

在 `tags` 表中添加：
- React, Next.js, TypeScript, Node.js, CSS, JavaScript, Vue, Python

### 添加文章

在 `posts` 表中添加文章，然后在 `post_tags` 表中关联标签。

## 注意事项

1. **UUID 格式**：Supabase 使用 UUID 作为主键，如果 mock 数据中的 ID 不是 UUID 格式，需要转换或让数据库自动生成。

2. **外键约束**：确保先插入被引用的表（authors, categories, tags），再插入引用它们的表（posts, post_tags）。

3. **RLS 策略**：如果启用了行级安全策略，可能需要临时禁用或使用 service role key 进行迁移。

4. **时间戳格式**：确保时间戳格式符合 PostgreSQL 的要求（ISO 8601 格式）。

## 验证迁移

迁移完成后，在 Supabase SQL Editor 中运行以下查询验证：

```sql
-- 检查各表的记录数
SELECT 'authors' as table_name, COUNT(*) as count FROM authors
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
UNION ALL
SELECT 'tags', COUNT(*) FROM tags
UNION ALL
SELECT 'posts', COUNT(*) FROM posts
UNION ALL
SELECT 'post_tags', COUNT(*) FROM post_tags;

-- 检查文章及其关联数据
SELECT 
  p.title,
  a.name as author,
  c.name as category,
  COUNT(pt.tag_id) as tag_count
FROM posts p
LEFT JOIN authors a ON p.author_id = a.id
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN post_tags pt ON p.id = pt.post_id
GROUP BY p.id, p.title, a.name, c.name;
```

## 清理数据（如需重新迁移）

如果需要清空数据重新迁移：

```sql
-- 注意：这会删除所有数据！
TRUNCATE TABLE post_tags CASCADE;
TRUNCATE TABLE posts CASCADE;
TRUNCATE TABLE tags CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE authors CASCADE;
```
