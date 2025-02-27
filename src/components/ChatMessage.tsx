import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import { ImageAnalysis } from './ImageAnalysis';
import { Brain, Clock, Lightbulb } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(({ message }, ref) => {
  const getMessageEmoji = () => {
    if (message.type === 'thinking') return '🤔';
    if (message.type === 'memory') return '💭';
    return message.role === 'assistant' 
      ? ['🤖', '🎯', '💡', '✨', '🚀', '🎨', '🔮', '🎭'][Math.floor(Math.random() * 8)]
      : '👤';
  };

  const renderMemoryContext = () => {
    if (!message.memoryContext) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-purple-400 text-sm mb-2"
      >
        <Brain className="w-4 h-4" />
        <span>Recalling previous conversation...</span>
        <Clock className="w-4 h-4" />
      </motion.div>
    );
  };
  
  const renderContent = () => {
    switch (message.type) {
      case 'thinking':
        return (
          <div className="flex items-center gap-2 text-gray-400">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Lightbulb className="w-5 h-5" />
            </motion.div>
            <span>Thinking...</span>
          </div>
        );
      case 'code':
        return (
          <CodeBlock
            code={message.content}
            language={message.language || 'javascript'}
          />
        );
      case 'image':
        return message.imageUrl && message.imageAnalysis ? (
          <ImageAnalysis
            imageUrl={message.imageUrl}
            analysis={message.imageAnalysis}
          />
        ) : null;
      default:
        return (
          <div className="prose prose-invert max-w-none break-words">
            {message.memoryContext && renderMemoryContext()}
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
                p: ({node, children, ...props}) => (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 leading-relaxed break-words"
                    {...props}
                  >
                    {children}
                  </motion.p>
                ),
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                code: ({node, inline, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="not-prose">
                      <CodeBlock code={String(children).replace(/\n$/, '')} language={match[1]} />
                    </div>
                  ) : (
                    <code className="bg-gray-700 px-1 rounded" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex gap-4 p-6 ${
        message.role === 'assistant' ? 'bg-gray-800/50' : 'bg-gray-900'
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.role === 'assistant' 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
          : 'bg-gray-700'
      }`}>
        <span className="text-white text-sm">{getMessageEmoji()}</span>
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        {renderContent()}
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = 'ChatMessage';