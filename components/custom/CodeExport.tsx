import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { CTAStyle } from '@/types';

interface CodeExportProps {
  text: string;
  style: CTAStyle;
}

export const CodeExport: React.FC<CodeExportProps> = ({ text, style }) => {
  const [activeTab, setActiveTab] = useState<'tailwind' | 'css'>('tailwind');
  const [copied, setCopied] = useState(false);

  // Helper to find closest Tailwind weight
  const getTwWeight = (w: string) => {
    const map: Record<string, string> = {
      '400': 'font-normal',
      '500': 'font-medium',
      '600': 'font-semibold',
      '700': 'font-bold',
      '800': 'font-extrabold',
    };
    return map[w] || 'font-normal';
  };

  // Generate Tailwind Class String
  const generateTailwind = () => {
    const classes = [
      `bg-[${style.backgroundColor}]`,
      `text-[${style.textColor}]`,
      `text-[${style.fontSize}px]`,
      getTwWeight(style.fontWeight),
      `rounded-[${style.borderRadius}px]`,
      `px-[${style.paddingX}px]`,
      `py-[${style.paddingY}px]`,
      style.hasShadow ? 'shadow-lg' : '',
      'hover:opacity-90',
      'transition-opacity',
    ].filter(Boolean).join(' ');

    return `<button className="${classes}">\n  ${text}\n</button>`;
  };

  // Generate CSS/HTML String
  const generateCSS = () => {
    return `<button style="
  background-color: ${style.backgroundColor};
  color: ${style.textColor};
  font-size: ${style.fontSize}px;
  font-weight: ${style.fontWeight};
  border-radius: ${style.borderRadius}px;
  padding: ${style.paddingY}px ${style.paddingX}px;
  border: none;
  cursor: pointer;
  ${style.hasShadow ? 'box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);' : ''}
">
  ${text}
</button>`;
  };

  const code = activeTab === 'tailwind' ? generateTailwind() : generateCSS();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden text-gray-800 shadow-lg mt-6 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('tailwind')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'tailwind' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Tailwind
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'css' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            HTML/CSS
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm font-medium bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy Code
            </>
          )}
        </button>
      </div>
      <div className="p-5 overflow-x-auto relative bg-gray-50">
        <Code className="absolute right-4 bottom-4 w-10 h-10 text-gray-300 opacity-60 pointer-events-none" />
        <pre className="font-mono text-sm leading-relaxed">
          <code className="text-gray-800">{code}</code>
        </pre>
      </div>
    </div>
  );
};