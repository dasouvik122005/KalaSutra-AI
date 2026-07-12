import { BookOpen, Lightbulb, BrainCircuit, Target, CheckCircle2 } from 'lucide-react';
import type { GemmaTeachingResponse } from '../types';

interface AITeacherPanelProps {
  data: GemmaTeachingResponse | null;
}

export function AITeacherPanel({ data }: AITeacherPanelProps) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center min-h-[400px]">
        <BrainCircuit className="w-16 h-16 mb-4 text-slate-300 opacity-50" />
        <h3 className="text-xl font-medium text-slate-500 mb-2">AI Teacher Waiting</h3>
        <p className="max-w-xs mx-auto">Generate a pattern to start your interactive learning session.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" />
          AI Teacher ⭐
        </h2>
        <div className="flex gap-4 mt-3 text-purple-100 text-sm">
          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {data.concept}</span>
          <span className="flex items-center gap-1"><Target className="w-4 h-4" /> {data.difficulty}</span>
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1 space-y-8">
        
        {/* Explanation Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Concept Explanation
          </h3>
          <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed bg-amber-50 rounded-xl p-4 border border-amber-100">
            {data.explanation}
          </div>
        </section>

        {/* Real Life Connection */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800 mb-3">🌍 Real Life Connection</h3>
          <div className="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
            {data.real_life_connection}
          </div>
        </section>

        {/* Concept Mapping / Symmetry */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800 mb-3">🔄 Symmetry Detected</h3>
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium border border-indigo-100">
            {data.symmetry}
          </div>
        </section>

        {/* Quick Quiz */}
        {data.quiz && data.quiz.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Knowledge Check
            </h3>
            <div className="space-y-4">
              {data.quiz.map((q, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-indigo-300 transition-colors">
                  <p className="font-medium text-slate-800 text-sm mb-3">{idx + 1}. {q.question}</p>
                  
                  {q.type === 'mcq' && q.options && (
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <label key={oIdx} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer p-2 hover:bg-slate-50 rounded-md">
                          <input type="radio" name={`q-${idx}`} className="text-indigo-600 focus:ring-indigo-500" />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {(q.type === 'short_answer' || q.type === 'fill_in_the_blank') && (
                    <input 
                      type="text" 
                      placeholder="Your answer..." 
                      className="w-full text-sm border-b border-slate-300 bg-transparent px-2 py-1 focus:outline-none focus:border-indigo-500"
                    />
                  )}

                  <details className="mt-4 group">
                    <summary className="text-xs font-medium text-indigo-600 cursor-pointer select-none">Show Answer</summary>
                    <p className="text-sm text-slate-600 mt-2 p-2 bg-indigo-50 rounded-md">
                      {q.answer}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
