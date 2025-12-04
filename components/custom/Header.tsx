import React from 'react';
import { usePathname } from 'next/navigation'
import { Sparkles } from '../ui/icons';
import { aiTools } from '@/lib/ai-tools';

export const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="text-center py-8 space-y-4">
      <div className="inline-flex items-center justify-center p-3 bg-black rounded-xl mb-2 border border-gray-300 shadow-sm">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      {aiTools.filter(tool => tool.href == pathname).map((tool) => (
        <div key={tool.id}>
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            {tool.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            {tool.description}
          </p>
        </div>
      ))}
      <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  );
};