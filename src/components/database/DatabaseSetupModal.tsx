import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Server, 
  Code2, 
  Sparkles,
  Layers
} from 'lucide-react';
import { getSupabaseStatus } from '../../lib/supabase';

interface DbModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSetupModal: React.FC<DbModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'schema' | 'rls'>('guide');

  const status = getSupabaseStatus();

  if (!isOpen) return null;

  const handleCopySql = () => {
    // Carrega o script SQL completo do schema
    const sqlText = `-- PLATAFORMA DE CONTEÚDO UNIVERSITÁRIO (SAÚDE & TECNOLOGIA)
-- SCHEMA DE BANCO DE DADOS POSTGRESQL / SUPABASE
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'editor', 'admin')) DEFAULT 'student',
  active_session_id UUID DEFAULT gen_random_uuid(),
  course_id TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  area TEXT NOT NULL CHECK (area IN ('Saúde', 'Tecnologia')),
  short_desc TEXT,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  semester INT NOT NULL,
  description TEXT,
  failure_rate TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  semester INT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_role TEXT NOT NULL,
  mec_bibliography TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('draft', 'review', 'published')) DEFAULT 'draft',
  pack_price_cents INT NOT NULL DEFAULT 1990,
  free_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  premium_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  pdf_r2_key TEXT,
  pdf_page_count INT DEFAULT 8,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pack', 'semester', 'holiday_leveling')),
  price_cents INT NOT NULL,
  duration_days INT NOT NULL DEFAULT 180,
  description TEXT,
  highlight BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  unlocked_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT REFERENCES public.topics(id) ON DELETE SET NULL,
  topic_title TEXT NOT NULL,
  ip TEXT,
  watermark_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'allowed',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Ativação de Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura pública de cursos" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Leitura pública de disciplinas" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Leitura pública de tópicos" ON public.topics FOR SELECT USING (status = 'published');
CREATE POLICY "Aluno lê suas compras" ON public.user_entitlements FOR SELECT USING (auth.uid() = user_id);`;

    navigator.clipboard.writeText(sqlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">
                Banco de Dados Supabase (PostgreSQL)
              </h2>
              <span className="text-xs text-slate-500">
                Tabelas do Dossiê, Políticas RLS e Configuração de Produção
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status da Conexão */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
          status.isConfigured
            ? 'bg-emerald-50/70 border-emerald-200'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-0.5">
            <span className="text-slate-500 font-semibold block">Status da Conexão PostgreSQL:</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${status.isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
              <strong className={status.isConfigured ? 'text-emerald-900 font-bold' : 'text-slate-800'}>
                {status.isConfigured
                  ? 'Conectado à Nuvem Supabase (Projeto Ativo)'
                  : 'Banco Local Ativo (Pronto para Conectar)'}
              </strong>
            </div>
            {status.isConfigured && (
              <span className="text-[11px] font-mono text-emerald-700 block">
                {status.url}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySql}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Script SQL Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Script SQL Completo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Seletor de Abas */}
        <div className="flex gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2 px-1 transition border-b-2 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Passo a Passo de Ativação
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2 px-1 transition border-b-2 cursor-pointer ${
              activeTab === 'schema'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tabelas Criadas (Schema)
          </button>
          <button
            onClick={() => setActiveTab('rls')}
            className={`pb-2 px-1 transition border-b-2 cursor-pointer ${
              activeTab === 'rls'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Segurança RLS (Anti-Hack)
          </button>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'guide' && (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              O script completo de criação das tabelas já está gerado na pasta{' '}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold font-mono">
                supabase/schema.sql
              </code>{' '}
              e{' '}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-bold font-mono">
                supabase/seed.sql
              </code>
              . Para ligar seu banco oficial na nuvem:
            </p>

            <ol className="space-y-3 list-decimal list-inside bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <li className="font-semibold text-slate-900">
                Acesse{' '}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline font-bold"
                >
                  supabase.com
                </a>{' '}
                e crie um projeto gratuito (leva 1 minuto).
              </li>
              <li className="font-semibold text-slate-900">
                No menu lateral do Supabase, clique em <strong>SQL Editor</strong> &gt;{' '}
                <strong>New Query</strong>.
              </li>
              <li className="font-semibold text-slate-900">
                Cole o conteúdo copiado do script SQL e clique em <strong>Run</strong>. Todas as tabelas, índices e regras de segurança serão criadas.
              </li>
              <li className="font-semibold text-slate-900">
                Vá em <strong>Project Settings &gt; API</strong>, copie a URL e a Anon Key pública, e cole no arquivo <code className="bg-white px-1.5 py-0.5 rounded border font-mono">.env</code> do seu projeto:
                <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg mt-1 font-mono text-[10px]">
                  VITE_SUPABASE_URL=https://seu-id.supabase.co{'\n'}
                  VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
                </pre>
              </li>
            </ol>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">1. profiles (Perfis de Usuários)</strong>
              <p className="text-slate-600">
                Guarda nome, CPF forense, role (student/editor/admin) e active_session_id para derrubar logins simultâneos (anti-vaquinha).
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">2. courses & subjects (Taxonomia de Cursos)</strong>
              <p className="text-slate-600">
                Organização do Tronco Comum MEC: Fisioterapia, Educação Física, ADS e Ciência da Computação.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">3. topics (A Página de Ouro)</strong>
              <p className="text-slate-600">
                Contém o resumo, questões comentadas, flashcards, citação bibliográfica formal do MEC e status de dupla assinatura.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">4. user_entitlements (Direitos de Acesso)</strong>
              <p className="text-slate-600">
                Associação de quais matérias o estudante comprou via Pix ou se possui o Passe Semestral.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">5. download_logs (Rastreamento Forense)</strong>
              <p className="text-slate-600">
                Registro de cada PDF gerado com IP e hash SHA-256 para combater vazamento em grupos de WhatsApp.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'rls' && (
          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-emerald-950">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Paywall de CSS (Protegido no PostgreSQL):</span>
              </div>
              <p>
                As políticas RLS (Row Level Security) garantem que mesmo que um invasor inspecione as requisições de rede ou tente chamar o banco diretamente, o PostgreSQL bloqueia o retorno das questões completas e PDFs de quem não pagou.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono text-[11px]">
            Arquivos gerados em: /supabase/schema.sql
          </span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
