-- Supabase 数据库表结构设计
-- 基于项目的 mock 数据结构

-- 1. 作者表 (authors)
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 分类表 (categories)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 标签表 (tags)
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 文章表 (posts)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 文章标签关联表 (post_tags) - 多对多关系
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

-- 创建索引以提高查询性能
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_is_published ON posts(is_published);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);

-- 创建全文搜索索引（用于文章搜索）
-- 使用 simple 配置，适用于多语言内容
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('simple', title || ' ' || excerpt || ' ' || content));

-- 创建更新时间自动更新的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为各表添加自动更新 updated_at 的触发器
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全策略 (RLS)
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略（所有人都可以读取已发布的内容）
CREATE POLICY "公开读取作者" ON authors FOR SELECT USING (true);
CREATE POLICY "公开读取分类" ON categories FOR SELECT USING (true);
CREATE POLICY "公开读取标签" ON tags FOR SELECT USING (true);
CREATE POLICY "公开读取已发布文章" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "公开读取文章标签" ON post_tags FOR SELECT USING (true);

-- 创建认证用户的写入策略（需要登录才能创建/编辑）
CREATE POLICY "认证用户可创建文章" ON posts FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "认证用户可更新自己的文章" ON posts FOR UPDATE 
  USING (auth.uid()::text = author_id::text);

CREATE POLICY "认证用户可删除自己的文章" ON posts FOR DELETE 
  USING (auth.uid()::text = author_id::text);

-- 管理员可以管理所有内容（需要在 Supabase 中设置自定义声明）
CREATE POLICY "管理员可管理作者" ON authors FOR ALL 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "管理员可管理分类" ON categories FOR ALL 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "管理员可管理标签" ON tags FOR ALL 
  USING (auth.jwt() ->> 'role' = 'admin');
