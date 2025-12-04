import React from 'react';
import { MessageSquareText } from '../ui/icons';
import { CaptionStyle, Platform } from '@/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InputSectionProps {
  caption: string;
  setCaption: (value: string) => void;
  style: CaptionStyle;
  setStyle: (value: CaptionStyle) => void;
  platform: Platform;
  setPlatform: (value: Platform) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  caption,
  setCaption,
  style,
  setStyle,
  platform,
  setPlatform,
  onGenerate,
  isLoading
}) => {
  const charCount = caption.length;
  const wordCount = caption.trim() === '' ? 0 : caption.trim().split(/\s+/).length;

  return (
    <div className="space-y-8 h-full flex flex-col">
      
      {/* Text Input Area */}
      <div className="space-y-4 flex-1">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium text-black">Your Draft Caption</Label>
          <div className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-700 border border-gray-200">
            {wordCount} words | {charCount} chars
          </div>
        </div>
        <div className="relative flex-1">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Paste your rough draft here... e.g. 'Just had coffee, it was good.'"
            className="w-full h-full min-h-[180px] p-5 text-base bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black resize-none outline-none transition-all placeholder:text-gray-400 text-black font-normal hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
            disabled={isLoading}
          />
          <MessageSquareText className="absolute bottom-5 right-5 text-gray-400 w-5 h-5 pointer-events-none" />
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Style Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-black">Caption Style</Label>
          <Select value={style} onValueChange={(value) => setStyle(value as CaptionStyle)} disabled={isLoading}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-black rounded-lg h-12 px-4 hover:border-gray-400 focus:ring-black focus:ring-2">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 text-black shadow-lg">
              {Object.values(CaptionStyle).map((s) => (
                <SelectItem key={s} value={s} className="focus:bg-gray-100 focus:text-black cursor-pointer">
                  {s.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Platform Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-black">Target Platform</Label>
          <Select value={platform} onValueChange={(value) => setPlatform(value as Platform)} disabled={isLoading}>
            <SelectTrigger className="w-full bg-white border-gray-300 text-black rounded-lg h-12 px-4 hover:border-gray-400 focus:ring-black focus:ring-2">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 text-black shadow-lg">
              {Object.values(Platform).map((p) => (
                <SelectItem key={p} value={p} className="focus:bg-gray-100 focus:text-black cursor-pointer">
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};