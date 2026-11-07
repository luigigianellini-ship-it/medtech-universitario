import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, SUBJECTS } from '../../data/mockData';
import { 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  FileCheck, 
  Lock, 
  ArrowLeft,
  CheckCircle,
  Eye,
  Clock,
  Printer,
  AlertTriangle
} from 'lucide-react';

export const ProtectedReader: React.FC = () => {
  const { 
    selectedTopic, 
    user, 
    isTopicUnlocked, 
    setCurrentView, 
    logPdfDownload, 
    openCheckout 
  } = useApp();

  const topic = selectedTopic || TOPICS[0];
  const isUnlocked = isTopicUnlocked(topic.id);

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadedLog, setDownloadedLog] = useState<any>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Se não estiver desbloqueado, respeita a regra "Zero Paywall de CSS" (não renderiza no cliente)
  if (!isUnlocked) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Acesso Restrito: Módulo Não Liberado
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          O texto integral e o arquivo PDF foram retidos no servidor. Para visualizar o resumo e
          baixar seu PDF carimbado, desbloqueie o pack via Pix.
        </p>
        <button
          onClick={() => openCheckout(undefined, topic)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow"
        >
          Desbloquear Pack (R$ 19,90)
        </button>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      const log = logPdfDownload(topic.title);
      setDownloadedLog(log);
      setIsGeneratingPdf(false);
      setDownloadModalOpen(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-100/60 pb-16">
      {/* 3. MARCA D'ÁGUA FORENSE DE TELA (ANTI-PRINT OVERLAY) */}
      <div className="watermark-overlay" aria-hidden="true">
        <div className="watermark-text-grid">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="text-slate-950 font-mono text-[10px] font-bold tracking-widest whitespace-nowrap opacity-60">
              {user.fullName.toUpperCase()} • CPF {user.cpf} • #{user.id} • LICENÇA EXCLUSIVA
            </div>
          ))}
        </div>
      </div>

      {/* Top Bar do Leitor */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setCurrentView('topic')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Tópico</span>
          </button>

          {/* Atalhos Rápidos */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('simulator')}
              className="flex items-center gap-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulado ({topic.premiumContent.questions.length + 1} Questões)</span>
            </button>

            <button
              onClick={() => setCurrentView('flashcards')}
              className="flex items-center gap-1.5 text-xs font-bold bg-violet-50 text-violet-700 hover:bg-violet-100 px-3 py-1.5 rounded-lg border border-violet-200 transition"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards ({topic.premiumContent.flashcards.length})</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg shadow transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isGeneratingPdf ? 'Carimbando CPF...' : 'Baixar PDF Carimbado'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Container Principal do Documento Esquematizado */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8 unselectable">
          {/* Header do Documento */}
          <header className="border-b border-slate-200 pb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                Material Licenciado • Uso Individual e Intransferível
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Sessão Ativa: {user.activeSessionId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {topic.title}
            </h1>

            {/* Aviso de Proteção Anti-Pirataria */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 leading-relaxed">
                <strong>Proteção Forense Ativa:</strong> Este documento possui caracteres invisíveis
                (Zero-Width Unicode) e marca d&apos;água nominal de tela vinculada ao CPF {user.cpf}. O
                vazamento em drives de terceiros identifica a conta do aluno imediatamente.
              </div>
            </div>
          </header>

          {/* Pontos-Chave Rápidos (Cheat Sheet) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Regras de Ouro para a Prova (Cheat Sheet Cirúrgico)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {topic.premiumContent.cheatSheetPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conteúdo Didático Completo */}
          <div className="text-slate-800 text-sm leading-relaxed space-y-4">
            {topic.premiumContent.fullSummaryMarkdown.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-base font-bold text-slate-900 pt-3 border-t border-slate-100">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('```')) {
                const code = block.replace(/```[a-z]*\n?/g, '');
                return (
                  <pre
                    key={idx}
                    className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800"
                  >
                    <code>{code}</code>
                  </pre>
                );
              }
              if (block.startsWith('|')) {
                return (
                  <div key={idx} className="overflow-x-auto py-2">
                    <div className="text-[11px] font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                      {block}
                    </div>
                  </div>
                );
              }
              return (
                <p key={idx} className="leading-relaxed whitespace-pre-line text-slate-700">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Rodapé do Leitor com Assinaturas */}
          <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Revisado por:</span>
              <span>{topic.reviewer.name}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Cloudflare R2 Key: {topic.premiumContent.pdfDownloadKey}
            </div>
          </footer>
        </article>
      </main>

      {/* Modal de Simulação de PDF Carimbado Forense */}
      {downloadModalOpen && downloadedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    PDF Carimbado Forense Gerado
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Node.js + pdf-lib (tempo: 0.42s)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Fechar
              </button>
            </div>

            {/* Simulação Visual da Folha Carimbada */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-sm relative overflow-hidden">
                <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider mb-2">
                  Prévia do Carimbo no Rodapé de Todas as Folhas:
                </div>

                <div className="bg-slate-900 text-emerald-400 p-2.5 rounded font-mono text-[10px] space-y-0.5 leading-snug">
                  <div>
                    Licenciado para: <strong className="text-white">{downloadedLog.userName}</strong>
                  </div>
                  <div>
                    CPF: <span className="text-white">{downloadedLog.userCpf}</span> • Hash Forense:{' '}
                    <span className="text-amber-400">{downloadedLog.watermarkHash}</span>
                  </div>
                  <div className="text-[9px] text-slate-400">
                    IP: {downloadedLog.ip} • Timestamp: {downloadedLog.timestamp} • Proibida
                    redistribuição
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-600">
                  <h4 className="font-bold text-slate-900">{topic.title}</h4>
                  <p className="text-[11px] text-slate-500">
                    Arquivo vetorial ({topic.premiumContent.pdfPageCount} páginas) com links
                    assinados temporários (TTL de 300 segundos via Cloudflare R2).
                  </p>
                </div>
              </div>

              {/* Registro no Banco de Dados */}
              <div className="text-[11px] text-slate-600 bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-1">
                <span className="font-bold text-emerald-900 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Rastreamento Forense Registrado na Tabela `download_logs`:
                </span>
                <p className="text-emerald-800">
                  Se este PDF for copiado ou compartilhado em grupos de WhatsApp/Telegram, o hash
                  oculto aponta imediatamente para a conta do usuário.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
              >
                Concluir Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
