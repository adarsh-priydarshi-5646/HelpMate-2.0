import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb } from 'lucide-react';

interface TypingIndicatorProps {
  mode?: 'thinking' | 'memory' | 'typing';
  text?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ 
  mode = 'typing', 
  text 
}) => {
  const renderIcon = () => {
    switch (mode) {
      case 'thinking':
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case 'memory':
        return <Brain className="w-5 h-5 text-purple-400" />;
      default:
        return <span className="text-white text-sm">🤖</span>;
    }
  };

  const getMessage = () => {
    if (text) return text;
    
    switch (mode) {
      case 'thinking':
        return '🤔 Thinking...';
      case 'memory':
        return '🔍 Searching memories...';
      default:
        return '✍️ Typing...';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 p-6 bg-gray-800/50"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
        {renderIcon()}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-gray-300">{getMessage()}</span>
        <div className="flex items-center gap-1">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity, delay: 0 }
            }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity, delay: 0.2 }
            }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              transition: { duration: 1, repeat: Infinity, delay: 0.4 }
            }}
            className="w-2 h-2 bg-gray-400 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};