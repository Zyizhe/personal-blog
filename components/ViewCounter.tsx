'use client';

import { useEffect, useRef } from 'react';
import { incrementPostViews } from '@/lib/api';

interface ViewCounterProps {
  slug: string;
  initialViews: number;
}

export default function ViewCounter({ slug, initialViews }: ViewCounterProps) {
  const hasIncremented = useRef(false);

  useEffect(() => {
    // 防止重复执行（React Strict Mode 会导致 useEffect 执行两次）
    if (hasIncremented.current) return;
    
    hasIncremented.current = true;
    incrementPostViews(slug);
  }, [slug]);

  return (
    <span>{initialViews} 次浏览</span>
  );
}
