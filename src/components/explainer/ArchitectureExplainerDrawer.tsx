import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  FileCode2, 
  Database, 
  Lock, 
  BookOpen, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface ExplainerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureExplainerDrawer: React.FC<ExplainerProps> = ({ isOpen, onClose }) => {
  const [activeTopic, setActiveTopic] = useState<'why_react' | 'flow' | 'security' | 'anti_piracy' | 'editorial' | 'costs'>('why_react');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">
                Como Funciona a Aplicação (Guia Técnico)
              </h2>
              <span className="text-xs text-indigo-300">
                Arquitetura em React Puro + Blindagens do Dossiê Mestre
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu de Tópicos */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2 gap-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTopic('why_react')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTopic === 'why_react'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Por que React Puro?
          </button>
          <button
            onClick={() => setActiveTopic('flow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTopic === 'flow'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Fluxo da Aplicação
          </button>
          <button
            onClick={() => setActiveTopic('security')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTopic === 'security'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Blindagem & Pix
          </button>
          <button
            onClick={() => setActiveTopic('anti_piracy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTopic === 'anti_piracy'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Anti-Pirataria Forense
          </button>
          <button
            onClick={() => setActiveTopic('editorial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTopic === 'editorial'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Esteira & Dupla Assinatura
          </button>
          <button
            onClick={() => setActiveTopic('costs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTopic === 'costs'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Custo Zero (R$ 0,00)
          </button>
        </div>

        {/* Área de Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 text-xs leading-relaxed">
          {/* TÓPICO 1: POR QUE REACT PURO */}
          {activeTopic === 'why_react' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-2">
                <h3 className="font-bold text-sm text-indigo-900 flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-indigo-600" />
                  Vantagens do React Puro (SPA) em Relação ao Next.js
                </h3>
                <p>
                  No dossiê original, a proposta previa Next.js. Ao optar por <strong>React puro (SPA)</strong>,
                  a arquitetura ganha vantagens imediatas de simplicidade, estabilidade e custo:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">1. Zero Sobrecarga de Servidor SSR</strong>
                  <p className="text-slate-600">
                    Next.js exige instâncias de Node.js rodando em servidor para renderizar cada página
                    em SSR, gerando custos de computação e risco de gargalo durante picos de véspera de prova.
                    Com React puro + Vite, o build gera HTML/JS/CSS estáticos distribuídos na CDN global da Cloudflare.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">2. Navegação Ultra-Rápida sem Flash de Recarregamento</strong>
                  <p className="text-slate-600">
                    O aluno transita entre o catálogo de matérias, a &quot;Página de Ouro&quot;, o leitor de PDF,
                    o simulador cronometrado e os flashcards de forma 100% instantânea (client-side routing).
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">3. Desacoplamento Total de Backend</strong>
                  <p className="text-slate-600">
                    O frontend React conversa diretamente com APIs leves (Supabase PostgreSQL para banco
                    e auth, Cloudflare Workers para webhooks Pix e Cloudflare R2 para os PDFs). Se o backend
                    precisar mudar de provedor, o frontend em React não quebra.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TÓPICO 2: FLUXO DA APLICAÇÃO */}
          {activeTopic === 'flow' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900">
                O Ciclo de Vida do Usuário na Plataforma
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 font-bold block">Aterrissagem na Página de Ouro (SEO)</strong>
                    <p className="text-slate-600">
                      O aluno pesquisa no Google &quot;alavancas biomecanica cinesiologia resumo prova&quot;.
                      Ele aterrissa na página pública com a introdução conceitual, tabela comparativa e 1 questão resolvida.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 font-bold block">Conversão por Impulso (Pix em 2s)</strong>
                    <p className="text-slate-600">
                      Na véspera da prova, o aluno não quer perder 8h lendo livro. O card do Pack de Socorro oferece
                      o resumo de 8 páginas + 15 questões comentadas + baralho por R$ 19,90 via Pix.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 font-bold block">Estudo nos Recursos Vivos</strong>
                    <p className="text-slate-600">
                      O aluno estuda os flashcards no celular a caminho da faculdade e treina o simulado
                      com correção instantânea. Se baixar o PDF, o arquivo sai carimbado com o nome e CPF dele.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TÓPICO 3: BLINDAGEM & PIX */}
          {activeTopic === 'security' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900">
                Blindagem Cibernética (Anti-Hack)
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">1. Zero &quot;Paywall de CSS&quot;</strong>
                  <p className="text-slate-600">
                    Muitos sites amadores apenas ocultam o texto com um <code>filter: blur</code> no CSS.
                    Qualquer aluno esperto abre o F12 (Inspecionar Elemento) e lê de graça.
                    Em nossa arquitetura, o conteúdo protegido fica retido no backend e só é enviado
                    ao frontend após confirmação criptográfica do direito na tabela <code>user_entitlements</code>.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">2. Validação Criptográfica do Pix (HMAC SHA-256)</strong>
                  <p className="text-slate-600">
                    A rota de webhook do Pix confere a assinatura digital enviada pelo banco.
                    Tentativas de forjar notificações &quot;pix pago&quot; são descartadas e o IP é banido.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">3. Sessão Única (Fim da Vaquinha)</strong>
                  <p className="text-slate-600">
                    Cada autenticação armazena um <code>active_session_id</code> único no PostgreSQL.
                    Se 10 alunos dividirem a mesma senha, sempre que um entrar, o aparelho do outro é
                    desconectado na hora, tornando o rateio inviável.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TÓPICO 4: ANTI-PIRATARIA FORENSE */}
          {activeTopic === 'anti_piracy' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900">
                Blindagem Anti-Pirataria Forense
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">1. Carimbo de CPF no PDF (pdf-lib)</strong>
                  <p className="text-slate-600">
                    Quando o aluno solicita o PDF, o motor em Node.js carimba em memória RAM em menos
                    de 0,8s: <em>&quot;Licenciado para [Nome] - CPF [XXX.XXX.XXX-XX] - Hash #8912&quot;</em>.
                    O estudante não compartilha no grupo de WhatsApp da sala porque exporia seu próprio CPF.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">2. Links com Autodestruição (Signed URLs)</strong>
                  <p className="text-slate-600">
                    O link de download gerado pela Cloudflare R2 expira após 300 segundos (5 minutos).
                    Se o aluno copiar a URL do download e mandar no grupo, os colegas receberão erro 403 Forbidden.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">3. Recursos Vivos Não-Pirateáveis</strong>
                  <p className="text-slate-600">
                    O PDF é apenas metade da proposta. Os simulados cronometrados com nota estimada para a P1
                    e o baralho de repetição espaçada funcionam apenas na plataforma web, eliminando o valor
                    de um mero PDF estático vazado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TÓPICO 5: ESTEIRA EDITORIAL */}
          {activeTopic === 'editorial' && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-bold text-sm text-slate-900">
                Esteira Híbrida & Trava de Dupla Assinatura
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">Esteira Híbrida (IA + Sócio)</strong>
                  <p className="text-slate-600">
                    Escrever um resumo completo do zero do ciclo básico levaria cerca de 8 horas por módulo.
                    Com a esteira híbrida, a IA monta o esqueleto conceitual e as tabelas com base na ementa
                    universitária. O sócio especialista revisa, ajusta e valida as pegadinhas de prova em apenas 1h15.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">Trava de Dupla Assinatura Obrigatória</strong>
                  <p className="text-slate-600">
                    Nenhum conteúdo vai ao ar diretamente. Todo material nasce em status <code>draft</code>,
                    passa para <code>review</code> e <strong>exige a assinatura formal de um segundo sócio</strong>
                    para atingir o status <code>published</code>. Isso elimina qualquer risco de erro técnico
                    ou alucinação de IA prejudicar os alunos em prova.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TÓPICO 6: CUSTO ZERO */}
          {activeTopic === 'costs' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
                <h3 className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Como Rodar com Custo Fixo de R$ 0,00 no Início
                </h3>
                <p>
                  A combinação da arquitetura foi desenhada para não exigir investimento de capital inicial
                  pelos sócios, operando nos planos gratuitos generosos dos melhores provedores mundiais:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">1. Cloudflare R2 (Taxa ZERO de Egress)</strong>
                  <p className="text-slate-600">
                    Diferente da Amazon AWS S3 (que cobra taxas salgadas por gigabyte baixado pelos alunos),
                    a Cloudflare R2 tem <strong>taxa zero de egress</strong> e oferece 10 GB de armazenamento
                    gratuito, suficiente para milhares de PDFs e diagramas.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">2. Frontend React em Cloudflare Pages / Vercel</strong>
                  <p className="text-slate-600">
                    Hospedagem gratuita com SSL ilimitado, CDN ultrarrápida no Brasil e suporte a milhões
                    de requisições mensais sem custo.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <strong className="text-slate-900 font-bold block">3. Supabase PostgreSQL (Tier Free)</strong>
                  <p className="text-slate-600">
                    Banco de dados relacional com 500 MB gratuitos e 50.000 usuários ativos mensais, com
                    Row Level Security (RLS) nativo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer do Drawer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Dossiê Mestre de Engenharia, Negócio e Segurança
          </span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
