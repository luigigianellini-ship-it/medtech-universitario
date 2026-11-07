# 🎓 MedTech Universitário — Plataforma de Conteúdo & Simulados

> **Portal acadêmico de resumos esquematizados cirúrgicos, simulados cronometrados P1/P2 e flashcards interativos para os cursos do ciclo básico de Saúde e Tecnologia.**

Baseado no **Dossiê Mestre de Engenharia & Governança**, desenhado para alta conversão freemium, proteção anti-pirataria com marcas d'água forenses e esteira editorial assistida por IA com trava de dupla assinatura entre sócios.

---

## 🚀 Cursos Atendidos (Tronco Comum MEC)

| Área | Curso | Foco das Semanas de Prova |
| :--- | :--- | :--- |
| **Saúde** | **Fisioterapia** | Cinesiologia, Biomecânica, Anatomia Musculoesquelética |
| **Saúde** | **Educação Física** | Fisiologia do Exercício, Bioenergética, Cineantropometria |
| **Tecnologia** | **Análise e Desenv. Sistemas (ADS)** | Estruturas de Dados (Árvores AVL, Listas), Modelagem de BD |
| **Tecnologia** | **Ciência da Computação** | Cálculo Diferencial e Integral I, Lógica Matemática |

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones & UI:** [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Banco de Dados & Autenticação:** [Supabase](https://supabase.com/) (PostgreSQL Cloud com Row Level Security)
- **Hospedagem & CDN:** [Vercel](https://vercel.com/) / Cloudflare

---

## 🌟 Principais Funcionalidades

### 👨‍🎓 Para o Aluno
1. **Página de Ouro:** Visualização gratuita da introdução + desbloqueio imediato do módulo cirúrgico por R$ 19,90 via Pix.
2. **Leitor Protegido Anti-Vazamento:** Marca d'água forense dinâmica nominal (Nome + CPF) e caracteres invisíveis Zero-Width Unicode para rastreamento de vazamentos.
3. **Simulador de Prova Cronometrado:** Modo P1/P2 com questões oficiais de faculdade e feedback pedagógico imediato.
4. **Flashcards 3D (SRS):** Baralho mnemônico com virada em 3D para retenção espaçada antes da prova.
5. **Autenticação Segura:** Cadastro de aluno integrado diretamente ao Supabase Auth e tabela relacional `profiles`.

### 🛡️ Para os Sócios Fundadores (Painel Administrativo)
1. **Esteira Editorial com Trava de Dupla Assinatura:** Nenhum resumo gerado por IA vai ao ar sem a revisão e aprovação formal do segundo sócio.
2. **Central Forense & Anti-Fraude:** Rastreamento de hashes SHA-256 gerados nos PDFs e derrubada de acessos concorrentes via `active_session_id`.
3. **Governança & Vesting:** Regras contratuais de participação por entrega, reserva técnica PJ e 2FA compartilhado.
4. **Banco de Dados Supabase (SQL):** Métricas em tempo real e monitoramento das 8 tabelas relacionais do sistema.

---

## 💻 Como Rodar o Projeto Localmente

### 1. Clonar o repositório e instalar dependências
```bash
git clone <URL_DO_REPOSITORIO>
cd plataforma-universitaria
npm install
```

### 2. Configurar o Supabase (.env)
Copie o arquivo de exemplo e insira suas credenciais do projeto Supabase:
```bash
cp .env.example .env
```
No arquivo `.env`:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-aqui
```

### 3. Rodar as Migrações SQL no Supabase
Acesse o **SQL Editor** do seu projeto no Supabase e execute os dois scripts localizados na pasta `supabase/`:
1. `supabase/schema.sql` (Cria as 8 tabelas relacionais, índices `pg_trgm` e políticas RLS).
2. `supabase/seed.sql` (Insere os cursos, matérias, tópicos modelo e produtos comerciais).

### 4. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173/` no seu navegador.

---

## 🌐 Deploy na Vercel (Passo a Passo)

A aplicação já conta com o arquivo `vercel.json` configurado para roteamento SPA sem erro 404:

1. Suba o código para o seu repositório no **GitHub**.
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
3. Clique em **"Add New..."** &rarr; **"Project"** e selecione o repositório.
4. Em **Build and Output Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Em **Environment Variables**, adicione as mesmas chaves do seu `.env`:
   - `VITE_SUPABASE_URL`: sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY`: sua chave pública `sb_publishable_...`
6. Clique em **"Deploy"**! Em menos de 1 minuto seu site estará online com HTTPS gratuito.

---

## 🔑 Credenciais Demonstrativas de Teste

| Perfil | E-mail | Senha | Acesso |
| :--- | :--- | :--- | :--- |
| **Aluno** | `luigi@email.com` | `123` | Área do Aluno, Leitor e Simulados |
| **Sócio / Admin** | `thiago@medtech.edu.br` | `123` | Painel dos Sócios (PIN 2FA: `8912`) |

---

## ⚖️ Conformidade Legal & Acadêmica
* Material de apoio teórico universitário complementar. Não substitui diretrizes clínicas nem supervisão presencial (CREFITO/CREF/MEC).
* Conteúdos 100% autorais baseados no tronco comum das Diretrizes Curriculares Nacionais (Lei 9.610/98).
* Dados de usuários protegidos conforme a LGPD (Lei 13.709/2018).
