export interface TypingOptions {
  text: string;
  onUpdate: (text: string) => void;
  onComplete: () => void;
  speed?: number;
  initialDelay?: number;
<<<<<<< HEAD
  characterByCharacter?: boolean;
  addEmojis?: boolean;
}

const emojiMap: Record<string, string[]> = {
  question: ['❓', '🤔', '🧐'],
  exclamation: ['❗', '✨', '🎉'],
  greeting: ['👋', '😊', '🙌'],
  list: ['📋', '📝', '✅'],
  code: ['💻', '🔧', '⚡'],
  idea: ['💡', '✨', '🌟'],
  warning: ['⚠️', '🚨', '⛔'],
  success: ['✅', '🎯', '🚀'],
  time: ['⏰', '⌛', '🕒'],
  important: ['📢', '🔔', '❗'],
  step: ['➡️', '🔜', '✨'],
  example: ['📝', '💭', '🔍'],
  tip: ['💡', '✨', '🎯'],
  note: ['📝', '✏️', '📌']
};

const keywordMap: Record<string, string[]> = {
  question: ['how', 'what', 'why', 'when', 'where', 'who', '?'],
  exclamation: ['wow', 'amazing', 'great', 'excellent', '!'],
  greeting: ['hello', 'hi', 'hey', 'welcome'],
  list: ['list', 'steps', 'points', 'items'],
  code: ['code', 'function', 'programming', 'script'],
  idea: ['idea', 'concept', 'think', 'consider'],
  warning: ['warning', 'caution', 'careful', 'note'],
  success: ['success', 'complete', 'done', 'finished'],
  time: ['time', 'hour', 'minute', 'second'],
  important: ['important', 'critical', 'crucial'],
  step: ['first', 'second', 'third', 'next', 'finally'],
  example: ['example', 'instance', 'case', 'scenario'],
  tip: ['tip', 'hint', 'suggestion', 'recommend'],
  note: ['note', 'remember', 'key point']
};

const getRandomEmoji = (category: string): string => {
  const emojis = emojiMap[category] || emojiMap.idea;
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const getCategoryForSentence = (sentence: string): string | null => {
  const lowerSentence = sentence.toLowerCase();
  
  for (const [category, keywords] of Object.entries(keywordMap)) {
    for (const keyword of keywords) {
      if (lowerSentence.includes(keyword)) {
        return category;
      }
    }
  }
  
  return null;
};

const addEmojisToText = (text: string): string => {
  const sentences = text.split(/([.!?]\s+|\n+|:\s+)/);
  let result = '';
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const category = getCategoryForSentence(sentence);
    
    if (category && Math.random() > 0.5) {
      const emoji = getRandomEmoji(category);
      result += sentence + ' ' + emoji + ' ';
    } else {
      result += sentence;
    }
  }
  
  result = result.replace(/^(#+)\s+(.+)$/gm, (_, hashes, content) => {
    const emoji = getRandomEmoji('important');
    return `${hashes} ${emoji} ${content}`;
  });
  
  result = result.replace(/^(\s*[-*]|\d+\.)\s+(.+)$/gm, (match, bullet, content) => {
    if (Math.random() > 0.4) {
      const emoji = getRandomEmoji('list');
      return `${bullet} ${emoji} ${content}`;
    }
    return match;
  });
  
  return result;
};

=======
}

>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
export const simulateTyping = ({
  text,
  onUpdate,
  onComplete,
<<<<<<< HEAD
  speed = 2, // Increased typing speed significantly
  initialDelay = 50, // Reduced initial delay
  characterByCharacter = false,
  addEmojis = true
}: TypingOptions): { stop: () => void } => {
  let isStopped = false;
  let currentText = '';
  
  const processedText = addEmojis ? addEmojisToText(text) : text;
  const chunks = processedText.split(/(\n+)/);
  
  const typeNextChunk = (chunkIndex: number) => {
    if (isStopped || chunkIndex >= chunks.length) {
      onComplete();
      return;
    }
    
    const chunk = chunks[chunkIndex];
    let charIndex = 0;
    
    const typeChunk = () => {
      if (isStopped || charIndex >= chunk.length) {
        currentText += chunk.slice(charIndex);
        onUpdate(currentText);
        setTimeout(() => typeNextChunk(chunkIndex + 1), speed);
        return;
      }
      
      const charsToType = characterByCharacter ? 1 : Math.min(10, chunk.length - charIndex); // Increased chars per iteration
      currentText += chunk.slice(charIndex, charIndex + charsToType);
      onUpdate(currentText);
      charIndex += charsToType;
      
      const nextDelay = chunk[charIndex - 1]?.match(/[.!?]/) ? speed * 1.2 : 
                       chunk[charIndex - 1]?.match(/[,;:]/) ? speed * 1.1 : 
                       chunk[charIndex - 1]?.match(/[\n]/) ? speed * 1.5 : 
                       speed;
      
      setTimeout(typeChunk, nextDelay);
    };
    
    typeChunk();
  };
  
  setTimeout(() => typeNextChunk(0), initialDelay);
=======
  speed = 30,
  initialDelay = 500,
}: TypingOptions): { stop: () => void } => {
  let isStopped = false;
  let currentText = '';
  let currentIndex = 0;
  
  // Add random variation to typing speed
  const getRandomSpeed = () => {
    const variation = Math.random() * 50 - 25; // -25 to +25ms variation
    return Math.max(10, speed + variation);
  };
  
  // Add pauses at punctuation
  const getPauseTime = (char: string) => {
    if (['.', '!', '?'].includes(char)) return 400;
    if ([',', ';', ':'].includes(char)) return 200;
    return getRandomSpeed();
  };
  
  const typeNextChar = () => {
    if (isStopped) return;
    
    if (currentIndex < text.length) {
      const char = text[currentIndex];
      currentText += char;
      currentIndex++;
      
      onUpdate(currentText);
      
      const nextDelay = getPauseTime(char);
      setTimeout(typeNextChar, nextDelay);
    } else {
      onComplete();
    }
  };
  
  // Start typing after initial delay
  const timerId = setTimeout(typeNextChar, initialDelay);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  
  return {
    stop: () => {
      isStopped = true;
<<<<<<< HEAD
=======
      clearTimeout(timerId);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
      onComplete();
    }
  };
};

<<<<<<< HEAD
export const splitTextIntoChunks = (text: string): string[] => {
  return text.split(/\n+/);
=======
// Split text into chunks for line-by-line typing
export const splitTextIntoChunks = (text: string): string[] => {
  // Split by line breaks first
  const lines = text.split(/\n+/);
  
  // Further split long lines
  const chunks: string[] = [];
  
  lines.forEach(line => {
    if (line.length <= 80) {
      chunks.push(line);
    } else {
      // Split long lines at sentence boundaries
      const sentences = line.match(/[^.!?]+[.!?]+/g) || [line];
      chunks.push(...sentences);
    }
  });
  
  return chunks;
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
};