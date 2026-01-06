'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

export default function AdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    postId: string;
    postTitle: string;
  }>({
    isOpen: false,
    postId: '',
    postTitle: '',
  });

  useEffect(() => {
    checkAuthAndLoadPosts();
  }, []);

  async function checkAuthAndLoadPosts() {
    // 检查用户是否登录
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert('请先登录');
      router.push('/login');
      return;
    }

    setCurrentUserId(user.id);
    loadPosts(user.id);
  }

  async function loadPosts(userId: string) {
    try {
      // 只加载当前用户的文章
      const { data, error } = await supabase
        .from('posts')
        .select(
          `
          *,
          author:authors(name),
          category:categories(name)
        `
        )
        .eq('author_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('加载文章失败:', error);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteDialog(postId: string, postTitle: string, authorId: string) {
    // 检查是否是当前用户的文章
    if (authorId !== currentUserId) {
      alert('您只能删除自己的文章');
      return;
    }

    setDeleteDialog({
      isOpen: true,
      postId,
      postTitle,
    });
  }

  function closeDeleteDialog() {
    if (deleting) return; // 删除中不允许关闭
    setDeleteDialog({
      isOpen: false,
      postId: '',
      postTitle: '',
    });
  }

  async function handleDelete() {
    const { postId } = deleteDialog;
    setDeleting(postId);

    try {
      // 数据库 RLS 策略会确保只能删除自己的文章
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) {
        if (error.code === 'PGRST301') {
          throw new Error('您没有权限删除此文章');
        }
        throw error;
      }

      // 从列表中移除已删除的文章
      setPosts(posts.filter(post => post.id !== postId));

      closeDeleteDialog();
    } catch (error: any) {
      console.error('删除文章失败:', error);
      alert(error.message || '删除文章失败，请重试');
    } finally {
      setDeleting(null);
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
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">文章管理</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              创建新文章
            </Link>
            <Link
              href="/"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              返回首页
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">还没有文章，开始创建第一篇吧！</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              创建文章
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    标题
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    作者
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    分类
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    浏览量
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {posts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {post.author?.name || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {post.category?.name || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.is_published
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {post.is_published ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {post.views}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          编辑
                        </Link>
                        {post.is_published && (
                          <Link
                            href={`/posts/${post.slug}`}
                            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 font-medium"
                            target="_blank"
                          >
                            查看
                          </Link>
                        )}
                        <button
                          onClick={() => openDeleteDialog(post.id, post.title, post.author_id)}
                          disabled={deleting === post.id || post.author_id !== currentUserId}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          title={
                            post.author_id !== currentUserId ? '只能删除自己的文章' : '删除文章'
                          }
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 删除确认对话框 */}
        <DeleteConfirmDialog
          isOpen={deleteDialog.isOpen}
          title="确认删除文章"
          message={`确定要删除文章「${deleteDialog.postTitle}」吗？此操作无法撤销！`}
          onConfirm={handleDelete}
          onCancel={closeDeleteDialog}
          isDeleting={!!deleting}
        />

        {/* 统计信息 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {posts.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总文章数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {posts.filter(p => p.is_published).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">已发布</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {posts.filter(p => !p.is_published).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">草稿</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {posts.reduce((sum, p) => sum + p.views, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">总浏览量</div>
          </div>
        </div>
      </div>
    </div>
  );
}
