import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface EquationEditorProps {
  onGenerate: (equation: string, theme: string, complexity: string, language: string) => void;
  isLoading: boolean;
}

export function EquationEditor({ onGenerate, isLoading }: EquationEditorProps) {
  const [equation, setEquation] = useState('r = sin(8θ)');
  const [theme, setTheme] = useState('rangoli');
  const [complexity, setComplexity] = useState('medium');
  const [language, setLanguage] = useState('English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(equation, theme, complexity, language);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span>✨</span> KalaSutra Canvas
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Mathematical Equation
          </label>
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="e.g. r = sin(8θ)"
            required
          />
          <p className="text-xs text-slate-500 mt-1">Try polar equations for beautiful symmetries.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cultural Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
          >
            <option value="rangoli">Rangoli</option>
            <option value="mandala">Mandala</option>
            <option value="kolam">Kolam</option>
            <option value="alpana">Alpana</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Complexity
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
          >
            <option value="low">Minimal (Low)</option>
            <option value="medium">Balanced (Medium)</option>
            <option value="high">Intricate (High)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Teacher Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Bengali">Bengali</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Generate Pattern
            </>
          )}
        </button>
      </form>
    </div>
  );
}
