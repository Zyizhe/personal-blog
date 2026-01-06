/**
 * 获取图片 URL，如果是外部图片则使用代理
 * @param url 原始图片 URL
 * @param useProxy 是否使用代理（默认 false）
 */
export function getImageUrl(url: string | null | undefined, useProxy = false): string {
  if (!url) return '';

  // 如果是本地图片或已经是代理 URL，直接返回
  if (url.startsWith('/') || url.includes('/api/image-proxy')) {
    return url;
  }

  // 如果需要使用代理
  if (useProxy) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }

  return url;
}

/**
 * 检查是否需要使用代理
 * 某些域名已知会有防盗链问题
 */
export function shouldUseProxy(url: string | null | undefined): boolean {
  if (!url) return false;

  // 已知有防盗链的域名列表
  const hotlinkProtectedDomains = [
    'dev.to',
    'medium.com',
    'blogger.com',
    'wordpress.com',
    // 可以根据需要添加更多
  ];

  return hotlinkProtectedDomains.some(domain => url.includes(domain));
}
