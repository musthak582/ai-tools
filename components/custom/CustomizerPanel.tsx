import React from 'react';
import { Settings2, Palette, Type, BoxSelect } from 'lucide-react';
import { CTAStyle } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CustomizerPanelProps {
  style: CTAStyle;
  onChange: (newStyle: CTAStyle) => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  style,
  onChange,
}) => {
  const handleChange = (key: keyof CTAStyle, value: any) => {
    onChange({ ...style, [key]: value });
  };

  const handleFontWeightChange = (value: string) => {
    handleChange('fontWeight', value);
  };

  const fontWeightOptions = [
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semibold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Settings2 className="w-4 h-4 text-slate-500" />
        <h3 className="font-semibold text-slate-700 text-sm">Style Customizer</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Colors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            <Palette className="w-3 h-3" /> Colors
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 mb-1.5">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={style.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded-full border-0 p-0 cursor-pointer overflow-hidden shadow-sm"
                />
                <input
                    type="text"
                    value={style.backgroundColor}
                    onChange={(e) => handleChange('backgroundColor', e.target.value)}
                    className="flex-1 text-xs border border-slate-300 rounded px-2 py-1.5 uppercase font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1.5">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={style.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="w-8 h-8 rounded-full border-0 p-0 cursor-pointer overflow-hidden shadow-sm"
                />
                 <input
                    type="text"
                    value={style.textColor}
                    onChange={(e) => handleChange('textColor', e.target.value)}
                    className="flex-1 text-xs border border-slate-300 rounded px-2 py-1.5 uppercase font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            <Type className="w-3 h-3" /> Typography
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs text-slate-600 mb-1.5">Font Size: {style.fontSize}px</label>
                <input
                    type="range"
                    min="12"
                    max="32"
                    value={style.fontSize}
                    onChange={(e) => handleChange('fontSize', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
             </div>
             <div>
                <label className="block text-xs text-slate-600 mb-1.5">Weight</label>
                <Select value={style.fontWeight} onValueChange={handleFontWeightChange}>
                  <SelectTrigger className="w-full text-xs border border-slate-300 rounded px-2 py-1.5 h-9">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeightOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
             </div>
          </div>
        </div>

        {/* Layout */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            <BoxSelect className="w-3 h-3" /> Layout
          </div>
          
          <div>
            <label className="block text-xs text-slate-600 mb-1.5">Corner Radius: {style.borderRadius}px</label>
             <input
                type="range"
                min="0"
                max="50"
                value={style.borderRadius}
                onChange={(e) => handleChange('borderRadius', Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs text-slate-600 mb-1.5">Padding X: {style.paddingX}px</label>
                 <input
                    type="range"
                    min="4"
                    max="64"
                    value={style.paddingX}
                    onChange={(e) => handleChange('paddingX', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
             </div>
             <div>
                <label className="block text-xs text-slate-600 mb-1.5">Padding Y: {style.paddingY}px</label>
                 <input
                    type="range"
                    min="4"
                    max="32"
                    value={style.paddingY}
                    onChange={(e) => handleChange('paddingY', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
             </div>
          </div>
        </div>

         {/* Effects */}
         <div className="space-y-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Drop Shadow</span>
            <button 
                onClick={() => handleChange('hasShadow', !style.hasShadow)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${style.hasShadow ? 'bg-black' : 'bg-slate-300'}`}
            >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${style.hasShadow ? 'translate-x-5' : ''}`} />
            </button>
         </div>
      </div>
    </div>
  );
};