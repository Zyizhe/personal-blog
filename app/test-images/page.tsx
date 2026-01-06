import Image from 'next/image';

export default function TestImagesPage() {
  const testImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    'https://picsum.photos/800/400',
    'https://via.placeholder.com/800x400',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">图片测试页面</h1>

        <div className="space-y-8">
          {testImages.map((url, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                测试图片 {index + 1}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 break-all">URL: {url}</p>

              <div className="space-y-4">
                {/* 使用 Next.js Image + unoptimized */}
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Next.js Image (unoptimized):
                  </p>
                  <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 rounded">
                    <Image
                      src={url}
                      alt={`Test ${index + 1}`}
                      fill
                      className="object-cover rounded"
                      unoptimized
                    />
                  </div>
                </div>

                {/* 使用原生 img 标签 */}
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    原生 img 标签:
                  </p>
                  <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                    <img
                      src={url}
                      alt={`Test ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-yellow-900 dark:text-yellow-200">
            检查清单：
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-300">
            <li>打开浏览器控制台（F12）查看错误信息</li>
            <li>检查 Network 标签中的图片请求状态</li>
            <li>如果 Next.js Image 不显示但原生 img 显示，说明是 Next.js 配置问题</li>
            <li>如果两者都不显示，说明是 URL 或 CORS 问题</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
