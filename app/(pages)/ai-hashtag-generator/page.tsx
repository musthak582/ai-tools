'use client'
import React, { useState } from 'react';
import { AlertCircle, Sparkles } from '@/components/ui/icons';
import { HashtagStyle, Platform } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/custom/Header';
import { Footer } from '@/components/custom/Footer';
import { OutputSection2 } from '@/components/custom/OutputSection2';
import { InputSection2 } from '@/components/custom/InputSection2';
import { generateHashtags } from '@/app/actions/aiHastagGenerator';


const App: React.FC = () => {
  const [caption, setCaption] = useState<string>('');
  const [style, setStyle] = useState<HashtagStyle>(HashtagStyle.TRENDING);
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);

  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!caption.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedResult(null);

    try {
      const result = await generateHashtags(caption, platform, style);
      setGeneratedResult(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Area */}
      <div className="shrink-0 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
        </div>
      </div>

      {/* Main Content - No Scroll Needed */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6">
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section - Left Panel */}
            <Card className="border border-gray-200 shadow-lg h-full flex flex-col bg-white">
              <CardContent className="p-6 lg:p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-black mb-2">Input Configuration</h2>
                  <p className="text-gray-600">Describe your content or paste your caption below.</p>
                </div>

                <div className="flex-1">
                  <InputSection2
                    caption={caption}
                    setCaption={setCaption}
                    style={style}
                    setStyle={setStyle}
                    platform={platform}
                    setPlatform={setPlatform}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !caption.trim()}
                    className="w-full bg-black text-white disabled:bg-gray-300 disabled:text-gray-500 h-12 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 hover:bg-gray-900 active:scale-[0.98] disabled:active:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate AI Hashtags</span>
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section - Right Panel */}
            <div className="h-full flex flex-col">
              <Card className="border border-gray-200 shadow-lg flex-1 flex flex-col bg-white">
                <CardContent className="p-6 lg:p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-black mb-2">AI Generated Result</h2>
                    <p className="text-gray-600">Your optimized hashtags will appear here</p>
                  </div>

                  <div className="flex-1 min-h-0">
                    <OutputSection2 result={generatedResult}/>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full" />
                        <span>Ready for {platform}</span>
                      </div>
                      <span className="font-medium">{style.toLowerCase().replace('_', ' ')} style</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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