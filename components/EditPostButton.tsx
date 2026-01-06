'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface EditPostButtonProps {
  postId: string;
  authorId: string;
}

export default function EditPostButton({ postId, authorId }: EditPostButtonProps) {
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkEditPermission();
  }, []);

  async function checkEditPermission() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 检查是否是文章作者
      if (user && user.id === authorId) {
        setCanEdit(true);
      }
    } catch (error) {
      console.error('检查编辑权限失败:', error);
    } finally {
      setLoading(false);
    }
  }

  // 如果没有权限或正在加载，不显示按钮
  if (loading || !canEdit) {
    return null;
  }

  return (
    <Link
      href={`/admin/posts/edit/${postId}`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      编辑文章
    </Link>
  );
}
