import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/mock-data';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: '分类未找到',
    };
  }

  return {
    title: `${category.name} - 我的博客`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回首页
        </Link>

        {/* 分类信息 */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{category.description}</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            共 {posts.length} 篇文章
          </p>
        </div>

        {/* 文章列表 */}
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">该分类下暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}

