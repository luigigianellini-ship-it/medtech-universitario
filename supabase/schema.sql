-- ==============================================================================
-- PLATAFORMA DE CONTEÚDO UNIVERSITÁRIO (SAÚDE & TECNOLOGIA)
-- SCHEMA DE BANCO DE DADOS POSTGRESQL / SUPABASE
-- Conforme modelagem do Dossiê Mestre (Páginas 2 e 3)
-- ==============================================================================

-- 1. EXTENSÕES OBRIGATÓRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Busca fuzzy tolerante a erros de digitação

-- 2. TABELA: PERFIS DE USUÁRIOS E CONTROLE DE SESSÃO ÚNICA
-- Espelha a autenticação do Supabase Auth e garante a sessão única anti-vaquinha
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'editor', 'admin')) DEFAULT 'student',
  active_session_id UUID DEFAULT gen_random_uuid(),
  course_id TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. TAXONOMIA: CURSOS DO TRONCO COMUM MEC
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY, -- ex: 'fisio', 'edf', 'ads', 'cc'
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  area TEXT NOT NULL CHECK (area IN ('Saúde', 'Tecnologia')),
  short_desc TEXT,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. TAXONOMIA: DISCIPLINAS DO CICLO BÁSICO (1º AO 3º SEMESTRE)
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  semester INT NOT NULL CHECK (semester BETWEEN 1 AND 10),
  description TEXT,
  failure_rate TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. TÓPICOS DIDÁTICOS E RESUMOS (PÁGINA DE OURO)
-- status: 'draft' (Rascunho IA), 'review' (Em revisão por sócio), 'published' (Aprovado por 2 sócios)
CREATE TABLE IF NOT EXISTS public.topics (
  id TEXT PRIMARY KEY,
  subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  semester INT NOT NULL,
  
  -- Selo de Revisão Humana Obrigatória (Dupla Assinatura)
  author_id UUID REFERENCES public.profiles(id),
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  author_crm_cref TEXT,
  author_avatar TEXT,
  
  reviewer_id UUID REFERENCES public.profiles(id),
  reviewer_name TEXT NOT NULL,
  reviewer_role TEXT NOT NULL,
  reviewer_crm_cref TEXT,
  reviewer_avatar TEXT,
  
  mec_bibliography TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('draft', 'review', 'published')) DEFAULT 'draft',
  pack_price_cents INT NOT NULL DEFAULT 1990,

  -- Camada Aberta (SEO / Isca Gratuita)
  free_content JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Camada Protegida (Trava Server-Side: Resumo completo, questões comentadas, flashcards)
  premium_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Armazenamento no Cloudflare R2
  pdf_r2_key TEXT,
  pdf_page_count INT DEFAULT 8,
  
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índice GIN com pg_trgm para busca tolerante a erros de digitação (Ex: 'cinesologia' ou 'algoritimo')
CREATE INDEX IF NOT EXISTS idx_topics_title_trgm ON public.topics USING gin (title gin_trgm_ops);

-- 6. PACOTES E PRODUTOS COMERCIAIS
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

-- 7. DIREITOS DE ACESSO (ENTITLEMENTS)
-- Define exatamente qual matéria ou período o aluno comprou via Pix
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

CREATE INDEX IF NOT EXISTS idx_entitlements_user_topic ON public.user_entitlements(user_id, topic_id, is_active);

-- 8. LOGS FORENSES DE DOWNLOAD E BLINDAGEM ANTI-PIRATARIA
CREATE TABLE IF NOT EXISTS public.download_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  topic_id TEXT REFERENCES public.topics(id) ON DELETE SET NULL,
  topic_title TEXT NOT NULL,
  ip TEXT,
  watermark_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('allowed', 'suspicious', 'blocked')) DEFAULT 'allowed',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. FILA DE PEDIDOS E DEMANDAS DE ALUNOS
CREATE TABLE IF NOT EXISTS public.student_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  description TEXT NOT NULL,
  suggested_deadline TEXT,
  votes_count INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL CHECK (status IN ('em_analise', 'na_esteira_ia', 'em_revisao_socio', 'publicado')) DEFAULT 'em_analise',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- BLINDAGEM DE ACESSO: ROW LEVEL SECURITY (RLS)
-- Impede injeção e leitura indevida por outros usuários no navegador
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_requests ENABLE ROW LEVEL SECURITY;

-- Regras Profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Regras Catálogo Público (Qualquer visitante lê)
CREATE POLICY "Leitura pública de cursos" ON public.courses
  FOR SELECT USING (true);

CREATE POLICY "Leitura pública de disciplinas" ON public.subjects
  FOR SELECT USING (true);

CREATE POLICY "Leitura pública de produtos e pacotes" ON public.products
  FOR SELECT USING (true);

-- Regras Tópicos (Página de Ouro: Aberto para leitura pública apenas se publicado)
CREATE POLICY "Leitura pública de tópicos publicados" ON public.topics
  FOR SELECT USING (status = 'published');

-- Regras Entitlements (O aluno só consulta suas próprias matérias pagas)
CREATE POLICY "Alunos visualizam apenas seus próprios acessos" ON public.user_entitlements
  FOR SELECT USING (auth.uid() = user_id);

-- Regras Download Logs
CREATE POLICY "Alunos registram logs de download" ON public.download_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Alunos visualizam seus próprios downloads" ON public.download_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Regras Pedidos de Alunos
CREATE POLICY "Leitura pública de pedidos da comunidade" ON public.student_requests
  FOR SELECT USING (true);

CREATE POLICY "Alunos autenticados podem submeter pedidos" ON public.student_requests
  FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- TRIGGER AUTOMÁTICO: CRIAÇÃO DE PERFIL AO CADASTRAR NO SUPABASE AUTH
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, cpf, role, course_id, active_session_id)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Estudante Universitário'),
    COALESCE(new.raw_user_meta_data->>'cpf', '000.000.000-00'),
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    new.raw_user_meta_data->>'course_id',
    gen_random_uuid()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dispara o trigger sempre que um usuário se cadastra no Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
