export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
<<<<<<< HEAD
  type: 'text' | 'code' | 'image' | 'thinking' | 'memory' | 'search';
=======
  type: 'text' | 'code' | 'image' | 'thinking' | 'memory';
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  imageUrl?: string;
  imageAnalysis?: string;
  language?: string;
  isTyping?: boolean;
  memoryContext?: string;
  keywords?: string[];
<<<<<<< HEAD
  searchResults?: SearchResult[];
  source?: 'gemini' | 'serpapi';
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
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
<<<<<<< HEAD
  voiceInputEnabled?: boolean;
=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
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