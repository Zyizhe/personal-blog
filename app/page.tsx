import { getPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import SplitText from '@/components/SplitText';

export const metadata = {
  title: '首页 - 我的博客',
  description: '欢迎来到我的博客，这里分享前端开发、后端开发、全栈开发等技术文章',
};

export const revalidate = 60; // 每60秒重新验证数据

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 搜索栏 */}
        <div className="mb-8 flex justify-center">
          <SearchBar />
        </div>

        {/* 欢迎区域 */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {/* 欢迎来到我的博客 */}
            <SplitText 
              text="欢迎来到我的博客"
              onLetterAnimationComplete
            />
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            分享技术、记录成长、探索未知
          </p>
        </div>

        {/* 文章列表 */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            最新文章
          </h2>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-12 text-center dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                暂无文章，请稍后再来查看
              </p>
            </div>
          )}
        </div>

        {/* 统计信息 */}
        {posts.length > 0 && (
          <div className="mt-12 rounded-lg bg-white p-6 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {posts.length}
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">文章总数</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {posts.reduce((sum, post) => sum + post.views, 0)}
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">总阅读量</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {new Set(posts.flatMap((post) => post.tags.map((tag) => tag.id))).size}
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">标签数量</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
