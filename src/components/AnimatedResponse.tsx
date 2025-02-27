import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { simulateTyping, splitTextIntoChunks } from '../lib/typingEffect';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types';

interface AnimatedResponseProps {
  message: Message;
  typingEnabled: boolean;
  onComplete?: () => void;
}

export const AnimatedResponse: React.FC<AnimatedResponseProps> = ({
  message,
  typingEnabled,
  onComplete
}) => {
  const [isTyping, setIsTyping] = useState(typingEnabled);
  const [displayedContent, setDisplayedContent] = useState('');
  const typingControlRef = useRef<{ stop: () => void } | null>(null);
  
  useEffect(() => {
    if (!typingEnabled) {
      setDisplayedContent(message.content);
      setIsTyping(false);
      if (onComplete) onComplete();
      return;
    }
    
    setIsTyping(true);
    
    typingControlRef.current = simulateTyping({
      text: message.content,
      onUpdate: (text) => {
        setDisplayedContent(text);
      },
      onComplete: () => {
        setIsTyping(false);
        if (onComplete) onComplete();
      },
      speed: 30,
      initialDelay: 300
    });
    
    return () => {
      if (typingControlRef.current) {
        typingControlRef.current.stop();
      }
    };
  }, [message.content, typingEnabled, onComplete]);
  
  const displayMessage: Message = {
    ...message,
    content: displayedContent
  };
  
  return (
    <>
      <ChatMessage message={displayMessage} />
      {isTyping && <TypingIndicator />}
    </>
  );
};