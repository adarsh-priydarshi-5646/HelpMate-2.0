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
        </div>
      </div>
    </div>
  );
};