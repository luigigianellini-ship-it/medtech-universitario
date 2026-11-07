import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, SUBJECTS, COURSES } from '../../data/mockData';
import { Search, BookOpen, ChevronRight, Zap, Sparkles } from 'lucide-react';

// Função utilitária de busca tolerante a erros (Fuzzy matching)
function normalizeStr(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Distância simples de Levenshtein para pequenas variações de digitação
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export const FuzzySearchBar: React.FC = () => {
  const { setSelectedTopic, setCurrentView } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = normalizeStr(searchTerm);

    return TOPICS.map((topic) => {
      const subject = SUBJECTS.find((s) => s.id === topic.subjectId);
      const course = COURSES.find((c) => c.id === subject?.courseId);

      const topicTitleNorm = normalizeStr(topic.title);
      const subjectNameNorm = normalizeStr(subject?.name || '');
      const courseNameNorm = normalizeStr(course?.name || '');

      let score = 0;

      // Substring exata
      if (topicTitleNorm.includes(term)) score += 10;
      if (subjectNameNorm.includes(term)) score += 8;
      if (courseNameNorm.includes(term)) score += 5;

      // Tolerância a erros (fuzzy match de palavras)
      const words = term.split(/\s+/);
      for (const word of words) {
        if (word.length < 3) continue;
        const topicWords = topicTitleNorm.split(/\s+/);
        for (const tWord of topicWords) {
          const dist = levenshteinDistance(word, tWord);
          if (dist <= 2) score += 6 - dist;
        }
      }

      return {
        topic,
        subject,
        course,
        score,
      };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [searchTerm]);

  const handleSelectTopic = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
    setSearchTerm('');
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center bg-white rounded-2xl border transition shadow-sm ${
          isFocused ? 'border-indigo-600 ring-4 ring-indigo-500/10 shadow-md' : 'border-slate-300'
        }`}
      >
        <div className="pl-4 text-slate-400">
          <Search className="w-5 h-5 text-indigo-500" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Busca com tolerância a erros: digite 'cinesologia', 'algoritimo', 'arvores'..."
          className="w-full py-3.5 pl-3 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:outline-none rounded-2xl"
        />
        <div className="absolute right-3 hidden sm:flex items-center gap-1 bg-slate-100 text-slate-500 text-[10px] font-semibold px-2 py-1 rounded">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Fuzzy pg_trgm</span>
        </div>
      </div>

      {/* Resultados da Busca */}
      {isFocused && searchTerm.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
          <div className="p-2.5 bg-slate-50 text-[11px] font-semibold text-slate-500 flex items-center justify-between">
            <span>Resultados correspondentes (tolerante a erros de digitação):</span>
            <span className="text-indigo-600 font-bold">{results.length} encontrado(s)</span>
          </div>

          {results.length > 0 ? (
            results.map(({ topic, subject, course }) => (
              <button
                key={topic.id}
                onMouseDown={() => handleSelectTopic(topic)}
                className="w-full text-left p-3.5 hover:bg-indigo-50/60 transition flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {course?.name}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{subject?.name}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                    {topic.title}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-slate-500 text-xs">
              Nenhum resumo encontrado para &quot;{searchTerm}&quot;. Você pode pedir aos sócios na fila
              de resumos!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
