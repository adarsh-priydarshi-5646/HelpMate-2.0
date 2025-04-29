<<<<<<< HEAD
import React, { useState } from 'react';
import { Image as ImageIcon, FileSearch, ChevronDown, ChevronUp, Tag, Eye, TextSelect, Columns as Color, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageAnalysisProps {
  imageUrl: string;
  analysis: any;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageUrl, analysis }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('labels');
  
  let parsedAnalysis;
  try {
    parsedAnalysis = typeof analysis === 'string' ? JSON.parse(analysis) : analysis;
  } catch (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-6 h-6" />
          <p className="text-lg">Failed to analyze image. Please try again.</p>
        </div>
      </div>
    );
  }

  // Handle error state from the API
  if (parsedAnalysis.error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-6 h-6" />
          <p className="text-lg">{parsedAnalysis.error}</p>
        </div>
      </div>
    );
  }

  // If no responses or empty responses, show error
  if (!parsedAnalysis.visionApi?.responses?.[0]) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center gap-3 text-yellow-400">
          <AlertCircle className="w-6 h-6" />
          <p className="text-lg">No analysis results available.</p>
        </div>
      </div>
    );
  }

  const { responses } = parsedAnalysis.visionApi;
  
  const sections = {
    labels: {
      icon: <Tag className="w-5 h-5" />,
      title: 'Labels',
      content: responses[0]?.labelAnnotations?.map((label: any) => ({
        description: label.description,
        confidence: (label.score * 100).toFixed(1)
      })) || []
    },
    objects: {
      icon: <Eye className="w-5 h-5" />,
      title: 'Objects Detected',
      content: responses[0]?.localizedObjectAnnotations?.map((obj: any) => ({
        description: obj.name,
        confidence: (obj.score * 100).toFixed(1)
      })) || []
    },
    text: {
      icon: <TextSelect className="w-5 h-5" />,
      title: 'Text Detection',
      content: responses[0]?.textAnnotations?.[0]?.description || 'No text detected'
    },
    colors: {
      icon: <Color className="w-5 h-5" />,
      title: 'Dominant Colors',
      content: responses[0]?.imagePropertiesAnnotation?.dominantColors?.colors?.map((color: any) => ({
        rgb: color.color,
        score: (color.score * 100).toFixed(1)
      })) || []
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <FileSearch className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-gray-200">Image Analysis</h3>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/3 aspect-square rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Analyzed" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-3">
            {Object.entries(sections).map(([key, section]) => (
              <motion.div
                key={key}
                className="border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-700/50 hover:bg-gray-700/70 transition-colors"
                >
                  <div className="flex items-center gap-2 text-gray-200">
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </div>
                  {expandedSection === key ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                <AnimatePresence>
                  {expandedSection === key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-gray-800">
                        {key === 'text' ? (
                          <p className="text-gray-300 whitespace-pre-line">{section.content}</p>
                        ) : key === 'colors' ? (
                          <div className="grid grid-cols-2 gap-3">
                            {section.content.map((color: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 rounded"
                                  style={{
                                    backgroundColor: `rgb(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue})`
                                  }}
                                />
                                <span className="text-gray-300">{color.score}%</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {section.content.map((item: any, i: number) => (
                              <div key={i} className="flex items-center justify-between">
                                <span className="text-gray-300">{item.description}</span>
                                <span className="text-gray-400">{item.confidence}%</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
=======
import React from 'react';
import { Image as ImageIcon, FileSearch } from 'lucide-react';

interface ImageAnalysisProps {
  imageUrl: string;
  analysis: string;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageUrl, analysis }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-4">
        <div className="relative w-48 h-48 rounded-lg overflow-hidden">
          <img src={imageUrl} alt="Analyzed" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FileSearch className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-gray-200">Image Analysis</h3>
          </div>
          <p className="text-gray-300 whitespace-pre-line">{analysis}</p>
>>>>>>> befea909b854328a5a5196711a23e9cc38d9d475
        </div>
      </div>
    </div>
  );
};