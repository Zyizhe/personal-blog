import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/mock-data';
import { formatDate, formatRelativeTime } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
      <Link href={`/posts/${post.slug}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
          <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.author.name}
              </span>
            </div>
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map((tag) => (
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

