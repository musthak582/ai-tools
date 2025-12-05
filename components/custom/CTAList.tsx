import React, { useState } from 'react';
import { Copy, Check, MousePointerClick, RefreshCw } from 'lucide-react';
import { GeneratedCTA } from '@/types';

interface CTAListProps {
  ctas: GeneratedCTA[];
  onApply: (text: string) => void;
  onRegenerate: () => void;
  isLoading: boolean;
}

export const CTAList: React.FC<CTAListProps> = ({
  ctas,
  onApply,
  onRegenerate,
  isLoading,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (ctas.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
        <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
          <MousePointerClick className="w-6 h-6 text-slate-400" />
        </div>
        <p>Your AI-generated suggestions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Results</h3>
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="text-xs flex items-center gap-1 text-black hover:text-slate-900 font-medium disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
      </div>

      <div className="grid gap-3">
        {ctas.map((cta) => (
          <div
            key={cta.id}
            className="group bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-black hover:shadow-md transition-all flex items-center justify-between"
          >
            <span className="font-medium text-slate-800">{cta.text}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(cta.id, cta.text)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors relative"
                title="Copy text"
              >
                {copiedId === cta.id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => onApply(cta.text)}
                className="text-xs bg-slate-100 text-slate-600 hover:text-black px-3 py-1.5 rounded-md font-medium border border-slate-200 hover:border-black transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};