import type { Course, Subject, Topic, Product, StudentRequest, DownloadLog, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_8912',
  fullName: 'Luigi',
  cpf: '521.849.302-18',
  email: 'luigi@email.com',
  role: 'student',
  activeSessionId: 'sess_live_994a2f8',
  courseId: 'fisio',
};

export const COURSES: Course[] = [
  {
    id: 'fisio',
    slug: 'fisioterapia',
    name: 'Fisioterapia',
    area: 'Saúde',
    shortDesc: 'Resumos anatômicos e biomecânicos mastigados para não travar nas semanas de prova.',
    iconName: 'Activity',
    badge: 'Campeão em P1/P2',
  },
  {
    id: 'edf',
    slug: 'educacao-fisica',
    name: 'Educação Física',
    area: 'Saúde',
    shortDesc: 'Fisiologia aplicada ao esforço, cineantropometria e periodização sem enrolação.',
    iconName: 'Dumbbell',
    badge: 'MEC Tronco Comum',
  },
  {
    id: 'ads',
    slug: 'analise-desenvolvimento-sistemas',
    name: 'Análise e Dev. Sistemas (ADS)',
    area: 'Tecnologia',
    shortDesc: 'Estruturas de dados, POO e modelagem relacional explicadas em diagramas limpos.',
    iconName: 'Code',
    badge: 'Alta Taxa Reprovação',
  },
  {
    id: 'cc',
    slug: 'ciencia-computacao',
    name: 'Ciência da Computação',
    area: 'Tecnologia',
    shortDesc: 'Cálculo I, lógica matemática e grafos sem hermetismo desnecessário.',
    iconName: 'Cpu',
    badge: 'Nivelamento de Férias',
  },
];

export const SUBJECTS: Subject[] = [
  // Fisioterapia
  {
    id: 'subj_cinesio',
    courseId: 'fisio',
    slug: 'cinesiologia-biomecanica',
    name: 'Cinesiologia e Biomecânica',
    semester: 2,
    description: 'Análise vetorial de forças musculares, alavancas biológicas e goniometria.',
    failureRate: '48% de reprovação média',
  },
  {
    id: 'subj_anat_membros',
    courseId: 'fisio',
    slug: 'anatomia-musculoesqueletica',
    name: 'Anatomia Musculoesquelética',
    semester: 1,
    description: 'Origem, inserção, inervação e ação dos grandes grupos musculares.',
    failureRate: '39% de reprovação',
  },

  // Educação Física
  {
    id: 'subj_fisio_exercicio',
    courseId: 'edf',
    slug: 'fisiologia-exercicio',
    name: 'Fisiologia do Exercício',
    semester: 3,
    description: 'Vias bioenergéticas, limiar anaeróbio, VO2máx e adaptações neuromusculares.',
    failureRate: '41% de reprovação',
  },

  // ADS
  {
    id: 'subj_ed_ads',
    courseId: 'ads',
    slug: 'estruturas-de-dados',
    name: 'Algoritmos e Estruturas de Dados',
    semester: 2,
    description: 'Vetores dinâmicos, listas encadeadas, pilhas, filas e árvores binárias.',
    failureRate: '54% de reprovação média',
  },
  {
    id: 'subj_bd_ads',
    courseId: 'ads',
    slug: 'banco-de-dados-relacional',
    name: 'Modelagem de Bancos de Dados',
    semester: 2,
    description: 'Diagramas Entidade-Relacionamento, Álgebra Relacional e Formas Normais (1FN-3FN).',
    failureRate: '36% de reprovação',
  },

  // CC
  {
    id: 'subj_calculo1_cc',
    courseId: 'cc',
    slug: 'calculo-diferencial-integral-1',
    name: 'Cálculo Diferencial e Integral I',
    semester: 1,
    description: 'Limites laterais, derivadas pela regra da cadeia e introdução a integrais definidas.',
    failureRate: '61% de reprovação histórica',
  },
];

