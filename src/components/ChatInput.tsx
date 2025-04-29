<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, StopCircle, Mic, MicOff, Bot } from 'lucide-react';
=======
import React, { useState, useRef } from 'react';
import { Send, Image, StopCircle } from 'lucide-react';
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475

interface ChatInputProps {
  onSendMessage: (message: string, file?: File) => void;
  onStopGeneration: () => void;
  isGenerating: boolean;
<<<<<<< HEAD
  voiceInputEnabled?: boolean;
=======
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onStopGeneration,
  isGenerating,
<<<<<<< HEAD
  voiceInputEnabled = true,
}) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsVoiceSupported(true);
    } else {
      setIsVoiceSupported(false);
    }
  }, []);
=======
}) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475

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

<<<<<<< HEAD
  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!isVoiceSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center gap-2 p-2 sm:p-3 md:p-4 z-10 sm:hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              HelpMate 🤖
            </h2>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-24 sm:mt-28 md:mt-32">
        <form onSubmit={handleSubmit} className="p-1.5 sm:p-2 md:p-4">
          <div className="max-w-3xl mx-auto flex gap-1.5 sm:gap-2 md:gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-200"
              title="Upload image"
            >
              <Image className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            
            {voiceInputEnabled && isVoiceSupported && (
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-1 sm:p-1.5 md:p-2 rounded-lg ${
                  isListening 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                }`}
                title={isListening ? "Stop recording" : "Start voice input"}
              >
                {isListening ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />}
              </button>
            )}
            
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message HelpMate..."
                className={`w-full p-1.5 sm:p-2 md:p-3 pr-8 sm:pr-10 md:pr-12 rounded-lg bg-gray-700 border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none text-gray-100 placeholder-gray-400 text-xs sm:text-sm md:text-base ${
                  isListening ? 'border-red-500 ring-1 ring-red-500' : ''
                }`}
                rows={1}
              />
              {isGenerating ? (
                <button
                  type="button"
                  onClick={onStopGeneration}
                  className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-600 rounded text-red-400 hover:text-red-300"
                >
                  <StopCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-600 rounded text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
              )}
            </div>
          </div>
          
          {isListening && (
            <div className="max-w-3xl mx-auto mt-1.5 sm:mt-2 text-center">
              <span className="text-red-400 text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></span>
                Recording... Speak now
              </span>
            </div>
          )}
        </form>
      </div>
    </>
=======
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
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
  );
};