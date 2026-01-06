'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
// import 'highlight.js/styles/github-dark.css';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:text-gray-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
        components={{
          h1: ({ node, children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            const id = text;
            return (
              <h1
                id={id}
                className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white scroll-mt-20"
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2: ({ node, children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            const id = text;
            return (
              <h2
                id={id}
                className="text-3xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white scroll-mt-20"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
            const text = typeof children === 'string' ? children : String(children);
            const id = text;
            return (
              <h3
                id={id}
                className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white scroll-mt-20"
                {...props}
              >
                {children}
              </h3>
            );
          },
          p: ({ node, ...props }) => (
            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-7" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="my-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="my-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-700 dark:text-gray-300" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400"
              {...props}
            />
          ),
          a: ({ node, href, ...props }) => {
            // 判断是否是锚点链接（以 # 开头）
            const isAnchor = href?.startsWith('#');
            // 判断是否是相对路径或内部链接
            const isInternal = href?.startsWith('/') || href?.startsWith('#');

            return (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
                target={isInternal ? undefined : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
                {...props}
              />
            );
          },
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-4 max-w-full h-auto" {...props} alt={props.alt || ''} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-gray-900 dark:text-white font-semibold"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
