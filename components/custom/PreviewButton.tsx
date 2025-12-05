import { CTAStyle } from '@/types';
import React from 'react';


interface PreviewButtonProps {
  text: string;
  style: CTAStyle;
  onTextChange: (val: string) => void;
}

export const PreviewButton: React.FC<PreviewButtonProps> = ({
  text,
  style,
  onTextChange
}) => {
  // Construct dynamic styles
  const btnStyle: React.CSSProperties = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    borderRadius: `${style.borderRadius}px`,
    padding: `${style.paddingY}px ${style.paddingX}px`,
    boxShadow: style.hasShadow ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    lineHeight: '1.2',
  };

  return (
    <div className="w-full bg-slate-100 rounded-xl border border-slate-200 min-h-[250px] flex flex-col items-center justify-center p-8 relative pattern-grid">
      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200">
        Live Preview
      </div>
      
      {/* Pattern background overlay (CSS only) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <button style={btnStyle} className="hover:opacity-90 active:scale-95 text-center max-w-full break-words">
        {text || "Your CTA Here"}
      </button>

      <div className="mt-8 w-full max-w-xs">
          <label className="block text-xs font-medium text-slate-500 mb-1 text-center">Edit Text Manually</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full text-center bg-white border border-slate-300 rounded px-3 py-1.5 text-sm focus:border-black outline-none"
            placeholder="Type button text..."
          />
      </div>
    </div>
  );
};