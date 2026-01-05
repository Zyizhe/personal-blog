import { getPosts, getCategories, getTags } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export const metadata = {
  title: '关于 - 我的博客',
  description: '关于这个博客项目的介绍',
};

export const revalidate = 60; // 每60秒重新验证数据

export default async function AboutPage() {
  const [posts, categories, tags] = await Promise.all([
    getPosts(),
    getCategories(),
    getTags(),
  ]);

  // 获取作者列表
  const { data: authors = [] } = await supabase.from('authors').select('*');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">关于博客</h1>

        <div className="space-y-8">
          {/* 项目介绍 */}
          <section className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              项目介绍
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              这是一个使用 Next.js 16 构建的博客学习项目，展示了 Next.js
              的核心功能和最佳实践。
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400">
              <li>使用 App Router 进行路由管理</li>
              <li>Server Components 和 Client Components 的混合使用</li>
              <li>动态路由和静态生成</li>
              <li>元数据管理和 SEO 优化</li>
              <li>图片优化和响应式设计</li>
              <li>搜索功能和数据过滤</li>
            </ul>
          </section>

          {/* 统计数据 */}
          <section className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              统计数据
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {posts.length}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">文章</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {categories.length}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">分类</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {tags.length}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">标签</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {(authors || []).length}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">作者</div>
              </div>
            </div>
          </section>

          {/* 作者列表 */}
          {authors && authors.length > 0 && (
            <section className="rounded-lg bg-white p-6 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">作者</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="flex flex-col items-center rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <Image
                      src={author.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="mb-3 rounded-full"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{author.name}</h3>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                      {author.bio}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 技术栈 */}
          <section className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">技术栈</h2>
            <div className="flex flex-wrap gap-2">
              {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

