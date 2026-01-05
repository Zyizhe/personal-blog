import { Suspense } from 'react';
import { searchPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
  const results = await searchPosts(query);

  return (
    <div>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        搜索 &quot;{query}&quot; 找到 {results.length} 篇文章
      </p>
      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-white p-8 text-center dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">没有找到相关文章</p>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">搜索结果</h1>
        {query ? (
          <Suspense
            fallback={
              <div className="text-center text-gray-600 dark:text-gray-400">搜索中...</div>
            }
          >
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="rounded-lg bg-white p-8 text-center dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">请输入搜索关键词</p>
          </div>
        )}
      </div>
    </div>
  );
}

