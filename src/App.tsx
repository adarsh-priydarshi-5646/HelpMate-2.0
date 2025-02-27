import React, { useState, useEffect, useCallback } from 'react';
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
import type { Message, Chat, Settings as SettingsType } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'dark',
    language: 'en',
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
      if (currentChat?.id === chatId) {
        if (updatedChats.length > 0) {
          setCurrentChat(updatedChats[0]);
        } else {
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

      const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate',
        {
          requests: [{
            image: { content: await file.arrayBuffer().then(buf => 
              Buffer.from(buf).toString('base64')
            )},
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

  const sendMessage = async (content: string, file?: File) => {
    if (!currentChat) return;

    const messages: Message[] = [];
    
    const userMessage: Message = {
      id: Date.now().toString(),
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
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '🖼️ Image Analysis Results:',
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

    if (!file) {
      setIsGenerating(true);
      try {
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
          {
            contents: [{ parts: [{ text: content }] }],
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
        setIsGenerating(false);
      }
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className={`h-screen flex bg-gray-900 ${settings.theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
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

      <main className={`flex-1 flex flex-col relative transition-all duration-200 ${isSidebarOpen ? 'ml-72' : ''}`}>
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 p-2 hover:bg-gray-800 rounded-lg text-gray-300"
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
            />
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto">
          {currentChat?.messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p className="text-xl">👋 How can I help you today?</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {currentChat?.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
            </AnimatePresence>
          )}
          {isGenerating && <TypingIndicator />}
        </div>

        <ChatInput
          onSendMessage={sendMessage}
          onStopGeneration={() => setIsGenerating(false)}
          isGenerating={isGenerating}
        />
      </main>
    </div>
  );
}

export default App;