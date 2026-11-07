import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/mockData';
import { 
  ArrowLeft, 
  RotateCw, 
  Check, 
  Sparkles, 
  Bookmark, 
  HelpCircle, 
  Zap, 
  RotateCcw
} from 'lucide-react';

export const FlashcardsDeck: React.FC = () => {
  const { selectedTopic, setCurrentView } = useApp();
  const topic = selectedTopic || TOPICS[0];
  const cards = topic.premiumContent.flashcards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = (mastered = false) => {
    if (mastered) {
      setMasteredCards((prev) => ({ ...prev, [currentCard.id]: true }));
    }
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCards({});
  };

  const masteredCount = Object.keys(masteredCards).length;
  const progressPercent = Math.round((masteredCount / cards.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <button
          onClick={() => setCurrentView('topic')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Tópico</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Card {currentIndex + 1} de {cards.length}
          </span>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Reiniciar baralho"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barra de Progresso de Domínio */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Domínio do Baralho:</span>
          <span className="font-bold text-indigo-600">
            {masteredCount} de {cards.length} memorizados ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cartão Interativo (Flip Card) */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[320px] bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between relative overflow-hidden group select-none"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded">
            {currentCard.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-indigo-600 transition">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Clique para virar a carta</span>
          </div>
        </div>

        {/* Conteúdo Frente vs Verso */}
        <div className="py-6 text-center space-y-4">
          {!isFlipped ? (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block">
                Pergunta Conceitual:
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 max-w-xl mx-auto leading-relaxed">
                {currentCard.front}
              </h3>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                Resposta & Síntese:
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-800 max-w-xl mx-auto leading-relaxed">
                {currentCard.back}
              </p>

              {currentCard.mnemonic && (
                <div className="inline-block bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-900 font-medium">
                  💡 <strong>Mnemônico:</strong> {currentCard.mnemonic}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Indicador inferior */}
        <div className="text-center text-[11px] text-slate-400">
          {!isFlipped ? 'Clique para checar a resposta' : 'Avalie sua fixação abaixo'}
        </div>
      </div>

      {/* Botões de Ação de Repetição Espaçada (SRS) */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleNext(false)}
          className="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold text-xs transition"
        >
          <span>Difícil</span>
          <span className="text-[10px] font-normal text-rose-600">Rever em breve</span>
        </button>

        <button
          onClick={() => handleNext(false)}
          className="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
        >
          <span>Bom</span>
          <span className="text-[10px] font-normal text-slate-500">Próxima carta</span>
        </button>

        <button
          onClick={() => handleNext(true)}
          className="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition"
        >
          <span>Fácil</span>
          <span className="text-[10px] font-normal text-emerald-600">Dominado!</span>
        </button>
      </div>
    </div>
  );
};
