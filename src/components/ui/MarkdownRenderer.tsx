import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {  return (
    <div className={`prose prose-xl max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-4xl font-bold text-gray-900 mb-6" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="text-lg text-gray-700 leading-relaxed mb-4" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-2 mb-4 ml-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 mb-4 ml-4" {...props}>
              {children}
            </ol>
          ),          li: ({ children, ...props }) => (
            <li className="text-lg text-gray-700" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (            <blockquote
              className="border-l-4 border-purple-500 pl-6 py-4 my-6 bg-purple-50 rounded-r-lg"
              {...props}
            >
              <div className="italic text-lg text-gray-700">{children}</div>
            </blockquote>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-gray-900" {...props}>
              {children}
            </strong>
          ),          em: ({ children, ...props }) => (
            <em className="italic text-lg text-gray-700" {...props}>
              {children}
            </em>
          ),code: ({ children, ...props }) => {
            const { node, ...restProps } = props as any;
            const inline = node?.tagName !== 'pre';
            return inline ? (
              <code
                className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                {...restProps}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                <code {...restProps}>{children}</code>
              </pre>
            );
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-200 rounded-lg" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="bg-gray-50 border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-gray-200 px-4 py-2 text-gray-700" {...props}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
