import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPosts, getPostsByCategory } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import MarkdownContent from '@/components/MarkdownContent';
import ViewCounter from '@/components/ViewCounter';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 生成静态参数
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: `${post.title} - 我的博客`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map((tag) => tag.name),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 获取相关文章
  const relatedPosts = await getPostsByCategory(post.category.slug);

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-8">
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

        {/* 文章头部 */}
        <header className="mb-8">
          <div className="mb-4">
            <Link
              href={`/category/${post.category.slug}`}
              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
            >
              {post.category.name}
            </Link>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">{post.excerpt}</p>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Image
                src={post.author.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=3b82f6&color=fff'}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
                unoptimized
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-xs">{post.author.bio}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span>{post.readTime} 分钟阅读</span>
              <span>•</span>
              <ViewCounter slug={post.slug} initialViews={post.views} />
            </div>
          </div>
        </header>

        {/* 封面图片 */}
        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
          />
        </div>

        {/* 文章内容 */}
        <MarkdownContent content={post.content} />

        {/* 标签 */}
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">标签</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.slug}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 相关文章推荐 */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            相关文章
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.slug}`}
                  className="group rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <h4 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {relatedPost.title}
                  </h4>
                  <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </article>
  );
}

