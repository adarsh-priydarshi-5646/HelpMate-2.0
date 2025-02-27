import React from 'react';
import { MessageSquarePlus, Bot, Settings, PanelLeftClose, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  chats: { id: string; title: string }[];
  currentChatId?: string;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isOpen,
  toggleSidebar,
  onOpenSettings,
}) => {
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 top-0 h-screen w-72 bg-gray-800 text-gray-100 p-4 flex flex-col z-10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-purple-400" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            HelpMate 🤖
          </h1>
        </div>
        <button onClick={toggleSidebar} className="p-1 hover:bg-gray-700 rounded">
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={onNewChat}
        className="flex items-center gap-2 w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg mb-4 transition-all duration-200"
      >
        <MessageSquarePlus className="w-5 h-5" />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <motion.div
            key={chat.id} // Using the chat's unique ID instead of timestamp
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`group flex items-center gap-2 w-full rounded-lg ${
              chat.id === currentChatId
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-700/50 text-gray-300'
            }`}
          >
            <button
              onClick={() => onSelectChat(chat.id)}
              className="flex items-center gap-2 flex-1 p-3 text-left"
            >
              <MessageSquarePlus className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </button>
            <button
              onClick={() => onDeleteChat(chat.id)}
              className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded-lg transition-all duration-200 mr-1"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={onOpenSettings}
        className="flex items-center gap-2 w-full p-3 hover:bg-gray-700/50 rounded-lg mt-auto text-gray-300"
      >
        <Settings className="w-5 h-5" />
        Settings
      </button>
    </motion.div>
  );
};