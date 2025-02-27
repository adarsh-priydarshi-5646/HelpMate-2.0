export interface TypingOptions {
  text: string;
  onUpdate: (text: string) => void;
  onComplete: () => void;
  speed?: number;
  initialDelay?: number;
}

export const simulateTyping = ({
  text,
  onUpdate,
  onComplete,
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
  
  return {
    stop: () => {
      isStopped = true;
      clearTimeout(timerId);
      onComplete();
    }
  };
};

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
};