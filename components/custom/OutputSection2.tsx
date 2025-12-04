import { CheckCheck, Copy, FileText, Hash, List, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';

interface OutputSectionProps2 {
  result: string | null;
}

export const OutputSection2: React.FC<OutputSectionProps2> = ({ result }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <RefreshCw className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No hashtags yet</h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Enter your topic and click generate to see AI-powered hashtags here.
        </p>
      </div>
    );
  }

  // Formatting options
  const getStandard = () => result;
  const getNoHash = () => result.replace(/#/g, '');
  const getComma = () => result.replace(/#/g, '').split(' ').join(', ');
  const getLines = () => result.split(' ').join('\n');

  const handleCopy = (type: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  // Style helper for buttons
  const styles = (type: string) =>
    `flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all 
    ${copiedType === type ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-300" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}
  `;

  return (
    <div className="flex flex-col h-full gap-4">

      {/* Output Section */}
      <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-5 overflow-y-auto">
        <p className="text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
          {result}
        </p>
      </div>

      {/* Copy Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        <button onClick={() => handleCopy('standard', getStandard())} className={styles('standard')}>
          {copiedType === 'standard' ? <CheckCheck className="w-4 h-4 text-green-700" /> : <Hash className="w-4 h-4 text-gray-500" />}
          Copy Standard
        </button>

        <button onClick={() => handleCopy('nohash', getNoHash())} className={styles('nohash')}>
          {copiedType === 'nohash' ? <CheckCheck className="w-4 h-4 text-green-700" /> : <FileText className="w-4 h-4 text-gray-500" />}
          No Hash Symbols
        </button>

        <button onClick={() => handleCopy('comma', getComma())} className={styles('comma')}>
          {copiedType === 'comma' ? <CheckCheck className="w-4 h-4 text-green-700" /> : <List className="w-4 h-4 text-gray-500" />}
          Comma Separated
        </button>

        <button onClick={() => handleCopy('lines', getLines())} className={styles('lines')}>
          {copiedType === 'lines' ? <CheckCheck className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4 text-gray-500" />}
          Line by Line
        </button>
      </div>
    </div>
  );
};
