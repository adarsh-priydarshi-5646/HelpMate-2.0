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
<<<<<<< HEAD
  characterByCharacter?: boolean;
=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
}

export const AnimatedResponse: React.FC<AnimatedResponseProps> = ({
  message,
  typingEnabled,
<<<<<<< HEAD
  onComplete,
  characterByCharacter = true
=======
  onComplete
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
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
<<<<<<< HEAD
      initialDelay: 300,
      characterByCharacter
=======
      initialDelay: 300
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
    });
    
    return () => {
      if (typingControlRef.current) {
        typingControlRef.current.stop();
      }
    };
<<<<<<< HEAD
  }, [message.content, typingEnabled, onComplete, characterByCharacter]);
=======
  }, [message.content, typingEnabled, onComplete]);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  
  const displayMessage: Message = {
    ...message,
    content: displayedContent
  };
  
  return (
    <>
      <ChatMessage message={displayMessage} />
<<<<<<< HEAD
      {!isTyping && (
        <div className="flex justify-end p-2 text-gray-400 text-sm -mt-4 sm:-mt-5 md:-mt-6 mr-2 sm:mr-3 md:mr-4">
          Thank you! 🙏
        </div>
      )}
=======
      {isTyping && <TypingIndicator />}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
    </>
  );
};