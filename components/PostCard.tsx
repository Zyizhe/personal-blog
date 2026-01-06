import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-white/80 p-4 dark:bg-gray-900/80">
                <svg
                  className="h-12 w-12 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">暂无封面</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {post.category.name}
            </span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formatRelativeTime(post.publishedAt)}</time>
            <span>•</span>
            <span>{post.readTime} 分钟阅读</span>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {post.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={
                  post.author.avatar ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(post.author.name) +
                    '&background=3b82f6&color=fff'
                }
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
                unoptimized
                referrerPolicy="no-referrer"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{post.author.name}</span>
            </div>
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map(tag => (
                <span
                  key={tag.id}
                  className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
