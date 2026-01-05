interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // 简单的 markdown 转 HTML 函数
  const markdownToHtml = (markdown: string): string => {
    let html = markdown;

    // 处理代码块
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    html = html.replace(codeBlockRegex, (match, lang, code) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang || ''}">${escapedCode}</code></pre>`;
    });

    // 处理行内代码
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>');

    // 处理标题
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold mt-6 mb-4 text-gray-900 dark:text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>');

    // 处理列表
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>');

    // 处理段落
    const lines = html.split('\n');
    const processedLines: string[] = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('<h') || line.startsWith('<pre') || line.startsWith('</pre') || line.startsWith('<li')) {
        if (inList && !line.startsWith('<li') && !line.startsWith('</ul')) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push(line);
        if (line.startsWith('<li') && !inList) {
          processedLines.unshift('<ul class="my-4 space-y-2">');
          inList = true;
        }
      } else if (line === '') {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push('<br>');
      } else if (line && !line.startsWith('<')) {
        if (inList) {
          processedLines.push('</ul>');
          inList = false;
        }
        processedLines.push(`<p class="mb-4 text-gray-700 dark:text-gray-300 leading-7">${line}</p>`);
      }
    }

    if (inList) {
      processedLines.push('</ul>');
    }

    return processedLines.join('\n');
  };

  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
}

