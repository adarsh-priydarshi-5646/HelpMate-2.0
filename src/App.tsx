<<<<<<< HEAD
import React, { useState, useEffect, useCallback, useRef } from 'react';
=======
import React, { useState, useEffect, useCallback } from 'react';
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
import axios from 'axios';
import { PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './lib/supabase';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { Settings } from './components/Settings';
import { Auth } from './components/Auth';
import { TypingIndicator } from './components/TypingIndicator';
<<<<<<< HEAD
import { searchMemories, storeMemory, formatMemoryContext } from './lib/memory';
import { simulateTyping } from './lib/typingEffect';
import type { Message, Chat, Settings as SettingsType, Memory } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
=======
import type { Message, Chat, Settings as SettingsType } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
<<<<<<< HEAD
  const [showAuth, setShowAuth] = useState(false);
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'dark',
    language: 'en',
    memoryEnabled: true,
    typingAnimationEnabled: true,
    soundEnabled: false,
    responseStyle: 'detailed',
    voiceInputEnabled: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const typingControlRef = useRef<{ stop: () => void } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialChatCreated = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isGenerating]);
=======
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'dark',
    language: 'en',
  });
  const [showSettings, setShowSettings] = useState(false);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
<<<<<<< HEAD
        setShowAuth(false);
        if (!initialChatCreated.current) {
          loadChats(session.user.id);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        initialChatCreated.current = false;
=======
      } else {
        setIsAuthenticated(false);
        setUser(null);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
      }
    });

    return () => subscription.unsubscribe();
  }, []);

<<<<<<< HEAD
  const loadChats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error loading chats:', error);
        if (!initialChatCreated.current) {
          createNewChat();
        }
        return;
      }
      
      if (data && data.length > 0) {
        const loadedChats = data.map(chat => ({
          id: chat.id,
          title: chat.title,
          messages: JSON.parse(chat.messages),
          timestamp: new Date(chat.created_at),
          context: chat.context ? JSON.parse(chat.context) : undefined,
        }));
        
        setChats(loadedChats);
        setCurrentChat(loadedChats[0]);
      } else if (!initialChatCreated.current) {
        createNewChat();
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      if (!initialChatCreated.current) {
        createNewChat();
      }
    }
  };

  const saveChat = async (chat: Chat) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('chats')
        .upsert({
          id: chat.id,
          user_id: user.id,
          title: chat.title,
          messages: JSON.stringify(chat.messages),
          context: chat.context ? JSON.stringify(chat.context) : null,
          updated_at: new Date().toISOString(),
          created_at: chat.timestamp.toISOString(),
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving chat:', error);
    }
  };

=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });
    if (error) throw error;
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      return;
    }
    setIsAuthenticated(false);
    setUser(null);
    setChats([]);
    setCurrentChat(null);
    setShowSettings(false);
<<<<<<< HEAD
    setShowAuth(false);
  };

  const createNewChat = () => {
    if (chats.length > 0) {
      setCurrentChat(chats[0]);
      return chats[0];
    }

    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setChats([newChat]);
    setCurrentChat(newChat);
    initialChatCreated.current = true;
    return newChat;
  };

  const deleteChat = async (chatId: string) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('chats')
          .delete()
          .eq('id', chatId)
          .eq('user_id', user.id);
        
        if (error) {
          console.error('Error deleting chat:', error);
          return;
        }
      }
      
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      setChats(updatedChats);
      
=======
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: '💬 New Chat',
      messages: [],
      timestamp: new Date(),
    };
    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChat(newChat);
  };

  const deleteChat = (chatId: string) => {
    setChats(prevChats => {
      const updatedChats = prevChats.filter(chat => chat.id !== chatId);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
      if (currentChat?.id === chatId) {
        if (updatedChats.length > 0) {
          setCurrentChat(updatedChats[0]);
        } else {
<<<<<<< HEAD
          const newChat = createNewChat();
          setChats([newChat]);
          setCurrentChat(newChat);
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (!currentChat) return;

    const updatedMessages = currentChat.messages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, content: newContent };
      }
      return msg;
    });

    const updatedChat = {
      ...currentChat,
      messages: updatedMessages,
    };

    setCurrentChat(updatedChat);
    setChats(prevChats => 
      prevChats.map(chat => chat.id === updatedChat.id ? updatedChat : chat)
    );

    await saveChat(updatedChat);
  };

  useEffect(() => {
    if (!currentChat) {
      createNewChat();
    }
  }, []);

  const analyzeImage = useCallback(async (file: File): Promise<string> => {
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = reader.result?.toString().split(',')[1] || '';
          resolve(base64);
        };
      });
      reader.readAsDataURL(file);
      const base64 = await base64Promise;
