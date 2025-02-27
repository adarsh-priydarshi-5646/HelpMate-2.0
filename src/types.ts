export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'code' | 'image' | 'thinking' | 'memory';
  imageUrl?: string;
  imageAnalysis?: string;
  language?: string;
  isTyping?: boolean;
  memoryContext?: string;
  keywords?: string[];
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: Date;
  context?: {
    userPreferences?: Record<string, any>;
    memories?: string[];
    lastInteraction?: Date;
    keywords?: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    responseStyle?: 'detailed' | 'direct' | 'stepwise' | 'summary';
  };
  memories?: {
    topics: string[];
    preferences: Record<string, any>;
    lastInteractions: Record<string, Date>;
    keywords: Record<string, string[]>;
  };
}

export interface Settings {
  theme: 'light' | 'dark';
  language: string;
  apiKey?: string;
  memoryEnabled?: boolean;
  typingAnimationEnabled?: boolean;
  soundEnabled?: boolean;
  responseStyle?: 'detailed' | 'direct' | 'stepwise' | 'summary';
}

export interface Memory {
  id: string;
  userId: string;
  content: string;
  keywords: string[];
  timestamp: Date;
  category?: string;
  source?: 'chat' | 'user-provided' | 'system';
}