export const TOPICS: Topic[] = [
  {
    id: 'top_cinesio_alavancas',
    subjectId: 'subj_cinesio',
    slug: 'alavancas-biomecanicas-e-vetores',
    title: 'Alavancas Biomecânicas (1ª, 2ª e 3ª Classe) e Vantagem Mecânica',
    semester: 2,
    author: {
      name: 'Dr. Thiago Medeiros, M.Sc.',
      role: 'Sócio & Especialista em Fisioterapia Traumato-Ortopédica',
      crmCrfCref: 'CREFITO-3: 184.920-F',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=160&q=80',
    },
    reviewer: {
      name: 'Dra. Camila Vasconcellos, Ph.D.',
      role: 'Revisora Científica & Docente Titular de Cinesiologia',
      crmCrfCref: 'CREFITO-3: 142.115-F',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=160&q=80',
    },
    mecBibliography: [
      'KAPANDJI, I. A. Fisiologia Articular: Esquemas Comentados de Mecânica Humana. 6. ed. Guanabara Koogan, 2018.',
      'HALL, Susan J. Biomecânica Básica. 8. ed. McGraw-Hill / Artmed, 2020.',
      'NORDIN, Margareta; FRANKEL, Victor H. Biomecânica Básica do Sistema Musculoesquelético. 4. ed. Guanabara Koogan, 2014.',
    ],
    status: 'published',
    packPriceCents: 1990,
    freeContent: {
      conceptIntro: `No corpo humano, o sistema esquelético opera como uma série de barras rígidas (os ossos) que giram ao redor de eixos de rotação fixos (as articulações). O torque articular é determinado pela relação entre o Braço de Força (distância perpendicular da linha de ação do músculo ao eixo) e o Braço de Resistência (distância da carga externa ao eixo).

A quase totalidade das articulações humanas opera em desvantagem mecânica (Alavancas de 3ª Classe), priorizando a **amplitude articular e a velocidade angular** em detrimento da economia de força muscular pura.`,
      comparisonTable: {
        headers: ['Classe da Alavanca', 'Posição do Ponto de Apoio (Eixo)', 'Exemplo Anatômico Clássico', 'Vantagem Mecânica (VM)'],
        rows: [
          ['1ª Classe (Interfixa)', 'Eixo fica ENTRE a Força Potente e a Resistência', 'Articulação Atlanto-Occipital (Músculos da nuca sustentando o crânio)', 'Pode ser = 1, > 1 ou < 1 (Equilíbrio)'],
          ['2ª Classe (Inter-resistente)', 'A RESISTÊNCIA fica entre o Eixo e a Força Potente', 'Flexão Plantar do Tornozelo (Gastrocnêmio erguendo o peso corporal sobre os metatarsos)', 'Sempre > 1 (Economia de Força / Potência)'],
          ['3ª Classe (Interpotente)', 'A FORÇA POTENTE fica entre o Eixo e a Resistência', 'Flexão de Cotovelo pelo Bíceps Braquial (Inserção na tuberosidade do rádio)', 'Sempre < 1 (Velocidade e Amplitude de Movimento)'],
        ],
      },
      solvedQuestion: {
        id: 'q_free_cinesio_1',
        prompt: 'Durante a abdução glenoumeral de 90° sustentando um haltere de 4 kg na mão, o músculo deltoide médio insere-se a aproximadamente 3 cm do centro de rotação da cabeça umeral, enquanto o haltere dista 60 cm do eixo. Qual é a classificação da alavanca e a implicação biomecânica para a força muscular exigida?',
        options: [
          'Alavanca de 2ª classe; o músculo exerce força menor que o peso do haltere devido à grande vantagem mecânica.',
          'Alavanca de 3ª classe; o músculo deltoide deve gerar uma força contrátil dezenas de vezes superior ao peso do haltere.',
          'Alavanca de 1ª classe; o eixo localiza-se entre o deltoide e a mão, gerando equilíbrio isométrico neutro.',
          'Alavanca de 3ª classe; a vantagem mecânica é superior a 1.0, reduzindo a sobrecarga tendínea.',
        ],
        correctIndex: 1,
        explanation: 'Gabarito B: Trata-se de uma alavanca interpotente (3ª classe), pois a inserção do deltoide (força potente) localiza-se entre o fulcro glenoumeral (eixo) e o haltere na mão (resistência). Como o braço de momento muscular (3 cm) é 20 vezes menor que o braço de momento da resistência (60 cm), a vantagem mecânica é de apenas 0,05, exigindo que o deltoide produza uma força pelo menos 20 vezes maior que a carga externa.',
        difficulty: 'Média',
      },
    },
    premiumContent: {
      fullSummaryMarkdown: `### 1. Equação Fundamental do Equilíbrio Rotacional

Para que um segmento corporal permaneça em equilíbrio estático:
$$\\sum \\tau = 0 \\implies (F_{muscular} \\times d_{\\perp muscle}) - (R_{externa} \\times d_{\\perp res}) = 0$$

Onde:
* **$d_{\\perp}$** é o braço de momento (menor distância geométrica entre a linha de força e o eixo).
* **Vantagem Mecânica ($VM$)**: $VM = \\frac{d_{potente}}{d_{resistente}}$.

### 2. O Paradoxo do Bíceps Braquial e a Variação do Braço de Alavanca
* Em extensão completa ($0^\\circ$): a linha de tração do bíceps é quase paralela ao rádio. Quase todo o vetor produz força translatória (estabilizadora/compressiva sobre a tróclea umeral) e mínimo torque rotatório.
* Em flexão de $90^\\circ$: o tendão do bíceps incide a quase $90^\\circ$ sobre o rádio. O braço de alavanca atinge o seu valor máximo ($d_{\\perp} \\approx 4{,}5\\text{ a }5{,}0\\text{ cm}$), momento em que a eficiência de torque é máxima para a mesma ativação eletromiográfica.
* Em flexão extrema ($> 120^\\circ$): o tendão perde ângulo ideal de tração e sofre aproximação dos sarcômeros em insuficiência ativa.

### 3. Síntese Esquematizada para a Prova (Regra de Ouro da P1)
1. Se a questão cita **nuca, mastigação equilibrada ou balanço da pelve em Trendelenburg**: pense em **1ª classe (Interfixa)**.
2. Se a questão cita **ponta dos pés (panturrilha)** ou quebra-nozes: pense em **2ª classe (Inter-resistente)**. Raríssima no corpo!
3. Se a questão cita **cotovelo, joelho, quadril ou ombro**: marque sem medo **3ª classe (Interpotente)**. Representa 95% das articulações periféricas!`,
      cheatSheetPoints: [
        'Apoio no meio = Interfixa (1ª classe) - Foco em Equilíbrio.',
        'Carga no meio = Inter-resistente (2ª classe) - VM > 1, Força.',
        'Força no meio = Interpotente (3ª classe) - VM < 1, Amplitude & Agilidade.',
        'Ângulo de máxima eficácia do Bíceps = 90° de flexão.',
        'Insuficiência Ativa = Músculo biarticular não consegue encurtar mais em ambos os eixos simultaneamente.',
      ],
      pdfDownloadKey: 'r2_store/packs/cinesio/alavancas_esquematizado_v2.pdf',
      pdfPageCount: 8,
      questions: [
        {
          id: 'q_prem_cinesio_1',
          prompt: 'Qual componente vetorial da força muscular do tendão patelar sobre a tuberosidade anterior da tíbia é responsável pelo deslizamento articular anterior (tensão do LCA) em 30° de flexão?',
          options: [
            'Componente translatório anterior (perpendicular à tíbia).',
            'Componente compressivo longitudinal (paralelo à diáfise tibial).',
            'Componente rotatório em supinação.',
            'Vetor de torque neutro.',
          ],
          correctIndex: 0,
          explanation: 'Em 30° de flexão de joelho, o vetor do tendão patelar possui uma forte inclinação anterior. Sua decomposição perpendicular à tíbia gera uma força de cisalhamento anterior, tracionando o ligamento cruzado anterior (LCA).',
          difficulty: 'Difícil',
        },
        {
          id: 'q_prem_cinesio_2',
          prompt: 'A vantagem mecânica das alavancas de 3ª classe é menor que 1. Isso significa que:',
          options: [
            'O corpo gasta menos calorias para mover grandes massas.',
            'O músculo precisa gerar força superior à carga para compensar o menor braço de potência.',
            'O braço de resistência é menor que o braço de potência.',
            'Não ocorre produção de torque rotatório.',
          ],
          correctIndex: 1,
          explanation: 'Como o braço muscular de alavanca é mais curto que o braço da carga, VM < 1 implica que a força muscular deve ser multiplicada, permitindo que pequenos encurtamentos musculares resultem em grandes trajetórias da extremidade distal.',
          difficulty: 'Fácil',
        },
        {
          id: 'q_prem_cinesio_3',
          prompt: 'O músculo reto femoral atua estendendo o joelho e flexionando o quadril. Quando ambos os movimentos ocorrem ao mesmo tempo em velocidade máxima, o músculo entra em:',
          options: [
            'Insuficiência Passiva.',
            'Insuficiência Ativa.',
            'Isometria Pura.',
            'Contração Auxotônica.',
          ],
          correctIndex: 1,
          explanation: 'A insuficiência ativa ocorre quando um músculo biarticular atinge um nível extremo de encurtamento em duas articulações consecutivas, impedindo a formação adicional de pontes cruzadas de actina e miosina.',
          difficulty: 'Média',
        },
      ],
      flashcards: [
        {
          id: 'fc_1',
          front: 'Qual o elemento central da Alavanca de 1ª Classe (Interfixa)?',
          back: 'O PONTO DE APOIO (EIXO) fica localizado entre a Força Potente e a Força Resistente.',
          mnemonic: 'Mnemônico: "A-P-R" (Apoio no meio na 1ª). Ex: Cabeça apoiada na coluna cervical.',
          category: 'Fundamentos',
        },
        {
          id: 'fc_2',
          front: 'Por que o ser humano é quase todo construído em Alavancas de 3ª Classe?',
          back: 'Porque embora exijam maior força muscular, proporcionam enorme AMPLITUDE de movimento e alta VELOCIDADE angular na ponta dos membros.',
          mnemonic: 'Troca-se economia de força por agilidade evolutiva.',
          category: 'Evolução Biomecânica',
        },
        {
          id: 'fc_3',
          front: 'O que define a Vantagem Mecânica (VM) ser maior que 1,0?',
          back: 'Quando o Braço de Força (Potente) é maior que o Braço de Resistência ($d_p > d_r$). O esforço exigido é menor que a carga.',
          mnemonic: 'Presente nas alavancas de 2ª classe (panturrilha).',
          category: 'Cálculo de Torque',
        },
        {
          id: 'fc_4',
          front: 'Em qual ângulo de flexão do cotovelo o Bíceps Braquial atinge o maior braço de momento?',
          back: 'Aproximadamente em 90° de flexão articular, onde a linha do tendão atua perpendicularmente ao rádio ($90^\\circ$).',
          mnemonic: '90° = braço de momento perpendicular máximo = pico de torque.',
          category: 'Aplicações Práticas',
        },
      ],
    },
  },

  // ADS Topic
  {
    id: 'top_ads_arvores',
    subjectId: 'subj_ed_ads',
    slug: 'arvores-avl-balanceamento-rotacoes',
    title: 'Árvores AVL: Fator de Balanceamento e Rotações (Simples e Duplas)',
    semester: 2,
    author: {
      name: 'Eng. Murilo Santoro, M.Sc.',
      role: 'Sócio & Especialista em Algoritmos e Sistemas Distribuídos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    },
    reviewer: {
      name: 'Prof. Rodolfo Nogueira, Ph.D.',
      role: 'Doutor em Ciência da Computação (USP) & Revisor Técnico',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    },
    mecBibliography: [
      'CORMEN, Thomas H. et al. Algoritmos: Teoria e Prática. 3. ed. Rio de Janeiro: Elsevier, 2012.',
      'DROZDEK, Adam. Estrutura de Dados e Algoritmos em C++. Cengage Learning, 2016.',
      'SEDGEWICK, Robert; WAYNE, Kevin. Algorithms. 4. ed. Addison-Wesley, 2011.',
    ],
    status: 'published',
    packPriceCents: 1990,
    freeContent: {
      conceptIntro: `Uma Árvore Binária de Busca (BST) degenerada em ordem crescente comporta-se exatamente como uma lista encadeada simples, com complexidade de busca degradada para $O(N)$ no pior caso.

A Árvore AVL (criada pelos matemáticos soviéticos Adelson-Velsky e Landis em 1962) resolve esse problema impondo uma restrição geométrica estrita: a diferença de altura entre a subárvore esquerda e direita de **qualquer nó** nunca pode exceder 1 unidade absoluta.`,
      comparisonTable: {
        headers: ['Operação / Cenário', 'BST Comum (Pior Caso)', 'Árvore AVL (Pior Caso)', 'Árvore Rubro-Negra'],
        rows: [
          ['Busca de Chave', '$O(N)$ (Lista esticada)', '$O(\\log N)$ (Garantido)', '$O(\\log N)$'],
          ['Inserção de Chave', '$O(N)$', '$O(\\log N)$ + Rotações', '$O(\\log N)$'],
          ['Fator de Balanceamento FB(u)', 'Sem limite fixo', 'FB $\\in \\{-1, 0, +1\\}$', 'Regra de nós pretos e vermelhos'],
          ['Custo de Rotação', 'Nenhum', 'Máximo 2 rotações por inserção', 'Máximo 2 rotações por inserção'],
        ],
      },
      solvedQuestion: {
        id: 'q_free_ads_1',
        prompt: 'Após inserir os valores sequenciais [10, 20, 30] em uma árvore AVL inicialmente vazia, qual evento de rotação é disparado e qual chave passa a ser a nova raiz?',
        options: [
          'Rotação Dupla Direita-Esquerda; a raiz torna-se 10.',
          'Rotação Simples à Esquerda (RSE) em torno do nó 10; a nova raiz é o nó 20.',
          'Nenhuma rotação é necessária porque o fator de balanceamento é mantido em 0.',
          'Rotação Simples à Direita (RSD) em torno do nó 30; a nova raiz é o nó 30.',
        ],
        correctIndex: 1,
        explanation: 'Gabarito B: Ao inserir 10, depois 20 (filho direito de 10) e 30 (filho direito de 20), o nó 10 fica com altura esquerda = 0 e altura direita = 2, resultando em FB(10) = -2 (desbalanceamento com zig-zig à direita). Dispara-se uma Rotação Simples à Esquerda (RSE) com pivô no nó 20, que sobe para a raiz, tornando 10 seu filho esquerdo e 30 seu filho direito.',
        difficulty: 'Média',
      },
    },
    premiumContent: {
      fullSummaryMarkdown: `### 1. Cálculo Rigoroso do Fator de Balanceamento (FB)

Para todo nó $u$ na árvore:
$$FB(u) = h(u.esq) - h(u.dir)$$

* **Nó balanceado**: $FB(u) \\in \\{-1, 0, +1\\}$.
* **Nó desbalanceado à esquerda**: $FB(u) = +2$.
* **Nó desbalanceado à direita**: $FB(u) = -2$.

### 2. Tabela de Decisão para as 4 Rotações em Prova

| Sinal de $FB(u)$ | Sinal do Filho Crítico | Caso de Desbalanceamento | Solução Cirúrgica |
| :--- | :--- | :--- | :--- |
| $+2$ | $+1$ ou $0$ | Esquerda-Esquerda (Zig-Zig) | **Rotação Simples à Direita (RSD)** |
| $-2$ | $-1$ ou $0$ | Direita-Direita (Zig-Zig) | **Rotação Simples à Esquerda (RSE)** |
| $+2$ | $-1$ | Esquerda-Direita (Zig-Zag) | **Rotação Dupla Esquerda-Direita (RDED)** |
| $-2$ | $+1$ | Direita-Esquerda (Zig-Zag) | **Rotação Dupla Direita-Esquerda (RDDE)** |

### 3. Código Comentado da Rotação Simples à Esquerda (C/TypeScript)
\`\`\`ts
function rotateLeft(root: AVLNode): AVLNode {
  const pivot = root.right!;
  root.right = pivot.left;
  pivot.left = root;
  
  // Atualiza alturas em O(1)
  root.height = 1 + Math.max(height(root.left), height(root.right));
  pivot.height = 1 + Math.max(height(pivot.left), height(pivot.right));
  
  return pivot; // Novo ponteiro de raiz da subárvore
}
\`\`\``,
      cheatSheetPoints: [
        'FB = Altura(Esq) - Altura(Dir). Se der +2 ou -2, quebrou a invariante AVL.',
        'Sinais iguais (+2 com +1, ou -2 com -1) = Rotação SIMPLES.',
        'Sinais opostos (+2 com -1, ou -2 com +1) = Rotação DUPLA.',
        'Na rotação dupla, primeiro roda-se o filho no sinal inverso, depois o pai.',
        'Complexidade de busca, inserção e remoção sempre estritamente O(log N).',
      ],
      pdfDownloadKey: 'r2_store/packs/ads/arvores_avl_completo_comentado.pdf',
      pdfPageCount: 11,
      questions: [
        {
          id: 'q_prem_ads_1',
          prompt: 'Qual é o número mínimo de nós necessários para construir uma árvore AVL de altura h = 4 (considerando altura de folha = 0)?',
          options: ['12 nós', '8 nós', '7 nós', '15 nós'],
          correctIndex: 0,
          explanation: 'Pela fórmula recursiva de nós mínimos N(h) = N(h-1) + N(h-2) + 1: N(0)=1, N(1)=2, N(2)=4, N(3)=7, N(4) = 7 + 4 + 1 = 12 nós.',
          difficulty: 'Difícil',
        },
      ],
      flashcards: [
        {
          id: 'fc_ads_1',
          front: 'Qual é o critério obrigatório para um nó ser considerado AVL-Balanceado?',
          back: 'O valor absoluto do Fator de Balanceamento |FB| deve ser menor ou igual a 1 (ou seja, FB pode ser apenas -1, 0 ou +1).',
          mnemonic: '|FB| <= 1 sempre.',
          category: 'Invariantes de Árvore',
        },
        {
          id: 'fc_ads_2',
          front: 'Quando ocorre uma Rotação Dupla à Esquerda-Direita (Zig-Zag)?',
          back: 'Quando o nó desbalanceado tem FB = +2 e seu filho esquerdo tem sinal contrário FB = -1.',
          mnemonic: 'Sinais contrários exigem 2 rotações (primeiro esquerda no filho, depois direita no pai).',
          category: 'Rotações',
        },
      ],
    },
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod_pack_cinesio',
    title: 'Pack de Socorro P1: Cinesiologia & Biomecânica',
    type: 'pack',
    priceCents: 1990,
    durationDays: 180,
    description: 'Resumo esquematizado em alta definição + 15 questões comentadas passo a passo + 20 flashcards interativos + gerador de PDF carimbado.',
    highlight: true,
  },
  {
    id: 'prod_pack_arvores',
    title: 'Pack de Socorro P1: Árvores AVL & Estrutura de Dados',
    type: 'pack',
    priceCents: 1990,
    durationDays: 180,
    description: 'Diagramas de rotação, traçado de algoritmos em C/Java, 20 questões de prova resolvidas e simulado cronometrado anti-reprovação.',
    highlight: true,
  },
  {
    id: 'prod_pass_semestre',
    title: 'Passe do Semestre (Recorrência Semestral)',
    type: 'semester',
    priceCents: 8990,
    durationDays: 180,
    description: 'Acesso irrestrito a todos os resumos, simulados cronometrados e flashcards de todas as matérias do 1º ao 3º semestre. Sem mensalidade durante as férias.',
    highlight: false,
  },
  {
    id: 'prod_ferias_nivelamento',
    title: 'Pack de Férias: Sobreviva a Cálculo & Algoritmos',
    type: 'holiday_leveling',
    priceCents: 2490,
    durationDays: 90,
    description: 'Guia pré-semestre de sobrevivência para calouros chegarem na faculdade dominando os pré-requisitos que mais reprovam.',
    highlight: false,
  },
];

export const STUDENT_REQUESTS: StudentRequest[] = [
  {
    id: 'req_1',
    studentName: 'Beatriz Fontes (Fisio - 3º Sem)',
    courseName: 'Fisioterapia',
    subjectName: 'Farmacologia dos Anti-inflamatórios (AINEs e Esteroidais)',
    description: 'Preciso da tabela comparativa da via da COX-1 vs COX-2 e os efeitos gástricos antes da P2 da semana que vem!',
    suggestedDeadline: 'Semana que vem (P2)',
    votesCount: 43,
    status: 'na_esteira_ia',
  },
  {
    id: 'req_2',
    studentName: 'Gabriel Dorneles (ADS - 2º Sem)',
    courseName: 'ADS',
    subjectName: 'Normalização de Banco: da 1FN até a Forma Normal de Boyce-Codd',
    description: 'O professor só dá slide com texto confuso. Precisamos de exemplos práticos de desagregação de tabelas.',
    suggestedDeadline: 'Em 4 dias',
    votesCount: 67,
    status: 'em_revisao_socio',
  },
  {
    id: 'req_3',
    studentName: 'Juliana Prado (CC - 1º Sem)',
    courseName: 'Ciência da Computação',
    subjectName: 'Técnicas de Integração por Substituição Trigonométrica',
    description: 'Macetes para desenhar o triângulo retângulo e não errar a conversão da raiz.',
    suggestedDeadline: 'Urgente',
    votesCount: 89,
    status: 'em_analise',
  },
];

export const DOWNLOAD_LOGS: DownloadLog[] = [
  {
    id: 'log_901',
    userId: 'usr_8912',
    userName: 'Luigi',
    userCpf: '521.849.302-18',
    topicTitle: 'Alavancas Biomecânicas e Vetores',
    ip: '177.136.21.90 (São Paulo - SP)',
    timestamp: 'Hoje, 14:15:02',
    watermarkHash: 'SHA256:7f9a2e38c41d',
    status: 'allowed',
  },
  {
    id: 'log_902',
    userId: 'usr_4401',
    userName: 'Mariana Duarte',
    userCpf: '281.449.108-33',
    topicTitle: 'Árvores AVL e Rotações',
    ip: '189.102.14.77 (Campinas - SP)',
    timestamp: 'Hoje, 13:42:19',
    watermarkHash: 'SHA256:c18ef027b140',
    status: 'allowed',
  },
  {
    id: 'log_903',
    userId: 'usr_7712',
    userName: 'Carlos Eduardo Nogueira',
    userCpf: '311.902.551-04',
    topicTitle: 'Árvores AVL e Rotações',
    ip: '201.88.94.120 (Tentativa de Download Simultâneo em 3 IPs)',
    timestamp: 'Hoje, 11:20:05',
    watermarkHash: 'SUSPECT_CLUSTER_IP',
    status: 'suspicious',
  },
];
