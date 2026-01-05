'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getCategories } from '@/lib/api';
import type { Category } from '@/lib/mock-data';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // 获取当前用户
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // 加载分类
    loadCategories();

    return () => subscription.unsubscribe();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('加载分类失败:', error);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            我的博客
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              首页
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              关于
            </Link>
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                分类
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/admin"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      管理
                    </Link>
                    <Link
                      href="/admin/posts/new"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      写文章
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      登出
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    登录
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

