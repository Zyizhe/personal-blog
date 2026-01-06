'use client';

import { useEffect, useState } from 'react';

export default function MobileTestPage() {
  const [info, setInfo] = useState<any>(() => {
    // 初始化时就设置基本信息，避免在 effect 中同步调用 setState
    if (typeof window !== 'undefined') {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        online: navigator.onLine,
        cookieEnabled: navigator.cookieEnabled,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        connection: (navigator as any).connection?.effectiveType || 'unknown',
        timestamp: new Date().toISOString(),
      };
    }
    return {};
  });

  useEffect(() => {
    // 只在 effect 中处理异步操作（Supabase 连接测试）
    fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/', {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
    })
      .then(res => {
        setInfo((prev: any) => ({
          ...prev,
          supabaseStatus: res.ok ? '✅ 连接成功' : '❌ 连接失败',
          supabaseStatusCode: res.status,
        }));
      })
      .catch(err => {
        setInfo((prev: any) => ({
          ...prev,
          supabaseStatus: '❌ 连接错误',
          supabaseError: err.message,
        }));
      });
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">移动端诊断页面</h1>
        <p className="text-green-600 font-semibold mb-4">
          ✅ 如果你能看到这个页面，说明基本连接正常！
        </p>

        <div className="space-y-2">
          {Object.entries(info).map(([key, value]) => (
            <div key={key} className="border-b pb-2">
              <span className="font-semibold text-gray-700">{key}: </span>
              <span className="text-gray-600">
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h2 className="font-bold mb-2">测试说明：</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>如果能看到这个页面，说明 Next.js 路由正常</li>
            <li>检查 supabaseStatus 是否显示连接成功</li>
            <li>检查 online 是否为 true</li>
            <li>截图发送给开发者进行进一步诊断</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
