import { supabase } from './supabase';
import type { Memory, Message } from '../types';

export const extractKeywords = (text: string): string[] => {
  // Simple keyword extraction - remove common words and extract important terms
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'is', 'am', 'are', 'was', 'were'];
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  // Return unique keywords
  return [...new Set(words)];
};

export const storeMemory = async (userId: string, content: string, category?: string): Promise<Memory | null> => {
  try {
    const keywords = extractKeywords(content);
    
    const { data, error } = await supabase
      .from('memories')
      .insert({
        user_id: userId,
        content,
        keywords,
        category,
        timestamp: new Date(),
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error storing memory:', error);
      return null;
    }
    
    return {
      id: data.id,
      userId: data.user_id,
      content: data.content,
      keywords: data.keywords,
      timestamp: new Date(data.timestamp),
      category: data.category,
      source: data.source || 'chat',
    };
  } catch (error) {
    console.error('Error in storeMemory:', error);
    return null;
  }
};

export const searchMemories = async (userId: string, query: string): Promise<Memory[]> => {
  try {
    const keywords = extractKeywords(query);
    
    if (keywords.length === 0) return [];
    
    // Search for memories that contain any of the keywords
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('user_id', userId)
      .contains('keywords', keywords)
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error searching memories:', error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      userId: item.user_id,
      content: item.content,
      keywords: item.keywords,
      timestamp: new Date(item.timestamp),
      category: item.category,
      source: item.source || 'chat',
    }));
  } catch (error) {
    console.error('Error in searchMemories:', error);
    return [];
  }
};

export const extractMemoryFromMessages = (messages: Message[]): string[] => {
  // Extract important information from previous messages
  return messages
    .filter(msg => msg.role === 'user')
    .map(msg => msg.content);
};

export const formatMemoryContext = (memories: Memory[]): string => {
  if (memories.length === 0) return '';
  
  // Format memories into a readable context
  return memories
    .slice(0, 3) // Limit to most recent/relevant memories
    .map(memory => `- ${memory.content}`)
    .join('\n');
};