=======
          createNewChat();
        }
      }
      return updatedChats;
    });
  };

  useEffect(() => {
    if (isAuthenticated && chats.length === 0) {
      createNewChat();
    }
  }, [isAuthenticated]);

  const analyzeImage = useCallback(async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475

      const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate',
        {
          requests: [{
<<<<<<< HEAD
            image: { content: base64 },
=======
            image: { content: await file.arrayBuffer().then(buf => 
              Buffer.from(buf).toString('base64')
            )},
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            features: [
              { type: 'LABEL_DETECTION' },
              { type: 'TEXT_DETECTION' },
              { type: 'FACE_DETECTION' },
              { type: 'OBJECT_LOCALIZATION' }
            ]
          }]
        },
        {
          params: { key: 'AIzaSyDjkfrwMpj3ibzgpweZlDkPURn4x088_hc' },
          headers: { 'Content-Type': 'application/json' }
        }
      );

      return JSON.stringify(response.data, null, 2);
    } catch (error) {
      console.error('Error analyzing image:', error);
      return 'Failed to analyze image';
    }
  }, []);

<<<<<<< HEAD
  const findRelevantMemories = async (content: string): Promise<Memory[]> => {
    if (!settings.memoryEnabled || !user) return [];
    return await searchMemories(user.id, content);
  };

=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  const sendMessage = async (content: string, file?: File) => {
    if (!currentChat) return;

    const messages: Message[] = [];
    
<<<<<<< HEAD
    const relevantMemories = await findRelevantMemories(content);
    const memoryContext = formatMemoryContext(relevantMemories);
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
=======
    const userMessage: Message = {
      id: Date.now().toString(),
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
      role: 'user',
      content,
      type: 'text',
      timestamp: new Date(),
    };
    messages.push(userMessage);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const imageAnalysis = await analyzeImage(file);
      
      const imageMessage: Message = {
<<<<<<< HEAD
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Image Analysis Results:',
=======
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '🖼️ Image Analysis Results:',
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        type: 'image',
        imageUrl,
        imageAnalysis,
        timestamp: new Date(),
      };
      messages.push(imageMessage);
    }

    const updatedChat = {
      ...currentChat,
      title: content.length > 30 ? content.slice(0, 30) + '...' : content,
      messages: [...currentChat.messages, ...messages],
    };

    setCurrentChat(updatedChat);
    setChats(prevChats => 
      prevChats.map(chat => chat.id === updatedChat.id ? updatedChat : chat)
    );

<<<<<<< HEAD
    await saveChat(updatedChat);

    if (settings.memoryEnabled && user) {
      await storeMemory(user.id, content);
    }

    if (!file) {
      setIsGenerating(true);
      
      try {
        let promptContext = '';
        if (settings.memoryEnabled && memoryContext) {
          promptContext = `Previous relevant information:\n${memoryContext}\n\n`;
        }
        
        let styleInstruction = '';
        if (settings.responseStyle === 'direct') {
          styleInstruction = 'Provide a direct, concise answer without explanations.';
        } else if (settings.responseStyle === 'stepwise') {
          styleInstruction = 'Provide a step-by-step explanation.';
        } else if (settings.responseStyle === 'summary') {
          styleInstruction = 'Provide a brief summary of the key points.';
        }
        
        const fullPrompt = `${promptContext}${styleInstruction}\n\n${content}`;
        
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
          {
            contents: [{ parts: [{ text: fullPrompt }] }],
=======
    if (!file) {
      setIsGenerating(true);
      try {
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
          {
            contents: [{ parts: [{ text: content }] }],
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          },
          {
            params: { key: 'AIzaSyDjkfrwMpj3ibzgpweZlDkPURn4x088_hc' },
            headers: { 'Content-Type': 'application/json' }
          }
        );

<<<<<<< HEAD
        let responseText = '';
        if (response.data && 
            response.data.candidates && 
            response.data.candidates[0] && 
            response.data.candidates[0].content && 
            response.data.candidates[0].content.parts && 
            response.data.candidates[0].content.parts[0]) {
          responseText = response.data.candidates[0].content.parts[0].text || "I couldn't generate a response at this time.";
        } else {
          responseText = "I couldn't generate a response at this time.";
        }
        
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: settings.memoryEnabled && memoryContext 
            ? responseText 
            : responseText,
          type: 'text',
          timestamp: new Date(),
          memoryContext: settings.memoryEnabled && memoryContext ? memoryContext : undefined,
        };

        const emptyMessage: Message = {
          ...assistantMessage,
          content: '',
        };
        
        const chatWithEmptyResponse = {
          ...updatedChat,
          messages: [...updatedChat.messages, emptyMessage],
        };
        
        setCurrentChat(chatWithEmptyResponse);
        
        typingControlRef.current = simulateTyping({
          text: assistantMessage.content,
          onUpdate: (text) => {
            setCurrentChat(prevChat => {
              if (!prevChat) return null;
              const updatedMessages = prevChat.messages.map(msg => 
                msg.id === emptyMessage.id ? { ...msg, content: text } : msg
              );
              return { ...prevChat, messages: updatedMessages };
            });
          },
          onComplete: () => {
            const finalChat = {
              ...updatedChat,
              messages: [...updatedChat.messages, assistantMessage],
            };
            setCurrentChat(finalChat);
            setChats(prevChats => 
              prevChats.map(chat => chat.id === finalChat.id ? finalChat : chat)
            );
            saveChat(finalChat);
            setIsGenerating(false);
          },
          speed: 15,
          initialDelay: 200,
          characterByCharacter: false,
          addEmojis: true
        });
      } catch (error) {
        console.error('Error generating response:', error);
        
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry, I encountered an error while generating a response. Please try again.',
          type: 'text',
          timestamp: new Date(),
        };
        
        const chatWithError = {
          ...updatedChat,
          messages: [...updatedChat.messages, errorMessage],
        };
        
        setCurrentChat(chatWithError);
        setChats(prevChats => 
          prevChats.map(chat => chat.id === chatWithError.id ? chatWithError : chat)
        );
        saveChat(chatWithError);
=======
        const assistantMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `🤖 ${response.data.candidates[0].content.parts[0].text}`,
          type: 'text',
          timestamp: new Date(),
        };

        const finalChat = {
          ...updatedChat,
          messages: [...updatedChat.messages, assistantMessage],
        };
        setCurrentChat(finalChat);
        setChats(prevChats => 
          prevChats.map(chat => chat.id === finalChat.id ? finalChat : chat)
        );
      } catch (error) {
        console.error('Error generating response:', error);
      } finally {
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        setIsGenerating(false);
      }
    }
  };

