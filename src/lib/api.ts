import axios from 'axios';
import { getJson } from 'serpapi';
import { createWorker } from 'tesseract.js';
import * as tf from '@tensorflow/tfjs';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
}

interface ApiResponse {
  text: string;
  source?: 'gemini' | 'serpapi';
  searchResults?: SearchResult[];
}

const SERPAPI_KEY = '53036bfcace467c49f66b364dc6645d34d84c45588b400694559024e3cb9d20f';
const GEMINI_KEY = 'AIzaSyDjkfrwMpj3ibzgpweZlDkPURn4x088_hc';
const VISION_API_KEY = 'AIzaSyDjkfrwMpj3ibzgpweZlDkPURn4x088_hc';

const isSearchQuery = (query: string): boolean => {
  const searchKeywords = [
    'search',
    'find',
    'look up',
    'where',
    'what is',
    'who is',
    'when',
    'how to',
    'latest',
    'news about',
    'information about'
  ];
  
  return searchKeywords.some(keyword => 
    query.toLowerCase().includes(keyword)
  );
};

const identityCheck = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('what is your name') || 
      lowerQuery.includes('who are you') ||
      lowerQuery.match(/\byour name\b/)) {
    return "I am Helpmate, your AI assistant. How can I help you today?";
  }
  
  if (lowerQuery.includes('who created you') || 
      lowerQuery.includes('who made you') ||
      lowerQuery.includes('your creator')) {
    return "I was created by Adarsh Priyadarshi. I'm here to assist you with any questions or tasks you have.";
  }
  
  return null;
};

export const analyzeImage = async (imageData: string): Promise<any> => {
  try {
    // Initialize TensorFlow.js
    await tf.ready();
    
    // Load image for TensorFlow.js processing
    const img = new Image();
    img.src = imageData;
    await new Promise(resolve => { img.onload = resolve; });
    
    // Convert image to tensor
    const tensor = tf.browser.fromPixels(img);
    
    // Perform OCR using Tesseract.js
    const worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text: ocrText } } = await worker.recognize(imageData);
    await worker.terminate();

    // Call Google Cloud Vision API
    const response = await axios.post(
      'https://vision.googleapis.com/v1/images:annotate',
      {
        requests: [{
          image: { content: imageData.split(',')[1] },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'TEXT_DETECTION' },
            { type: 'FACE_DETECTION' },
            { type: 'OBJECT_LOCALIZATION' },
            { type: 'IMAGE_PROPERTIES' },
            { type: 'SAFE_SEARCH_DETECTION' }
          ]
        }]
      },
      {
        params: { key: VISION_API_KEY },
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    // Return structured data
    return {
      visionApi: response.data,
      ocrText,
      dimensions: {
        width: tensor.shape[1],
        height: tensor.shape[0]
      }
    };
  } catch (error) {
    console.error('Error analyzing image:', error);
    // Return a properly structured error object
    return {
      error: 'Failed to analyze image. Please try again later.'
    };
  }
};

const searchWithSerpApi = async (query: string): Promise<ApiResponse> => {
  try {
    const response = await getJson({
      engine: 'google',
      q: query,
      api_key: SERPAPI_KEY
    });

    const searchResults = response.organic_results?.map((result: any) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet
    })) || [];

    const summary = `Here are the search results for "${query}":\n\n` +
      searchResults.slice(0, 3).map((result: SearchResult, index: number) => 
        `${index + 1}. ${result.title}\n${result.snippet}\n${result.link}\n`
      ).join('\n');

    return {
      text: summary,
      source: 'serpapi',
      searchResults
    };
  } catch (error) {
    console.error('SerpAPI Error:', error);
    throw new Error('Failed to fetch search results');
  }
};

const generateWithGemini = async (prompt: string, imageData?: string): Promise<ApiResponse> => {
  try {
    const identityResponse = identityCheck(prompt);
    if (identityResponse) {
      return {
        text: identityResponse,
        source: 'gemini'
      };
    }

    let contents: any[] = [{ parts: [{ text: prompt }] }];
    
    if (imageData) {
      const imageAnalysis = await analyzeImage(imageData);
      contents[0].parts.push({
        inlineData: {
          data: imageData.split(',')[1],
          mimeType: 'image/jpeg'
        }
      });
      
      // Enhance prompt with image analysis
      const enhancedPrompt = `
        Analyzing the image with the following details:
        
        Labels: ${imageAnalysis.visionApi.responses[0].labelAnnotations.map((l: any) => l.description).join(', ')}
        
        Text detected: ${imageAnalysis.ocrText}
        
        Objects: ${imageAnalysis.visionApi.responses[0].localizedObjectAnnotations.map((o: any) => o.name).join(', ')}
        
        Please provide a detailed analysis and response to: ${prompt}
      `;
      
      contents[0].parts[0].text = enhancedPrompt;
    }

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      },
      {
        params: { key: GEMINI_KEY },
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I couldn't generate a response at this time.";

    return {
      text,
      source: 'gemini'
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate response');
  }
};

export const generateResponse = async (
  query: string,
  imageData?: string,
  forceSearch = false
): Promise<ApiResponse> => {
  try {
    const identityResponse = identityCheck(query);
    if (identityResponse) {
      return {
        text: identityResponse,
        source: 'gemini'
      };
    }

    if (imageData) {
      return await generateWithGemini(query, imageData);
    }

    if (forceSearch || isSearchQuery(query)) {
      const searchResponse = await searchWithSerpApi(query);
      
      if (query.toLowerCase().includes('explain') || query.toLowerCase().includes('how')) {
        const geminiPrompt = `Based on these search results:\n\n${searchResponse.text}\n\nPlease provide a detailed explanation or answer to: ${query}`;
        const geminiResponse = await generateWithGemini(geminiPrompt);
        
        return {
          text: geminiResponse.text,
          source: 'gemini',
          searchResults: searchResponse.searchResults
        };
      }
      
      return searchResponse;
    }
    
    return await generateWithGemini(query);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};