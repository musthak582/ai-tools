import React, { useState } from 'react';
import { CheckCheck, Copy, Sparkles } from '../ui/icons';
import { Button } from '../ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OutputSectionProps {
  result: string | null;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
        <div className="mb-4 p-4 bg-gray-100 rounded-full">
          <Sparkles className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-500 mb-2">AI Generated Result</h3>
        <p className="text-gray-400 text-sm max-w-sm">
          Enter your caption and click "Generate" to see the AI-optimized version here.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
            <Sparkles className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Generated Caption</h3>
            <p className="text-sm text-gray-600">AI-optimized and ready to use</p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className={`transition-all duration-200 font-medium ${
            copied 
              ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
          }`}
        >
          {copied ? (
            <>
              <CheckCheck className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </>
          )}
        </Button>
      </div>

      <Card className="bg-gray-50 border border-gray-200 flex-1 overflow-hidden">
        <CardContent className="p-6 h-full">
          <div className="h-full overflow-y-auto">
            <pre className="text-gray-800 font-normal leading-relaxed whitespace-pre-wrap text-base">
              {result}
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          <span>AI generated content. Review before posting.</span>
        </div>
        <div className="text-gray-600">
          {Math.ceil(result.split(' ').length)} words
        </div>
      </div>
    </div>
  );
};