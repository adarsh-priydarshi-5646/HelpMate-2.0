import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { SearchResult } from '../types';

interface SearchResultsProps {
  results: SearchResult[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div key={index} className="bg-gray-700/50 rounded-lg p-4">
          <a
            href={result.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2"
          >
            {result.title}
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-gray-300 mt-2">{result.snippet}</p>
        </div>
      ))}
    </div>
  );
};