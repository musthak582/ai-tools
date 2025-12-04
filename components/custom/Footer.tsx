import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center">
      <p className="text-gray-600 text-sm font-light">
        © {new Date().getFullYear()} AI ToolSuite. All rights reserved.
      </p>
      <div className="mt-3 flex items-center justify-center gap-3 text-xs text-gray-500">
        <div className="h-px w-8 bg-gray-300"></div>
        <span>Powered by Gemini 2.5 Flash</span>
        <div className="h-px w-8 bg-gray-300"></div>
      </div>
    </footer>
  );
};