<<<<<<< HEAD
  const stopGeneration = () => {
    if (typingControlRef.current) {
      typingControlRef.current.stop();
    }
    setIsGenerating(false);
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
    document.body.className = settings.theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [settings.theme]);

  return (
    <div className={`h-screen flex ${settings.theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
=======
  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className={`h-screen flex bg-gray-900 ${settings.theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
      <Sidebar
        chats={chats}
        currentChatId={currentChat?.id}
        onNewChat={createNewChat}
        onSelectChat={(id) => setCurrentChat(chats.find(chat => chat.id === id) || null)}
        onDeleteChat={deleteChat}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenSettings={() => setShowSettings(true)}
      />

<<<<<<< HEAD
      <main className={`flex-1 flex flex-col relative transition-all duration-200 ${isSidebarOpen ? 'md:ml-72' : ''}`}>
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`absolute top-4 left-4 p-2 rounded-lg ${
              settings.theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-700'
            } md:block hidden`}
=======
      <main className={`flex-1 flex flex-col relative transition-all duration-200 ${isSidebarOpen ? 'ml-72' : ''}`}>
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 p-2 hover:bg-gray-800 rounded-lg text-gray-300"
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence>
          {showSettings && (
            <Settings
              settings={settings}
              onUpdateSettings={(newSettings) => setSettings({ ...settings, ...newSettings })}
              onLogout={handleLogout}
              onClose={() => setShowSettings(false)}
<<<<<<< HEAD
              isAuthenticated={isAuthenticated}
              onShowAuth={() => setShowAuth(true)}
            />
          )}
          {showAuth && (
            <Auth
              onLogin={handleLogin}
              onSignup={handleSignup}
              onClose={() => setShowAuth(false)}
=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            />
          )}
        </AnimatePresence>

<<<<<<< HEAD
        <div className="flex-1 overflow-y-auto relative">
          {currentChat?.messages.length === 0 ? (
            <div className={`h-full flex items-center justify-center p-4 ${
              settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <p className="text-lg md:text-xl text-center">How can I help you today?</p>
=======
        <div className="flex-1 overflow-y-auto">
          {currentChat?.messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p className="text-xl">👋 How can I help you today?</p>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {currentChat?.messages.map((message) => (
<<<<<<< HEAD
                message.type !== 'thinking' && (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onEditMessage={handleEditMessage}
                  />
                )
              ))}
            </AnimatePresence>
          )}
          {!isGenerating && currentChat?.messages.length > 0 && (
            <div className={`flex justify-start p-2 text-lg font-medium ml-8 mt-1 ${
              settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Thank you! 🙏
            </div>
          )}
          <div ref={messagesEndRef} />
=======
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
            </AnimatePresence>
          )}
          {isGenerating && <TypingIndicator />}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        </div>

        <ChatInput
          onSendMessage={sendMessage}
<<<<<<< HEAD
          onStopGeneration={stopGeneration}
          isGenerating={isGenerating}
          voiceInputEnabled={settings.voiceInputEnabled}
=======
          onStopGeneration={() => setIsGenerating(false)}
          isGenerating={isGenerating}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        />
      </main>
    </div>
  );
}

export default App;