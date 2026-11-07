import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/mockData';
import { 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExamSimulator: React.FC = () => {
  const { selectedTopic, setCurrentView } = useApp();
  const topic = selectedTopic || TOPICS[0];

  // Combina a questão gratuita com as questões premium do tópico
  const allQuestions = [
    topic.freeContent.solvedQuestion,
    ...topic.premiumContent.questions,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutos de prova

  // Cronômetro
  useEffect(() => {
    if (isFinished || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, secondsLeft]);

  const currentQ = allQuestions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    let correct = 0;
    allQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct++;
    });
    const percentage = (correct / allQuestions.length) * 100;
    if (percentage >= 70) {
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsFinished(false);
    setCurrentIndex(0);
    setSecondsLeft(600);
  };

  // Cálculo da Nota
  const score = allQuestions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);

  const grade10 = ((score / allQuestions.length) * 10).toFixed(1);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar com Cronômetro e Navegação */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={() => setCurrentView('topic')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Tópico</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-1.5 rounded-xl font-mono text-xs shadow-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Questão {currentIndex + 1} de {allQuestions.length}
          </span>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header da Questão */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded">
              {topic.title} • Simulado Oficial
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Dificuldade: {currentQ.difficulty}
            </span>
          </div>

          {/* Enunciado */}
          <div className="text-sm font-semibold text-slate-900 leading-relaxed">
            {currentQ.prompt}
          </div>

          {/* Alternativas */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentIndex] === oIdx;

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1 leading-snug pt-0.5">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navegação entre Questões */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="text-xs font-semibold px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              Anterior
            </button>

            <div className="flex items-center gap-1.5">
              {allQuestions.map((_, qIdx) => (
                <button
                  key={qIdx}
                  onClick={() => setCurrentIndex(qIdx)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition ${
                    qIdx === currentIndex
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : selectedAnswers[qIdx] !== undefined
                      ? 'bg-slate-200 text-slate-800'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {qIdx + 1}
                </button>
              ))}
            </div>

            {currentIndex < allQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
              >
                Próxima
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition shadow"
              >
                Finalizar e Ver Gabarito
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Tela de Resultado & Gabarito Comentado */
        <div className="space-y-6 animate-scale-up">
          {/* Card de Desempenho */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Diagnóstico de Desempenho para a Prova
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Sua Nota Estimada: {grade10} / 10.0
              </h2>
              <p className="text-xs text-slate-600 max-w-md">
                Você acertou {score} de {allQuestions.length} questões.
                {Number(grade10) >= 7.0
                  ? ' Excelente aproveitamento! Você domina os conceitos mais cobrados de banca.'
                  : ' Atenção: revise os mnemônicos e as questões erradas antes da prova.'}
              </p>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refazer Simulado</span>
              </button>
              <button
                onClick={() => setCurrentView('flashcards')}
                className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-5 py-2.5 rounded-xl transition"
              >
                <span>Treinar Flashcards</span>
              </button>
            </div>
          </div>

          {/* Gabarito Comentado Completo */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              Gabarito Comentado Questão a Questão:
            </h3>

            {allQuestions.map((q, idx) => {
              const selected = selectedAnswers[idx];
              const isCorrect = selected === q.correctIndex;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border bg-white shadow-sm space-y-3 ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Questão #{idx + 1}</span>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Acertou
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        Errou
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-slate-900">{q.prompt}</p>

                  <div className="text-xs space-y-1">
                    <div className="text-slate-600">
                      <strong>Sua resposta:</strong>{' '}
                      {selected !== undefined
                        ? `${String.fromCharCode(65 + selected)}) ${q.options[selected]}`
                        : 'Não respondida'}
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-700 font-semibold">
                        <strong>Gabarito Oficial:</strong>{' '}
                        {`${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}`}
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-200">
                    <strong className="text-indigo-900 block mb-1">Explicação do Sócio Especialista:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
