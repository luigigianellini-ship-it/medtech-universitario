import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, SUBJECTS, COURSES } from '../../data/mockData';
import { 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Lock, 
  Zap, 
  Sparkles, 
  Download, 
  Layers, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookMarked
} from 'lucide-react';

export const TopicGoldPage: React.FC = () => {
  const { 
    selectedTopic, 
    setCurrentView, 
    isTopicUnlocked, 
    openCheckout,
    user
  } = useApp();

  const topic = selectedTopic || TOPICS[0];
  const subject = SUBJECTS.find((s) => s.id === topic.subjectId);
  const course = COURSES.find((c) => c.id === subject?.courseId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswerExplanation, setShowAnswerExplanation] = useState(false);

  const isUnlocked = isTopicUnlocked(topic.id);

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
    setShowAnswerExplanation(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <button
          onClick={() => setCurrentView('catalog')}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para matérias de {course?.name}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500">
            {course?.name} &gt; {subject?.name}
          </span>
          {isUnlocked ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Pack Liberado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              Trava Server-Side Ativa
            </span>
          )}
        </div>
      </div>

      {/* Título & Badge de Prova */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
            Tronco Comum MEC • {topic.semester}º Semestre
          </span>
          <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded">
            Cai com frequência em P1 / P2
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {topic.title}
        </h1>
      </div>

      {/* 1. ANATOMIA: SELO DE REVISÃO HUMANA (AUTOR + REVISOR + BIBLIOGRAFIA MEC) */}
      <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Selo de Revisão Humana Obrigatória (Trava de Dupla Assinatura)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
          {/* Autor */}
          <div className="flex items-center gap-3">
            <img
              src={topic.author.avatar}
              alt={topic.author.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700"
            />
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                Redação Original (Sócio Especialista)
              </span>
              <strong className="text-sm font-bold text-white block">{topic.author.name}</strong>
              <p className="text-[11px] text-slate-300">{topic.author.role}</p>
              {topic.author.crmCrfCref && (
                <span className="text-[10px] text-emerald-400 font-mono">
                  {topic.author.crmCrfCref}
                </span>
              )}
            </div>
          </div>

          {/* Revisor */}
          <div className="flex items-center gap-3">
            <img
              src={topic.reviewer.avatar}
              alt={topic.reviewer.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700"
            />
            <div>
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                Revisão e Validação Técnica (2º Sócio)
              </span>
              <strong className="text-sm font-bold text-white block">{topic.reviewer.name}</strong>
              <p className="text-[11px] text-slate-300">{topic.reviewer.role}</p>
              {topic.reviewer.crmCrfCref && (
                <span className="text-[10px] text-emerald-400 font-mono">
                  {topic.reviewer.crmCrfCref}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Citação da Bibliografia MEC */}
        <div className="pt-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Bibliografia Referencial Formal (Tronco Comum MEC):
          </span>
          <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
            {topic.mecBibliography.map((bib, idx) => (
              <li key={idx} className="font-serif italic text-slate-300">
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. ANATOMIA: CAMADA GRATUITA (ISCA SEO PARA O GOOGLE E PROVA DIDÁTICA) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              1. Conceito Fundamental (Camada Gratuita / Isca SEO)
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Aberto para Indexação Google
          </span>
        </div>

        {/* Texto do Conceito */}
        <div className="text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
          {topic.freeContent.conceptIntro}
        </div>

        {/* Tabela Comparativa */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Tabela de Síntese Imediata:
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {topic.freeContent.comparisonTable.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 text-left font-bold text-slate-700 uppercase tracking-wider text-[11px]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {topic.freeContent.comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    {row.map((col, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-4 py-3 text-slate-700 ${
                          cIdx === 0 ? 'font-bold text-slate-900' : ''
                        }`}
                      >
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 1 Questão Resolvida Passo a Passo (Prova Didática) */}
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Questão de Amostra Resolvida Passo a Passo:</span>
            </h3>
            <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              Dificuldade: {topic.freeContent.solvedQuestion.difficulty}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <p className="text-xs font-semibold text-slate-900 leading-relaxed">
              {topic.freeContent.solvedQuestion.prompt}
            </p>

            {/* Alternativas Interativas */}
            <div className="space-y-1.5">
              {topic.freeContent.solvedQuestion.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === topic.freeContent.solvedQuestion.correctIndex;

                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                if (showAnswerExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-50 border-indigo-400 text-indigo-900';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start gap-2 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Resolução Explicada */}
            {showAnswerExplanation && (
              <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-950 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Resolução Comentada da Banca:</span>
                </div>
                <p className="leading-relaxed">{topic.freeContent.solvedQuestion.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3 & 4. ANATOMIA: TRAVA SERVER-SIDE (PAYWALL) & CHECKOUT DIRETO */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 shadow-xl">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Conteúdo Protegido por Validação Server-Side</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Pack Completo de Socorro para a P1 / P2
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Zero Paywall de CSS frágil: o material exclusivo só é entregue após validação HMAC
                criptográfica.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 line-through block">De R$ 39,90</span>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-xs text-emerald-400 font-bold">Por apenas</span>
                <span className="text-3xl font-black text-white">R$ 19,90</span>
              </div>
              <span className="text-[10px] text-slate-400">Pagamento único via Pix sem mensalidade</span>
            </div>
          </div>

          {/* Grade de Recursos Exclusivos do Módulo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recurso 1 */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-white">
                PDF Esquematizado ({topic.premiumContent.pdfPageCount} Páginas)
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Diagramas de alta resolução prontos para imprimir ou estudar no iPad/Tablet, com
                carimbo forense no seu CPF.
              </p>
            </div>

            {/* Recurso 2 */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-white">
                15 Questões de Prova Comentadas
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Simulador de prova cronometrado que aponta por que cada pegadinha de vestibular e
                faculdade está errada.
              </p>
            </div>

            {/* Recurso 3 */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs text-white">
                Baralho de 20 Flashcards SRS
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Algoritmo de repetição espaçada e mnemônicos rápidos para revisar a matéria inteira
                em 10 minutos no ônibus.
              </p>
            </div>
          </div>

          {/* Botão de Ação / Checkout Direto */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Liberação imediata em 2 segundos via Pix (HMAC SHA-256)</span>
            </div>

            {isUnlocked ? (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCurrentView('reader')}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition shadow-lg shadow-emerald-500/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Abrir Leitor Completo</span>
                </button>
                <button
                  onClick={() => setCurrentView('simulator')}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Simulador de Prova</span>
                </button>
                <button
                  onClick={() => setCurrentView('flashcards')}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition"
                >
                  <Layers className="w-4 h-4" />
                  <span>Flashcards</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openCheckout(undefined, topic)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-sm px-8 py-3.5 rounded-xl transition shadow-xl shadow-emerald-500/25 cursor-pointer hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Liberar Este Pack via Pix por R$ 19,90</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
