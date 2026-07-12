import { useState } from 'react';
import axios from 'axios';
import { EquationEditor } from './components/EquationEditor';
import { Preview } from './components/Preview';
import { AITeacherPanel } from './components/AITeacherPanel';
import type { GenerateResponse } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (equation: string, theme: string, complexity: string, language: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // In development, assume backend runs on localhost:8000
      const res = await axios.post<GenerateResponse>('http://localhost:8000/api/generate', {
        equation,
        theme,
        complexity,
        language
      });
      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred during generation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tight">
              KalaSutra AI
            </h1>
          </div>
          <p className="hidden md:block text-sm font-medium text-slate-500 italic">
            "Turning equations into understanding, not just art."
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-8rem)]">
          
          {/* Left Pane - Controls */}
          <div className="lg:col-span-3 space-y-6 flex flex-col overflow-y-auto pr-2 pb-6 lg:pb-0">
            <EquationEditor onGenerate={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Center Pane - Animation */}
          <div className="lg:col-span-5 h-[500px] lg:h-full pb-6 lg:pb-0">
            <Preview geometry={response?.data?.rendering || null} />
          </div>

          {/* Right Pane - AI Teacher */}
          <div className="lg:col-span-4 h-[600px] lg:h-full">
            <AITeacherPanel data={response?.data || null} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
