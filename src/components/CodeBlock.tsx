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
<<<<<<< HEAD
    <div className="relative group my-4 rounded-lg overflow-hidden border border-gray-700">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 shadow-md">
=======
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300">
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </CopyToClipboard>
      </div>
<<<<<<< HEAD
      <div className="bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-300 border-b border-gray-700">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        className="rounded-b-lg !bg-gray-800 !mt-0"
        customStyle={{ 
          padding: '1.5rem',
          fontSize: '0.95rem',
          lineHeight: '1.5',
          fontFamily: "'Courier New', Courier, monospace",
          textShadow: 'none'
        }}
=======
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        className="rounded-lg !bg-gray-800 !mt-0"
        customStyle={{ padding: '1.5rem' }}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};