import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        className="rounded-lg !bg-gray-800 !mt-0"
        customStyle={{ padding: '1.5rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};