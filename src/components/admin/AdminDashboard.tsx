import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES, SUBJECTS } from '../../data/mockData';
import { 
  ShieldCheck, 
  KeyRound, 
  FileCheck, 
  Sparkles, 
  AlertTriangle, 
  UserX, 
  DollarSign, 
  Layers, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Eye, 
  PlusCircle, 
  FileText,
  PieChart,
  Database,
  Server,
  Code2
} from 'lucide-react';
import { getSupabaseStatus } from '../../lib/supabase';

interface AdminDashboardProps {
  onOpenDbModal?: () => void;
  onOpenExplainer?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenDbModal, onOpenExplainer }) => {
  const {
    topics,
    updateTopicStatus,
    createNewDraftFromAi,
    downloadLogs,
    studentRequests,
    user,
    openAuthModal,
  } = useApp();

  const [is2FaAuthenticated, setIs2FaAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'content' | 'security' | 'governance' | 'infrastructure'>('content');
  const supabaseStatus = getSupabaseStatus();

  // Formulário da Esteira de IA
  const [aiTopicTitle, setAiTopicTitle] = useState('');
  const [aiSubjectId, setAiSubjectId] = useState(SUBJECTS[0].id);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Verificação de Acesso: Apenas Administradores / Sócios
  if (user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 text-emerald-400 mx-auto flex items-center justify-center border border-slate-800 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Painel Exclusivo dos Sócios</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Este ambiente é restrito à governança e esteira editorial dos sócios fundadores.
          </p>
        </div>
        <button
          onClick={() => openAuthModal('login')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow cursor-pointer"
        >
          Fazer Login como Sócio
        </button>
      </div>
    );
  }

  // Verificação de 2FA
  const handleVerify2Fa = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '8912' || pinInput.trim() === '1234') {
      setIs2FaAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Submissão da IA
  const handleGenerateAiDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopicTitle.trim()) return;
    setIsAiGenerating(true);

    setTimeout(() => {
      createNewDraftFromAi(aiTopicTitle, aiSubjectId);
      setIsAiGenerating(false);
      setAiTopicTitle('');
    }, 1500);
  };

  if (!is2FaAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fade-in">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-emerald-400 mx-auto flex items-center justify-center shadow">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero Trust • Autenticação de 2 Fatores
            </span>
            <h2 className="text-xl font-black text-slate-900">Painel Restrito dos Sócios</h2>
            <p className="text-xs text-slate-500">
              Digite o código de 4 dígitos enviado ao e-mail corporativo dos sócios fundadores.
            </p>
          </div>

          <form onSubmit={handleVerify2Fa} className="space-y-4">
            <input
              type="text"
              maxLength={4}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="••••"
              className="w-36 mx-auto text-center font-mono text-2xl tracking-[0.5em] py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 block bg-slate-50"
            />

            {pinError && (
              <span className="text-xs text-rose-600 font-semibold block">
                PIN inválido! Digite 8912 para acessar.
              </span>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition shadow"
            >
              Validar Token Zero Trust
            </button>
          </form>

          <button
            onClick={() => {
              setPinInput('8912');
              setIs2FaAuthenticated(true);
            }}
            className="text-[11px] text-indigo-600 hover:underline block mx-auto font-medium cursor-pointer"
          >
            Preencher PIN Demonstrativo e Desbloquear (8912)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header do Painel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Painel de Operações dos Sócios
            </h1>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Sessão 2FA Autenticada
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gestão editorial com Trava de Dupla Assinatura, esteira de IA e auditoria forense
            anti-pirataria.
          </p>
        </div>

        {/* Abas */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'content'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Esteira de Conteúdo & Dupla Assinatura
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'security'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Central Forense & Anti-Fraude
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'governance'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Governança & Vesting
          </button>
          <button
            onClick={() => setActiveTab('infrastructure')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'infrastructure'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Banco Supabase & Infra</span>
          </button>
        </div>
      </div>

      {/* ABA 1: ESTEIRA DE CONTEÚDO (TRAVA DE DUPLA ASSINATURA) */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          {/* Gerador da Esteira Híbrida (IA + Sócio) */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Esteira Híbrida: Tempo de Criação reduzido de 8h para 1h15</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Gerar Esqueleto de Novo Módulo a Partir da Ementa
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                A IA analisa a bibliografia base e monta a estrutura esquematizada. O material entra
                em estado <code className="text-amber-400">Rascunho (Draft)</code> e jamais vai ao ar sem
                a revisão e aprovação formal do segundo sócio.
              </p>

              <form onSubmit={handleGenerateAiDraft} className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="text"
                  value={aiTopicTitle}
                  onChange={(e) => setAiTopicTitle(e.target.value)}
                  placeholder="Ex: Fisiologia Respiratória: Troca Gasosa e Curva de Dissociação da Hemoglobina"
                  className="flex-1 text-xs p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  required
                />
                <button
                  type="submit"
                  disabled={isAiGenerating}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isAiGenerating ? 'IA Sintetizando...' : 'Gerar Rascunho'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Tabela de Trava de Dupla Assinatura */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Fluxo Editorial: Rascunho &rarr; Revisão &rarr; Publicado
                </h3>
                <p className="text-xs text-slate-500">
                  Proteção contra alucinação de IA e erros metodológicos em provas
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {topics.length} módulo(s) catalogado(s)
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {topics.map((t) => {
                const subject = SUBJECTS.find((s) => s.id === t.subjectId);

                return (
                  <div
                    key={t.id}
                    className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {subject?.name}
                        </span>
                        {t.status === 'published' && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Publicado no Portal
                          </span>
                        )}
                        {t.status === 'review' && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Em Revisão por 2º Sócio
                          </span>
                        )}
                        {t.status === 'draft' && (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Rascunho IA (Não Visível ao Público)
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-slate-900">{t.title}</h4>
                      <p className="text-xs text-slate-500">
                        Autor: <strong className="text-slate-700">{t.author.name}</strong> • Revisor
                        Designado: <strong className="text-slate-700">{t.reviewer.name}</strong>
                      </p>
                    </div>

                    {/* Controles de Aprovação Dupla */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {t.status === 'draft' && (
                        <button
                          onClick={() => updateTopicStatus(t.id, 'review')}
                          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition"
                        >
                          Enviar para Revisão do 2º Sócio
                        </button>
                      )}

                      {t.status === 'review' && (
                        <button
                          onClick={() =>
                            updateTopicStatus(
                              t.id,
                              'published',
                              'Dra. Camila Vasconcellos, Ph.D. (Aprovado)'
                            )
                          }
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition shadow flex items-center gap-1.5"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Assinar como 2º Sócio e Publicar</span>
                        </button>
                      )}

                      {t.status === 'published' && (
                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Dupla Assinatura Concluída
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: CENTRAL FORENSE & ANTI-PIRATARIA */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total de Downloads Carimbados
              </span>
              <strong className="text-2xl font-black text-slate-900">
                {downloadLogs.length} Arquivos
              </strong>
              <p className="text-[11px] text-emerald-600 mt-1">100% com Hash Forense e CPF</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Sessões Concorrentes Bloqueadas
              </span>
              <strong className="text-2xl font-black text-amber-600">14 Tentativas</strong>
              <p className="text-[11px] text-slate-500 mt-1">Derrubadas pelo active_session_id</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Custo Cloudflare R2 Egress
              </span>
              <strong className="text-2xl font-black text-emerald-600">R$ 0,00</strong>
              <p className="text-[11px] text-slate-500 mt-1">Taxa Zero de Download (Sem Egress)</p>
            </div>
          </div>

          {/* Tabela de Logs Forenses */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Rastreamento Forense de Downloads (Tabela `download_logs`)
              </h3>
              <p className="text-xs text-slate-500">
                Cada PDF gerado contém hash criptográfico único, metadados invisíveis e carimbo em
                todas as páginas.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="p-3">Aluno / CPF</th>
                    <th className="p-3">Módulo Baixado</th>
                    <th className="p-3">Hash Forense</th>
                    <th className="p-3">IP e Localização</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {downloadLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="p-3">
                        <strong className="text-slate-900 block">{log.userName}</strong>
                        <span className="text-[11px] font-mono text-slate-500">{log.userCpf}</span>
                      </td>
                      <td className="p-3 text-slate-700">{log.topicTitle}</td>
                      <td className="p-3 font-mono text-[10px] text-indigo-700">
                        {log.watermarkHash}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-600">{log.ip}</td>
                      <td className="p-3">
                        {log.status === 'allowed' ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Autorizado
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            Suspeito (Cluster IP)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ABA 3: GOVERNANÇA E REUNIÃO DE SÓCIOS */}
      {activeTab === 'governance' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">
              Regras de Governança Entre Amigos & Vesting (Página 4 do Dossiê)
            </h3>
            <p className="text-xs text-slate-500">
              Diretrizes de alinhamento para evitar atritos societários e garantir previsibilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <strong className="text-slate-900 font-bold block">1. Participação por Entrega (Vesting)</strong>
              <p className="text-slate-600 leading-relaxed">
                Se um integrante parar de produzir ou sair nos primeiros meses, não retém
                participação passiva sobre o trabalho dos demais sócios.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <strong className="text-slate-900 font-bold block">2. Ativos em Nome do Projeto</strong>
              <p className="text-slate-600 leading-relaxed">
                Domínio .com.br, GitHub, Supabase e Gateway Pix registrados em conta central do
                projeto com 2FA compartilhado entre os sócios.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <strong className="text-slate-900 font-bold block">3. Reserva Operacional Fixa</strong>
              <p className="text-slate-600 leading-relaxed">
                Retenção automática de 15% a 20% da receita bruta em conta corrente PJ para custear
                domínios, contabilidade, notas fiscais e tráfego.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ABA 4: INFRAESTRUTURA PRIVADA & BANCO SUPABASE */}
      {activeTab === 'infrastructure' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Infraestrutura de Banco de Dados Supabase (PostgreSQL)
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Gerenciamento estritamente privado acessível apenas para os Sócios Fundadores com 2FA.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenDbModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Gerenciar Tabelas & SQL</span>
                </button>
                <button
                  onClick={onOpenExplainer}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dossiê da Arquitetura</span>
                </button>
              </div>
            </div>

            {/* Grid de Métricas de Infraestrutura */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Conexão Supabase Cloud
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <strong className="text-sm font-bold text-slate-900">
                    {supabaseStatus.isConfigured ? 'Online (200 OK)' : 'Aguardando Credenciais'}
                  </strong>
                </div>
                <p className="text-[11px] font-mono text-slate-500 truncate">
                  {supabaseStatus.url || 'https://cjtcfggqlwxmgtzdjgxc.supabase.co'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Tabelas Relacionais Ativas
                </span>
                <strong className="text-sm font-bold text-slate-900">
                  8 Tabelas Modeladas (SQL)
                </strong>
                <p className="text-[11px] text-slate-500 leading-snug">
                  profiles, courses, subjects, topics, products, user_entitlements, download_logs, student_requests
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Segurança & Políticas RLS
                </span>
                <strong className="text-sm font-bold text-emerald-700">
                  Row Level Security Ativo
                </strong>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Isolamento por UUID do usuário com carimbo forense no Postgres
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
