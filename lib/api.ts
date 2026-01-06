import { supabase } from './supabase';
import type { Post, Author, Category, Tag } from './mock-data';

// 获取所有文章
export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:authors(*),
        category:categories(*),
        tags:post_tags(tag:tags(*))
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data ? data.map(transformPost) : [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

// 根据 slug 获取文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return transformPost(data);
}

// 根据分类获取文章
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      category:categories!inner(*),
      tags:post_tags(tag:tags(*))
    `)
    .eq('category.slug', categorySlug)
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;

  return data.map(transformPost);
}

// 根据标签获取文章
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      category:categories(*),
      tags:post_tags!inner(tag:tags!inner(*))
    `)
    .eq('tags.tag.slug', tagSlug)
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;

  return data.map(transformPost);
}

// 搜索文章
export async function searchPosts(query: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      category:categories(*),
      tags:post_tags(tag:tags(*))
    `)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;

  return data.map(transformPost);
}

// 获取所有分类
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;

  return data.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description || '',
  }));
}

// 根据 slug 获取分类
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || '',
  };
}

// 获取所有标签
export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) throw error;

  return data.map(tag => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
  }));
}

// 根据 slug 获取标签
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
  };
}

// 创建文章
export async function createPost(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_id: string;
  category_id: string;
  tag_ids: string[];
  read_time: number;
  is_published: boolean;
}) {
  const { data: postData, error: postError } = await supabase
    .from('posts')
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || null,
      author_id: post.author_id,
      category_id: post.category_id,
      read_time: post.read_time,
      is_published: post.is_published,
      published_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (postError) throw postError;

  // 添加标签关联
  if (post.tag_ids.length > 0) {
    const { error: tagsError } = await supabase
      .from('post_tags')
      .insert(post.tag_ids.map(tag_id => ({ post_id: postData.id, tag_id })));

    if (tagsError) throw tagsError;
  }

  return postData;
}

// 更新文章
export async function updatePost(id: string, post: Partial<{
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category_id: string;
  tag_ids: string[];
  read_time: number;
  is_published: boolean;
}>) {
  const { tag_ids, ...postData } = post;

  const { error: postError } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id);

  if (postError) throw postError;

  // 更新标签关联
  if (tag_ids) {
    // 删除旧的标签关联
    await supabase.from('post_tags').delete().eq('post_id', id);

    // 添加新的标签关联
    if (tag_ids.length > 0) {
      const { error: tagsError } = await supabase
        .from('post_tags')
        .insert(tag_ids.map(tag_id => ({ post_id: id, tag_id })));

      if (tagsError) throw tagsError;
    }
  }
}

// 删除文章
export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// 增加文章浏览量
export async function incrementPostViews(slug: string) {
  try {
    const { error } = await supabase.rpc('increment_post_views', { post_slug: slug });
    if (error) {
      console.error('Failed to increment views:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error incrementing views:', error);
    return false;
  }
}

// 辅助函数：转换数据库数据为前端格式
function transformPost(data: any): Post {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || '',
    content: data.content,
    coverImage: data.cover_image || '',
    author: {
      id: data.author.id,
      name: data.author.name,
      avatar: data.author.avatar || '',
      bio: data.author.bio || '',
    },
    category: {
      id: data.category.id,
      name: data.category.name,
      slug: data.category.slug,
      description: data.category.description || '',
    },
    tags: data.tags.map((pt: any) => ({
      id: pt.tag.id,
      name: pt.tag.name,
      slug: pt.tag.slug,
    })),
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    readTime: data.read_time,
    views: data.views,
  };
}
