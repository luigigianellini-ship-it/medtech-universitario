-- ==============================================================================
-- DADOS INICIAIS (SEED DATA)
-- Cursos, Matérias do Ciclo Básico, Tópicos da Página de Ouro e Produtos Comerciais
-- ==============================================================================

-- 1. CURSOS
INSERT INTO public.courses (id, slug, name, area, short_desc, badge) VALUES
('fisio', 'fisioterapia', 'Fisioterapia', 'Saúde', 'Resumos anatômicos e biomecânicos mastigados para não travar nas semanas de prova.', 'Campeão em P1/P2'),
('edf', 'educacao-fisica', 'Educação Física', 'Saúde', 'Fisiologia aplicada ao esforço, cineantropometria e periodização sem enrolação.', 'MEC Tronco Comum'),
('ads', 'analise-desenvolvimento-sistemas', 'Análise e Dev. Sistemas (ADS)', 'Tecnologia', 'Estruturas de dados, POO e modelagem relacional explicadas em diagramas limpos.', 'Alta Taxa Reprovação'),
('cc', 'ciencia-computacao', 'Ciência da Computação', 'Tecnologia', 'Cálculo I, lógica matemática e grafos sem hermetismo desnecessário.', 'Nivelamento de Férias')
ON CONFLICT (id) DO NOTHING;

-- 2. DISCIPLINAS
INSERT INTO public.subjects (id, course_id, slug, name, semester, description, failure_rate) VALUES
('subj_cinesio', 'fisio', 'cinesiologia-biomecanica', 'Cinesiologia e Biomecânica', 2, 'Análise vetorial de forças musculares, alavancas biológicas e goniometria.', '48% de reprovação média'),
('subj_anat_membros', 'fisio', 'anatomia-musculoesqueletica', 'Anatomia Musculoesquelética', 1, 'Origem, inserção, inervação e ação dos grandes grupos musculares.', '39% de reprovação'),
('subj_fisio_exercicio', 'edf', 'fisiologia-exercicio', 'Fisiologia do Exercício', 3, 'Vias bioenergéticas, limiar anaeróbio, VO2máx e adaptações neuromusculares.', '41% de reprovação'),
('subj_ed_ads', 'ads', 'estruturas-de-dados', 'Algoritmos e Estruturas de Dados', 2, 'Vetores dinâmicos, listas encadeadas, pilhas, filas e árvores binárias.', '54% de reprovação média'),
('subj_bd_ads', 'ads', 'banco-de-dados-relacional', 'Modelagem de Bancos de Dados', 2, 'Diagramas Entidade-Relacionamento, Álgebra Relacional e Formas Normais (1FN-3FN).', '36% de reprovação'),
('subj_calculo1_cc', 'cc', 'calculo-diferencial-integral-1', 'Cálculo Diferencial e Integral I', 1, 'Limites laterais, derivadas pela regra da cadeia e introdução a integrais definidas.', '61% de reprovação histórica')
ON CONFLICT (id) DO NOTHING;

-- 3. PRODUTOS E PREÇOS COMERCIAIS (PIX)
INSERT INTO public.products (id, title, type, price_cents, duration_days, description, highlight) VALUES
('prod_pack_cinesio', 'Pack de Socorro P1: Cinesiologia & Biomecânica', 'pack', 1990, 180, 'Resumo esquematizado em alta definição + 15 questões comentadas + 20 flashcards interativos + gerador de PDF carimbado.', true),
('prod_pack_arvores', 'Pack de Socorro P1: Árvores AVL & Estrutura de Dados', 'pack', 1990, 180, 'Diagramas de rotação, traçado de algoritmos, 20 questões de prova resolvidas e simulado cronometrado anti-reprovação.', true),
('prod_pass_semestre', 'Passe do Semestre (Recorrência Semestral)', 'semester', 8990, 180, 'Acesso irrestrito a todos os resumos, simulados cronometrados e flashcards de todas as matérias do 1º ao 3º semestre. Sem mensalidade nas férias.', false),
('prod_ferias_nivelamento', 'Pack de Férias: Sobreviva a Cálculo & Algoritmos', 'holiday_leveling', 2490, 90, 'Guia pré-semestre de sobrevivência para calouros chegarem dominando os pré-requisitos que mais reprovam.', false)
ON CONFLICT (id) DO NOTHING;

