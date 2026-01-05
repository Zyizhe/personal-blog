// Mock 数据文件

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
}

// Mock 作者数据
export const authors: Author[] = [
  {
    id: '1',
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    bio: '前端开发工程师，专注于 React 和 Next.js',
  },
  {
    id: '2',
    name: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
    bio: '全栈开发工程师，热爱技术分享',
  },
  {
    id: '3',
    name: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
    bio: 'UI/UX 设计师，关注用户体验',
  },
];

// Mock 分类数据
export const categories: Category[] = [
  {
    id: '1',
    name: '前端开发',
    slug: 'frontend',
    description: '关于前端技术的最新文章',
  },
  {
    id: '2',
    name: '后端开发',
    slug: 'backend',
    description: '服务器端开发相关文章',
  },
  {
    id: '3',
    name: '全栈开发',
    slug: 'fullstack',
    description: '全栈开发实践和思考',
  },
  {
    id: '4',
    name: '设计',
    slug: 'design',
    description: 'UI/UX 设计相关文章',
  },
];

// Mock 标签数据
export const tags: Tag[] = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'Next.js', slug: 'nextjs' },
  { id: '3', name: 'TypeScript', slug: 'typescript' },
  { id: '4', name: 'Node.js', slug: 'nodejs' },
  { id: '5', name: 'CSS', slug: 'css' },
  { id: '6', name: 'JavaScript', slug: 'javascript' },
  { id: '7', name: 'Vue', slug: 'vue' },
  { id: '8', name: 'Python', slug: 'python' },
];

// Mock 文章数据
export const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js 14 新特性详解',
    slug: 'nextjs-14-features',
    excerpt: '探索 Next.js 14 带来的新功能和改进，包括 Server Components、App Router 等',
    content: `
# Next.js 14 新特性详解

Next.js 14 带来了许多令人兴奋的新特性和改进。本文将深入探讨这些新功能。

## Server Components

Server Components 是 Next.js 14 的核心特性之一。它们允许你在服务器端渲染组件，减少客户端 JavaScript 的加载量。

\`\`\`tsx
// app/components/ServerComponent.tsx
export default async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* 渲染数据 */}</div>;
}
\`\`\`

## App Router

App Router 提供了更灵活的路由系统，支持嵌套布局、并行路由等高级功能。

## 性能优化

Next.js 14 在性能方面做了大量优化，包括更快的构建速度和更好的运行时性能。

## 总结

Next.js 14 是一个重要的版本更新，为开发者提供了更好的开发体验和性能。
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    author: authors[0],
    category: categories[0],
    tags: [tags[0], tags[1], tags[2]],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 5,
    views: 1234,
  },
  {
    id: '2',
    title: 'TypeScript 高级类型技巧',
    slug: 'typescript-advanced-types',
    excerpt: '学习 TypeScript 中的高级类型系统，包括泛型、条件类型、映射类型等',
    content: `
# TypeScript 高级类型技巧

TypeScript 的类型系统非常强大，本文将介绍一些高级类型技巧。

## 泛型

泛型允许我们创建可重用的组件，这些组件可以处理多种类型。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 条件类型

条件类型允许我们根据条件选择类型。

\`\`\`typescript
type IsArray<T> = T extends Array<any> ? true : false;
\`\`\`

## 映射类型

映射类型允许我们基于旧类型创建新类型。

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`
    `,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    author: authors[0],
    category: categories[0],
    tags: [tags[2], tags[5]],
    publishedAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    readTime: 8,
    views: 987,
  },
  {
    id: '3',
    title: 'React Server Components 实践指南',
    slug: 'react-server-components-guide',
    excerpt: '深入了解 React Server Components 的工作原理和最佳实践',
    content: `
# React Server Components 实践指南

React Server Components 是 React 生态系统的一个重要创新。

## 什么是 Server Components

Server Components 是在服务器上运行的 React 组件，它们不会发送到客户端。

## 优势

1. 减少客户端 JavaScript 包大小
2. 直接访问后端资源
3. 更好的安全性

## 使用场景

- 数据获取
- 访问后端 API
- 使用 Node.js 模块
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    author: authors[1],
    category: categories[0],
    tags: [tags[0], tags[1]],
    publishedAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
    readTime: 6,
    views: 1456,
  },
  {
    id: '4',
    title: 'Node.js 性能优化技巧',
    slug: 'nodejs-performance-optimization',
    excerpt: '分享 Node.js 应用性能优化的实用技巧和最佳实践',
    content: `
# Node.js 性能优化技巧

Node.js 应用的性能优化是一个重要话题。

## 异步操作

充分利用 Node.js 的异步特性，避免阻塞事件循环。

## 缓存策略

合理使用缓存可以减少重复计算和数据库查询。

## 代码分割

使用动态导入来分割代码，按需加载模块。

## 监控和调试

使用性能监控工具来识别瓶颈。
    `,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    author: authors[1],
    category: categories[1],
    tags: [tags[3], tags[5]],
    publishedAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
    readTime: 7,
    views: 876,
  },
  {
    id: '5',
    title: '现代 CSS 布局技术',
    slug: 'modern-css-layout',
    excerpt: '探索 CSS Grid、Flexbox 等现代布局技术的使用方法',
    content: `
# 现代 CSS 布局技术

CSS 布局技术不断发展，本文将介绍现代布局方法。

## CSS Grid

Grid 布局提供了强大的二维布局能力。

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Flexbox

Flexbox 是用于一维布局的强大工具。

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## 容器查询

容器查询允许我们根据容器大小应用样式。
    `,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    author: authors[2],
    category: categories[3],
    tags: [tags[4]],
    publishedAt: '2024-01-03T10:00:00Z',
    updatedAt: '2024-01-03T10:00:00Z',
    readTime: 4,
    views: 654,
  },
  {
    id: '6',
    title: '全栈开发最佳实践',
    slug: 'fullstack-best-practices',
    excerpt: '分享全栈开发中的最佳实践和经验总结',
    content: `
# 全栈开发最佳实践

全栈开发需要掌握前后端技术，本文将分享一些最佳实践。

## 项目结构

合理的项目结构可以提高代码的可维护性。

## API 设计

RESTful API 设计原则和 GraphQL 的使用。

## 数据库设计

数据库设计的最佳实践和优化技巧。

## 部署和运维

应用部署和运维的注意事项。
    `,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    author: authors[1],
    category: categories[2],
    tags: [tags[1], tags[3]],
    publishedAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    readTime: 10,
    views: 1123,
  },
];

// 工具函数：根据 slug 获取文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

// 工具函数：根据分类 slug 获取文章列表
export function getPostsByCategory(categorySlug: string): Post[] {
  return posts.filter((post) => post.category.slug === categorySlug);
}

// 工具函数：根据标签 slug 获取文章列表
export function getPostsByTag(tagSlug: string): Post[] {
  return posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
}

// 工具函数：根据分类 slug 获取分类
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

// 工具函数：根据标签 slug 获取标签
export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((tag) => tag.slug === slug);
}

// 工具函数：搜索文章
export function searchPosts(query: string): Post[] {
  const lowerQuery = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
  );
}

