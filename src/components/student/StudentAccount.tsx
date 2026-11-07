import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, PRODUCTS } from '../../data/mockData';
import { 
  UserCheck, 
  ShieldCheck, 
  RefreshCw, 
  ArrowLeftRight, 
  AlertTriangle, 
  Key, 
  CheckCircle2, 
  Smartphone,
  Sparkles,
  Lock
} from 'lucide-react';

export const StudentAccount: React.FC = () => {
  const {
    user,
    entitlements,
    topics,
    setSelectedTopic,
    setCurrentView,
    revalidatePixTx,
    exchangePack,
    triggerSimulatedConcurrentLogin,
    openAuthModal,
  } = useApp();

  const [pixTxId, setPixTxId] = useState('');
  const [revalidateFeedback, setRevalidateFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [fromTopicId, setFromTopicId] = useState(topics[0].id);
  const [toTopicId, setToTopicId] = useState(topics[1].id);
  const [exchangeFeedback, setExchangeFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Se o usuário não estiver logado, exibe aviso e bloqueia
  if (user.role === 'visitor' || !user.email) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center border border-indigo-100 shadow-sm">
          <UserCheck className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">Acesso Restrito a Alunos</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            Você não está conectado. Faça login para acessar seus resumos liberados, simulados e o
            autoatendimento.
          </p>
        </div>
        <button
          onClick={() => openAuthModal('login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow cursor-pointer"
        >
          Entrar na Minha Conta
        </button>
      </div>
    );
  }

  const handleRevalidate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = revalidatePixTx(pixTxId);
    setRevalidateFeedback(result);
  };

  const handleExchange = (e: React.FormEvent) => {
    e.preventDefault();
    const result = exchangePack(fromTopicId, toTopicId);
    setExchangeFeedback(result);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Área do Aluno & Autoatendimento 24/7
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Gerenciamento de licenças ativas, auto-resolução de problemas e segurança da conta.
        </p>
      </div>

      {/* Grid: Perfil & Sessão Ativa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card do Perfil */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Dados da Licença</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                Estudante:
              </span>
              <strong className="text-slate-900">{user.fullName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                CPF Cadastrado (Forense):
              </span>
              <span className="font-mono text-slate-800">{user.cpf}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                E-mail Institucional:
              </span>
              <span className="text-slate-800">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Card de Sessão Única (Blindagem Anti-Vaquinha) */}
        <div className="md:col-span-2 bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sessão Única Ativa (Sem Rateio)
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                ID: {user.activeSessionId}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sua conta está conectada exclusivamente a este navegador. Caso haja login simultâneo
              em outro aparelho, o acesso atual é desconectado automaticamente.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Teste o mecanismo de segurança em tempo real:
            </span>
            <button
              onClick={triggerSimulatedConcurrentLogin}
              className="flex items-center gap-1.5 text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg border border-amber-500/30 transition"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Simular Login em Outro Celular</span>
            </button>
          </div>
        </div>
      </div>

      {/* Meus Pacotes Ativos */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Meus Módulos e Pacotes Desbloqueados
            </h3>
            <p className="text-xs text-slate-500">
              Acesso ilimitado a resumos, simulados comentados e baralhos
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
            {entitlements.length} Módulo(s) Ativo(s)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entitlements.map((ent) => {
            const topic = topics.find((t) => t.id === ent.topicId);
            const product = PRODUCTS.find((p) => p.id === ent.productId);

            return (
              <div
                key={ent.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Ativo
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Liberado em {new Date(ent.unlockedAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {topic ? topic.title : product?.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                  {topic && (
                    <button
                      onClick={() => {
                        setSelectedTopic(topic);
                        setCurrentView('reader');
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      Abrir Leitor &gt;
                    </button>
                  )}
                  {topic && (
                    <button
                      onClick={() => {
                        setSelectedTopic(topic);
                        setCurrentView('simulator');
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-800 ml-auto"
                    >
                      Fazer Simulado
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Autoatendimento 24/7 (Véspera de Prova às 23h40) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ferramenta 1: Revalidar meu Pix */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>Revalidar Meu Pix (Autoatendimento)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Se você pagou no banco mas a conexão oscilou às 23h40 na véspera da prova, cole o ID do
            comprovante para forçar a checagem direta no gateway HMAC.
          </p>

          <form onSubmit={handleRevalidate} className="space-y-3">
            <input
              type="text"
              value={pixTxId}
              onChange={(e) => setPixTxId(e.target.value)}
              placeholder="Ex: E1823612020261107..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-lg transition"
            >
              Consultar e Liberar Acesso Imediato
            </button>
          </form>

          {revalidateFeedback && (
            <div
              className={`p-3 rounded-lg text-xs ${
                revalidateFeedback.success
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {revalidateFeedback.message}
            </div>
          )}
        </div>

        {/* Ferramenta 2: Trocar Pacote com 1 Clique */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <ArrowLeftRight className="w-4 h-4 text-indigo-600" />
            <span>Trocar Pacote com 1 Clique</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Comprou a matéria errada por engano no calor da semana de provas? Se ainda não baixou os
            PDFs carimbados, troque instantaneamente sem burocracia.
          </p>

          <form onSubmit={handleExchange} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">
                Trocar este pacote atual:
              </label>
              <select
                value={fromTopicId}
                onChange={(e) => setFromTopicId(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">
                Pelo seguinte pacote desejado:
              </label>
              <select
                value={toTopicId}
                onChange={(e) => setToTopicId(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              >
                {topics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-lg transition"
            >
              Efetuar Troca de Matéria
            </button>
          </form>

          {exchangeFeedback && (
            <div
              className={`p-3 rounded-lg text-xs ${
                exchangeFeedback.success
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {exchangeFeedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