-- 4. TÓPICO DIDÁTICO 1: CINESIOLOGIA (ALAVANCAS)
INSERT INTO public.topics (
  id, subject_id, slug, title, semester,
  author_name, author_role, author_crm_cref, author_avatar,
  reviewer_name, reviewer_role, reviewer_crm_cref, reviewer_avatar,
  mec_bibliography, status, pack_price_cents,
  free_content, premium_content, pdf_r2_key, pdf_page_count
) VALUES (
  'top_cinesio_alavancas',
  'subj_cinesio',
  'alavancas-biomecanicas-e-vetores',
  'Alavancas Biomecânicas (1ª, 2ª e 3ª Classe) e Vantagem Mecânica',
  2,
  'Dr. Thiago Medeiros, M.Sc.',
  'Sócio & Especialista em Fisioterapia Traumato-Ortopédica',
  'CREFITO-3: 184.920-F',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=160&q=80',
  'Dra. Camila Vasconcellos, Ph.D.',
  'Revisora Científica & Docente Titular de Cinesiologia',
  'CREFITO-3: 142.115-F',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=160&q=80',
  ARRAY[
    'KAPANDJI, I. A. Fisiologia Articular: Esquemas Comentados de Mecânica Humana. 6. ed. Guanabara Koogan, 2018.',
    'HALL, Susan J. Biomecânica Básica. 8. ed. McGraw-Hill / Artmed, 2020.',
    'NORDIN, Margareta; FRANKEL, Victor H. Biomecânica Básica do Sistema Musculoesquelético. 4. ed. Guanabara Koogan, 2014.'
  ],
  'published',
  1990,
  jsonb_build_object(
    'conceptIntro', 'No corpo humano, o sistema esquelético opera como uma série de barras rígidas (os ossos) que giram ao redor de eixos fixos (as articulações). Quase todas as articulações operam como Alavancas de 3ª Classe, priorizando amplitude e velocidade em detrimento da economia de força muscular.',
    'comparisonTable', jsonb_build_object(
      'headers', jsonb_build_array('Classe', 'Posição do Apoio', 'Exemplo Anatômico', 'Vantagem Mecânica (VM)'),
      'rows', jsonb_build_array(
        jsonb_build_array('1ª Classe (Interfixa)', 'Eixo ENTRE Força e Carga', 'Articulação Atlanto-Occipital (Nuca)', 'Pode ser = 1, > 1 ou < 1 (Equilíbrio)'),
        jsonb_build_array('2ª Classe (Inter-resistente)', 'Carga ENTRE Eixo e Força', 'Flexão Plantar (Tornozelo)', 'Sempre > 1 (Economia de Força)'),
        jsonb_build_array('3ª Classe (Interpotente)', 'Força ENTRE Eixo e Carga', 'Bíceps Braquial no Cotovelo', 'Sempre < 1 (Velocidade e Amplitude)')
      )
    ),
    'solvedQuestion', jsonb_build_object(
      'id', 'q_free_cinesio_1',
      'prompt', 'Durante a abdução glenoumeral de 90° sustentando um haltere de 4 kg na mão, qual é a classificação da alavanca e a implicação biomecânica?',
      'options', jsonb_build_array(
        'Alavanca de 2ª classe; o músculo exerce força menor que o peso.',
        'Alavanca de 3ª classe; o músculo deltoide deve gerar força superior à carga.',
        'Alavanca de 1ª classe; equilíbrio neutro.',
        'Alavanca de 3ª classe com vantagem mecânica maior que 1.'
      ),
      'correctIndex', 1,
      'explanation', 'Gabarito B: Trata-se de alavanca interpotente (3ª classe). A força muscular compensa a desvantagem mecânica para produzir grande arco de movimento.',
      'difficulty', 'Média'
    )
  ),
  jsonb_build_object(
    'fullSummaryMarkdown', '### 1. Equação Fundamental do Equilíbrio Rotacional\nTorque = Força x Braço de Alavanca.\n\n### 2. Dica para a Prova P1\n95% das articulações periféricas humanas são de 3ª classe!',
    'cheatSheetPoints', jsonb_build_array(
      'Apoio no meio = 1ª classe (Interfixa).',
      'Carga no meio = 2ª classe (Inter-resistente).',
      'Força no meio = 3ª classe (Interpotente).',
      'Pico de torque do Bíceps ocorre em 90° de flexão.'
    ),
    'pdfDownloadKey', 'r2_store/packs/cinesio/alavancas_esquematizado_v2.pdf',
    'pdfPageCount', 8,
    'questions', jsonb_build_array(
      jsonb_build_object(
        'id', 'q_prem_1',
        'prompt', 'A vantagem mecânica das alavancas de 3ª classe é menor que 1. Isso significa que:',
        'options', jsonb_build_array(
          'O corpo gasta menos energia.',
          'A força muscular deve ser multiplicada para vencer a carga.',
          'O braço de momento muscular é maior que o da resistência.',
          'Não há produção de torque rotatório.'
        ),
        'correctIndex', 1,
        'explanation', 'A força muscular precisa ser multiplicada para gerar ampla aceleração angular.',
        'difficulty', 'Fácil'
      )
    ),
    'flashcards', jsonb_build_array(
      jsonb_build_object(
        'id', 'fc_1',
        'front', 'Qual elemento fica no meio na Alavanca de 1ª Classe?',
        'back', 'O PONTO DE APOIO (EIXO) fica entre a Força e a Carga.',
        'mnemonic', 'Mnemônico: Apoio no meio = 1ª classe.',
        'category', 'Fundamentos'
      )
    )
  ),
  'r2_store/packs/cinesio/alavancas_esquematizado_v2.pdf',
  8
)
ON CONFLICT (id) DO NOTHING;

-- 5. PEDIDOS INICIAIS DA COMUNIDADE
INSERT INTO public.student_requests (id, student_name, course_name, subject_name, description, suggested_deadline, votes_count, status) VALUES
('b192e210-901b-4177-8fa2-3c1d88192a01', 'Beatriz Fontes (Fisio - 3º Sem)', 'Fisioterapia', 'Farmacologia dos Anti-inflamatórios (AINEs e COX-2)', 'Tabela comparativa da via da COX-1 vs COX-2 e os efeitos gástricos.', 'Semana que vem (P2)', 43, 'na_esteira_ia'),
('c203f321-a12c-5288-9fb3-4d2e99203b02', 'Gabriel Dorneles (ADS - 2º Sem)', 'ADS', 'Normalização de Banco: da 1FN até a 3FN', 'Exemplos práticos de desagregação de tabelas.', 'Em 4 dias', 67, 'em_revisao_socio')
ON CONFLICT (id) DO NOTHING;
