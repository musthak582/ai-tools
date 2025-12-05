'use client'

import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { CTAStyle, GeneratedCTA, InputState, Tone } from '@/types';
import { generateCTAs } from '@/app/actions/aiCtaButtonGenerator';
import { CTAInputForm } from '@/components/custom/CTAInputForm';
import { CTAList } from '@/components/custom/CTAList';
import { PreviewButton } from '@/components/custom/PreviewButton';
import { CustomizerPanel } from '@/components/custom/CustomizerPanel';
import { CodeExport } from '@/components/custom/CodeExport';
import { Header } from '@/components/custom/Header';
import { Footer } from '@/components/custom/Footer';

const App: React.FC = () => {
  // --- State ---
  const [inputState, setInputState] = useState<InputState>({
    product: '',
    niche: '',
    tone: Tone.Default,
  });

  const [generatedCtas, setGeneratedCtas] = useState<GeneratedCTA[]>([]);
  const [loading, setLoading] = useState(false);

  const [previewText, setPreviewText] = useState('Get Started Now');

  const [style, setStyle] = useState<CTAStyle>({
    backgroundColor: '#2563EB', // Blue-600
    textColor: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    borderRadius: 8,
    paddingX: 24,
    paddingY: 12,
    hasShadow: true,
  });

  // --- Handlers ---
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const results = await generateCTAs(inputState.product, inputState.niche, inputState.tone);
      const formatted: GeneratedCTA[] = results.map((text, i) => ({
        text,
        id: `cta-${Date.now()}-${i}`,
      }));
      setGeneratedCtas(formatted);
    } catch (error) {
      console.error(error);
      alert('Failed to generate CTAs. Please check your API key or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCTA = (text: string) => {
    setPreviewText(text);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Area */}
      <div className="shrink-0 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Input & Results */}
          <div className="lg:col-span-5 space-y-6">
            <section aria-label="Input Form">
              <CTAInputForm
                inputState={inputState}
                setInputState={setInputState}
                onGenerate={handleGenerate}
                isLoading={loading}
              />
            </section>

            <section aria-label="Generated Results">
              <CTAList
                ctas={generatedCtas}
                onApply={handleApplyCTA}
                onRegenerate={handleGenerate}
                isLoading={loading}
              />
            </section>
          </div>

          {/* RIGHT COLUMN: Preview & Customizer */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
              <PreviewButton
                text={previewText}
                style={style}
                onTextChange={setPreviewText}
              />
            </div>

            <CustomizerPanel
              style={style}
              onChange={setStyle}
            />

            <CodeExport
              text={previewText}
              style={style}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="shrink-0 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;