'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updatePost, deletePost } from '@/lib/api';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category_id: '',
    read_time: 5,
    is_published: false,
  });

  useEffect(() => {
    checkAuthAndLoadData();
  }, [id]);

  async function checkAuthAndLoadData() {
    // 检查用户是否登录
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('请先登录');
      router.push('/login');
      return;
    }

    loadData();
  }

  async function loadData() {
    try {
      const [postRes, categoriesRes, tagsRes] = await Promise.all([
        supabase
          .from('posts')
          .select('*, post_tags(tag_id)')
          .eq('id', id)
          .single(),
        supabase.from('categories').select('*').order('name'),
        supabase.from('tags').select('*').order('name'),
      ]);

      if (postRes.data) {
        setFormData({
          title: postRes.data.title,
          slug: postRes.data.slug,
          excerpt: postRes.data.excerpt || '',
          content: postRes.data.content,
          cover_image: postRes.data.cover_image || '',
          category_id: postRes.data.category_id,
          read_time: postRes.data.read_time,
          is_published: postRes.data.is_published,
        });
        setSelectedTags(postRes.data.post_tags.map((pt: any) => pt.tag_id));
      }

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (tagsRes.data) setTags(tagsRes.data);
    } catch (error) {
      console.error('加载数据失败:', error);
      alert('加载数据失败');
    } finally {
      setLoading(false);
    }
  }

  function toggleTag(tagId: string) {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await updatePost(id, {
        ...formData,
        tag_ids: selectedTags,
      });

      alert('文章更新成功！');
      router.push('/');
    } catch (error) {
      console.error('更新文章失败:', error);
      alert('更新文章失败，请重试');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('确定要删除这篇文章吗？此操作无法撤销。')) {
      return;
    }

    try {
      await deletePost(id);
      alert('文章已删除');
      router.push('/');
    } catch (error) {
      console.error('删除文章失败:', error);
      alert('删除文章失败，请重试');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            编辑文章
          </h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            返回首页
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6">
          {/* 标题 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标题 *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 摘要 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              摘要
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              内容 * (支持 Markdown)
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
            />
          </div>

          {/* 封面图片 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              封面图片 URL
            </label>
            <input
              type="url"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 分类 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              分类 *
            </label>
            <select
              required
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">选择分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标签
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* 阅读时间 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              预计阅读时间（分钟）
            </label>
            <input
              type="number"
              min="1"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 发布状态 */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_published" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              发布文章
            </label>
          </div>

          {/* 按钮组 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? '保存中...' : '保存更改'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              删除
            </button>
            <Link
              href="/"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 flex items-center justify-center"
            >
              取消
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
