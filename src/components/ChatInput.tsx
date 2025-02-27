import React, { useState, useRef } from 'react';
import { Send, Image, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  onStopGeneration: () => void;
  isGenerating: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStopGeneration,
  isGenerating,
}) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendMessage('Analyze this image:', file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-700 bg-gray-800 p-4">
      <div className="max-w-3xl mx-auto flex gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200 transition-colors"
        >
          <Image className="w-6 h-6" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message HelpMate..."
            className="w-full p-3 pr-12 rounded-lg bg-gray-700 border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none text-gray-100 placeholder-gray-400"
            rows={1}
          />
          {isGenerating ? (
            <button
              type="button"
              onClick={onStopGeneration}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-600 rounded text-red-400 hover:text-red-300 transition-colors"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-600 rounded text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};