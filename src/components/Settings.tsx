import React, { useEffect } from 'react';
<<<<<<< HEAD
import { Globe, LogOut, User, X, Volume2, MessageSquare, Mic, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
=======
import { Moon, Sun, Globe, LogOut, User, X, Brain, Volume2, Type, MessageSquare } from 'lucide-react';
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
import type { Settings as SettingsType } from '../types';

interface SettingsProps {
  settings: SettingsType;
  onUpdateSettings: (settings: Partial<SettingsType>) => void;
  onLogout: () => void;
  onClose: () => void;
<<<<<<< HEAD
  isAuthenticated: boolean;
  onShowAuth: () => void;
=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onUpdateSettings,
  onLogout,
  onClose,
<<<<<<< HEAD
  isAuthenticated,
  onShowAuth,
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  const responseStyles = [
    { value: 'detailed', label: 'Detailed' },
    { value: 'direct', label: 'Direct' },
    { value: 'stepwise', label: 'Step-by-step' },
    { value: 'summary', label: 'Summary' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-xl w-full max-w-md p-6 relative theme-transition"
=======
}) => {
  const languages = [
    { code: 'en', name: '🇺🇸 English' },
    { code: 'es', name: '🇪🇸 Español' },
    { code: 'fr', name: '🇫🇷 Français' },
    { code: 'de', name: '🇩🇪 Deutsch' },
    { code: 'hi', name: '🇮🇳 हिन्दी' },
  ];

  const responseStyles = [
    { value: 'detailed', label: '📝 Detailed' },
    { value: 'direct', label: '🎯 Direct' },
    { value: 'stepwise', label: '🪜 Step-by-step' },
    { value: 'summary', label: '📋 Summary' },
  ];

  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
    document.body.className = settings.theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [settings.theme]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className={`${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl w-full max-w-md p-6 relative theme-transition`}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

<<<<<<< HEAD
        <h2 className="text-2xl font-bold mb-6 text-gray-100">
          Settings
=======
        <h2 className={`text-2xl font-bold mb-6 ${settings.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          ⚙️ Settings
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <User className="w-5 h-5 text-purple-400" />
              <span className="text-gray-200">Account</span>
            </div>
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={onShowAuth}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
=======
              {settings.theme === 'dark' ? (
                <Moon className="w-5 h-5 text-purple-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Theme</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
              className={`px-4 py-2 rounded-lg ${
                settings.theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {settings.theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
<<<<<<< HEAD
              <span className="text-gray-200">Language</span>
=======
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Language</span>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            </div>
            <select
              value={settings.language}
              onChange={(e) => onUpdateSettings({ language: e.target.value })}
<<<<<<< HEAD
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 border-none focus:ring-2 focus:ring-purple-500"
=======
              className={`px-4 py-2 rounded-lg ${
                settings.theme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-700'
              } border-none focus:ring-2 focus:ring-purple-500`}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
<<<<<<< HEAD
              <span className="text-gray-200">Response Style</span>
=======
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Response Style</span>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            </div>
            <select
              value={settings.responseStyle || 'detailed'}
              onChange={(e) => onUpdateSettings({ responseStyle: e.target.value as any })}
<<<<<<< HEAD
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 border-none focus:ring-2 focus:ring-purple-500"
=======
              className={`px-4 py-2 rounded-lg ${
                settings.theme === 'dark'
                  ? 'bg-gray-700 text-gray-200'
                  : 'bg-gray-200 text-gray-700'
              } border-none focus:ring-2 focus:ring-purple-500`}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            >
              {responseStyles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
<<<<<<< HEAD
              <Mic className="w-5 h-5 text-purple-400" />
              <span className="text-gray-200">Voice Input</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ voiceInputEnabled: !settings.voiceInputEnabled })}
              className={`px-4 py-2 rounded-lg ${
                settings.voiceInputEnabled
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
              }`}
            >
              {settings.voiceInputEnabled ? 'Enabled' : 'Disabled'}
=======
              <Brain className="w-5 h-5 text-purple-400" />
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Memory</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ memoryEnabled: !settings.memoryEnabled })}
              className={`px-4 py-2 rounded-lg ${
                settings.memoryEnabled
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : settings.theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
            >
              {settings.memoryEnabled ? '🧠 Enabled' : '💤 Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-purple-400" />
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Typing Animation</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ typingAnimationEnabled: !settings.typingAnimationEnabled })}
              className={`px-4 py-2 rounded-lg ${
                settings.typingAnimationEnabled
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : settings.theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
            >
              {settings.typingAnimationEnabled ? '⌨️ Enabled' : '💤 Disabled'}
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-purple-400" />
<<<<<<< HEAD
              <span className="text-gray-200">Sound Effects</span>
=======
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Sound Effects</span>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`px-4 py-2 rounded-lg ${
                settings.soundEnabled
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
<<<<<<< HEAD
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
              }`}
            >
              {settings.soundEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
=======
                  : settings.theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
            >
              {settings.soundEnabled ? '🔊 Enabled' : '🔇 Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              <span className={settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Profile</span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  );
};