import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { InputState, Tone } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CTAInputFormProps {
  inputState: InputState;
  setInputState: React.Dispatch<React.SetStateAction<InputState>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const CTAInputForm: React.FC<CTAInputFormProps> = ({
  inputState,
  setInputState,
  onGenerate,
  isLoading,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  };

  const handleToneChange = (value: Tone) => {
    setInputState((prev) => ({ ...prev, tone: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-slate-100 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-black" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Define Your Goal</h2>
      </div>

      <div>
        <label htmlFor="product" className="block text-sm font-medium text-slate-700 mb-1">
          Product / Goal <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="product"
          name="product"
          value={inputState.product}
          onChange={handleChange}
          placeholder="e.g. SaaS Analytics Tool, E-book download, Newsletter signup"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div>
        <label htmlFor="niche" className="block text-sm font-medium text-slate-700 mb-1">
          Target Audience / Niche
        </label>
        <input
          type="text"
          id="niche"
          name="niche"
          value={inputState.niche}
          onChange={handleChange}
          placeholder="e.g. Startup founders, Fitness enthusiasts, Developers"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tone
        </label>
        <Select value={inputState.tone} onValueChange={handleToneChange}>
          <SelectTrigger className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-white">
            <SelectValue placeholder="Select a tone" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Tone).map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !inputState.product.trim()}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-medium transition-all ${
          isLoading || !inputState.product.trim()
            ? 'bg-black cursor-not-allowed'
            : 'bg-black hover:bg-slate-900 shadow-md hover:shadow-lg active:transform active:scale-[0.98]'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate CTA
          </>
        )}
      </button>
    </div>
  );
};