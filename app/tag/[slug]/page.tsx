import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTagBySlug, getPostsByTag } from '@/lib/mock-data';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagBySlug(slug);

  if (!tag) {
    return {
      title: '标签未找到',
    };
  }

  return {
    title: `${tag.name} - 我的博客`,
    description: `查看标签为 ${tag.name} 的所有文章`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(slug);

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

        {/* 标签信息 */}
        <div className="mb-8">
          <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-lg font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            #{tag.name}
          </div>
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
            <p className="text-gray-600 dark:text-gray-400">该标签下暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}

