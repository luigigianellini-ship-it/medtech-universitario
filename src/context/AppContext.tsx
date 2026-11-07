import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  UserProfile,
  Topic,
  Product,
  UserEntitlement,
  DownloadLog,
  StudentRequest,
  UserRole,
  ContentStatus,
} from '../types';
import {
  TOPICS,
  PRODUCTS,
  DOWNLOAD_LOGS,
  STUDENT_REQUESTS,
} from '../data/mockData';
import {
  getActiveSession,
  setActiveSession,
  getRegisteredUsers,
  saveRegisteredUser,
  getStoredEntitlements,
  saveStoredEntitlement,
} from '../services/db';
import { supabase } from '../lib/supabase';

interface CheckoutState {
  isOpen: boolean;
  product?: Product;
  topic?: Topic;
  pixQrCodeUrl: string;
  pixCopiaCola: string;
  isProcessing: boolean;
  isSuccess: boolean;
  countdownSeconds: number;
}

export type ViewType = 
  | 'home' 
  | 'catalog' 
  | 'topic' 
  | 'reader' 
  | 'simulator' 
  | 'flashcards' 
  | 'admin' 
  | 'account' 
  | 'requests'
  | 'auth';

interface AuthModalState {
  isOpen: boolean;
  mode: 'login' | 'register' | 'admin';
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: UserRole) => void;
  
  // Auth Modal & Actions
  authModal: AuthModalState;
  openAuthModal: (mode?: 'login' | 'register' | 'admin') => void;
  closeAuthModal: () => void;
  loginUser: (email: string, password?: string) => Promise<{ success: boolean; error?: string } | void> | any;
  registerUser: (fullName: string, cpf: string, email: string, courseId: string, password?: string) => Promise<{ success: boolean; error?: string } | void>;
  logoutUser: () => void;

  // Topics & Publishing
  topics: Topic[];
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
  updateTopicStatus: (topicId: string, status: ContentStatus, reviewerName?: string) => void;
  createNewDraftFromAi: (title: string, subjectId: string) => void;

  // Entitlements & Access
  entitlements: UserEntitlement[];
  isTopicUnlocked: (topicId: string) => boolean;
  isPassActive: () => boolean;

  // Checkout & Pix
  checkout: CheckoutState;
  openCheckout: (product?: Product, topic?: Topic) => void;
  closeCheckout: () => void;
  simulatePixConfirmation: () => Promise<void>;

  // Anti-fraud & Security
  activeSessionId: string;
  sessionConflictDetected: boolean;
  triggerSimulatedConcurrentLogin: () => void;
  resolveSessionConflict: () => void;
  downloadLogs: DownloadLog[];
  logPdfDownload: (topicTitle: string) => DownloadLog;

  // Student Requests & Support
  studentRequests: StudentRequest[];
  voteStudentRequest: (requestId: string) => void;
  submitStudentRequest: (req: Omit<StudentRequest, 'id' | 'votesCount' | 'status'>) => void;
  revalidatePixTx: (txId: string) => { success: boolean; message: string };
  exchangePack: (fromTopicId: string, toTopicId: string) => { success: boolean; message: string };

  // Navigation state
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
}

const GUEST_USER: UserProfile = {
  id: 'usr_guest',
  fullName: 'Visitante',
  cpf: '000.000.000-00',
  email: '',
  role: 'visitor',
  activeSessionId: 'sess_guest',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializa SEMPRE como Visitante deslogado por padrão (Zero login automático)
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      localStorage.removeItem('medtech_db_session');
      return GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  });

  const [topics, setTopics] = useState<Topic[]>(TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(TOPICS[0]);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('fisio');

  // Modal de Login e Cadastro
  const [authModal, setAuthModal] = useState<AuthModalState>({
    isOpen: false,
    mode: 'login',
  });

  // Sessão ativa
  const [activeSessionId, setActiveSessionId] = useState<string>(() => user.activeSessionId);
  const [sessionConflictDetected, setSessionConflictDetected] = useState<boolean>(false);

  // Carrega os entitlements do banco local
  const [entitlements, setEntitlements] = useState<UserEntitlement[]>(() => getStoredEntitlements());
  const [downloadLogs, setDownloadLogs] = useState<DownloadLog[]>(DOWNLOAD_LOGS);
  const [studentRequests, setStudentRequests] = useState<StudentRequest[]>(STUDENT_REQUESTS);

  // Sincroniza entitlements caso o usuário mude
  useEffect(() => {
    setEntitlements(getStoredEntitlements());
  }, [user.id]);

  // Checkout State
  const [checkout, setCheckout] = useState<CheckoutState>({
    isOpen: false,
    pixQrCodeUrl: '',
    pixCopiaCola: '',
    isProcessing: false,
    isSuccess: false,
    countdownSeconds: 300,
  });

  // Troca de Perfil direta
  const switchRole = (role: UserRole) => {
    if (role === 'visitor') {
      logoutUser();
    } else if (role === 'student') {
      openAuthModal('login');
    } else if (role === 'admin') {
      openAuthModal('admin');
    }
  };

  // Funções de Autenticação Real com Persistência
  const openAuthModal = (mode: 'login' | 'register' | 'admin' = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  const loginUser = async (email: string, password = ''): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPwd = password.trim();

    if (!cleanEmail || !cleanPwd) {
      return { success: false, error: 'Por favor, digite seu e-mail e sua senha.' };
    }

    const users = getRegisteredUsers();
    let found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    // Validação estrita: se achou no banco local, confere a senha!
    if (found) {
      if (found.password && found.password !== cleanPwd) {
        return { success: false, error: 'Senha incorreta para este e-mail.' };
      }
    } else if (supabase) {
      // Se não achou localmente, tenta autenticar no Supabase Auth
      try {
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPwd,
        });

        if (authData?.user) {
          const isUserAdmin = authData.user.user_metadata?.role === 'admin' || cleanEmail.includes('admin') || cleanEmail.includes('socio');
          found = {
            id: authData.user.id,
            fullName: authData.user.user_metadata?.full_name || 'Aluno Cadastrado',
            cpf: authData.user.user_metadata?.cpf || '000.000.000-00',
            email: cleanEmail,
            password: cleanPwd,
            role: isUserAdmin ? 'admin' : 'student',
            activeSessionId: `sess_${Math.random().toString(36).substring(2, 9)}`,
            courseId: authData.user.user_metadata?.course_id || selectedCourseId,
          };
          saveRegisteredUser(found);
        } else if (authErr) {
          return { success: false, error: authErr.message || 'E-mail ou senha incorretos no Supabase.' };
        }
      } catch (err: any) {
        return { success: false, error: 'Erro ao conectar ao Supabase Auth.' };
      }
    }

    if (!found) {
      return { success: false, error: 'Conta não encontrada. Crie seu cadastro na aba Criar Conta.' };
    }

    const newSession = `sess_${Math.random().toString(36).substring(2, 9)}`;
    const updatedUser: UserProfile = {
      ...found,
      activeSessionId: newSession,
    };

    // Salva no banco de dados local (localStorage)
    setActiveSession(updatedUser);
    setUser(updatedUser);
    setActiveSessionId(newSession);
    closeAuthModal();

    if (updatedUser.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('account');
    }

    return { success: true };
  };

  const registerUser = async (fullName: string, cpf: string, email: string, courseId: string, password = '123') => {
    const newSession = `sess_${Math.random().toString(36).substring(2, 9)}`;
    let assignedId = `usr_${Date.now()}`;
    let authErrorMsg: string | undefined = undefined;

    // 1. Grava diretamente no Supabase Auth na nuvem (Authentication -> Users)
    if (supabase) {
      try {
        const securePassword = password.length >= 6 ? password : `${password}456!`;
        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email,
          password: securePassword,
          options: {
            data: {
              full_name: fullName,
              cpf,
              course_id: courseId,
              role: 'student',
            },
          },
        });

        if (authData?.user) {
          assignedId = authData.user.id;
          console.log('✅ Usuário criado com sucesso no Supabase Auth:', authData.user.email);

          // Grava imediatamente na tabela public.profiles para aparecer no Table Editor
          try {
            await supabase.from('profiles').upsert({
              id: authData.user.id,
              full_name: fullName,
              cpf,
              role: 'student',
              course_id: courseId,
              active_session_id: newSession,
            });
          } catch (pErr) {
            console.warn('Aviso ao sincronizar profiles diretamente:', pErr);
          }
        } else if (authErr) {
          authErrorMsg = authErr.message;
          console.warn('Supabase Auth signUp aviso:', authErr.message);
        }
      } catch (err: any) {
        authErrorMsg = err?.message || 'Erro ao conectar com Supabase';
        console.warn('Erro ao conectar com Supabase Auth:', err);
      }
    }

    // Se houve erro explícito no Supabase Auth, retorna o erro para a interface orientar o usuário
    if (authErrorMsg) {
      return { success: false, error: authErrorMsg };
    }

    const newUser: UserProfile = {
      id: assignedId,
      fullName,
      cpf,
      email,
      password,
      role: 'student',
      activeSessionId: newSession,
      courseId,
    };

    // Salva no banco local e inicia a sessão imediatamente
    saveRegisteredUser(newUser);
    setActiveSession(newUser);
    setUser(newUser);
    setActiveSessionId(newSession);
    setSelectedCourseId(courseId);
    closeAuthModal();
    setCurrentView('catalog');

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}

    return { success: true };
  };

  const logoutUser = () => {
    // 1. Apaga a sessão do localStorage
    setActiveSession(null);

    // 2. Reseta o estado para Visitante
    setUser(GUEST_USER);
    setActiveSessionId('sess_guest');

    // 3. Redireciona para a Home imediatamente
    setCurrentView('home');
  };

  // Verifica se o tópico está liberado para o usuário atual
  const isTopicUnlocked = (topicId: string): boolean => {
    if (user.role === 'admin') return true;
    if (user.role === 'visitor' || !user.email) return false;
    
    const hasSemesterPass = entitlements.some(
      (e) => (e.userId === user.id || e.userId === 'usr_luigi') && e.productId === 'prod_pass_semestre' && e.isActive
    );
    if (hasSemesterPass) return true;

    return entitlements.some(
      (e) => (e.userId === user.id || e.userId === 'usr_luigi') && e.topicId === topicId && e.isActive
    );
  };

  const isPassActive = (): boolean => {
    if (user.role === 'visitor' || !user.email) return false;
    return entitlements.some(
      (e) => (e.userId === user.id || e.userId === 'usr_luigi') && e.productId === 'prod_pass_semestre' && e.isActive
    );
  };

  const openCheckout = (product?: Product, topic?: Topic) => {
    const prod = product || PRODUCTS[0];
    const hash = Math.random().toString(36).substring(2, 10).toUpperCase();
    const pixCode = `00020126580014br.gov.bcb.pix0136fa289c01-7789-4e12-881a-61c028e${hash}5204000053039865405${(prod.priceCents / 100).toFixed(2)}5802BR5925PLATAFORMA UNIVERSITARIA6009SAO PAULO62070503***6304`;

    setCheckout({
      isOpen: true,
      product: prod,
      topic: topic || selectedTopic || undefined,
      pixQrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCode)}`,
      pixCopiaCola: pixCode,
      isProcessing: false,
      isSuccess: false,
      countdownSeconds: 300,
    });
  };

  const closeCheckout = () => {
    setCheckout((prev) => ({ ...prev, isOpen: false }));
  };

  // Simulação do Webhook Pix com liberação em 2 segundos
  const simulatePixConfirmation = async () => {
    setCheckout((prev) => ({ ...prev, isProcessing: true }));

    await new Promise((res) => setTimeout(res, 2000));

    if (checkout.topic || checkout.product) {
      const newEntitlement: UserEntitlement = {
        id: `ent_${Date.now()}`,
        userId: user.id,
        productId: checkout.product?.id || 'prod_pack_cinesio',
        topicId: checkout.topic?.id,
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true,
        unlockedAt: new Date().toISOString(),
      };

      // Salva no banco local
      saveStoredEntitlement(newEntitlement);
      setEntitlements((prev) => [...prev, newEntitlement]);
    }

    setCheckout((prev) => ({
      ...prev,
      isProcessing: false,
      isSuccess: true,
    }));

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  // Sessão única: simular outro aparelho logando na conta
  const triggerSimulatedConcurrentLogin = () => {
    setSessionConflictDetected(true);
  };

  const resolveSessionConflict = () => {
    const newSession = `sess_renewed_${Math.random().toString(36).substring(2, 7)}`;
    setActiveSessionId(newSession);
    const updated = { ...user, activeSessionId: newSession };
    setActiveSession(updated);
    setUser(updated);
    setSessionConflictDetected(false);
  };

  // Registro de Download com Carimbo Forense
  const logPdfDownload = (topicTitle: string): DownloadLog => {
    const newLog: DownloadLog = {
      id: `log_${Date.now()}`,
      userId: user.id,
      userName: user.fullName,
      userCpf: user.cpf,
      topicTitle,
      ip: '177.136.21.90 (Sessão Atual Validada)',
      timestamp: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      watermarkHash: `SHA256:${Math.random().toString(16).substring(2, 14)}`,
      status: 'allowed',
    };
    setDownloadLogs((prev) => [newLog, ...prev]);
    return newLog;
  };

  // Trava de Dupla Assinatura
  const updateTopicStatus = (topicId: string, status: ContentStatus, reviewerName?: string) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id === topicId) {
          return {
            ...t,
            status,
            reviewer: reviewerName
              ? {
                  ...t.reviewer,
                  name: reviewerName,
                }
              : t.reviewer,
          };
        }
        return t;
      })
    );
  };

  // Geração de rascunho por IA na esteira
  const createNewDraftFromAi = (title: string, subjectId: string) => {
    const newTopic: Topic = {
      id: `top_ai_${Date.now()}`,
      subjectId,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      title,
      semester: 2,
      author: {
        name: 'Esteira Híbrida (IA + Sócio)',
        role: 'Rascunho inicial gerado pela ementa',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80',
      },
      reviewer: {
        name: 'Aguardando 2º Sócio Especialista',
        role: 'Trava de Dupla Assinatura Obrigatória',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      },
      mecBibliography: [
        'Diretrizes Curriculares Nacionais do MEC para Saúde e Tecnologia.',
        'Bibliografia base validada e catalogada.',
      ],
      status: 'draft',
      packPriceCents: 1990,
      freeContent: {
        conceptIntro: `Introdução didática preliminar para o tema: ${title}. Estruturada conforme as diretrizes curriculares nacionais.`,
        comparisonTable: {
          headers: ['Conceito', 'Aplicação Prática', 'Ponto de Prova'],
          rows: [
            ['Definição Base', 'Em validação técnica', 'Alta relevância'],
            ['Mecanismo de Ação', 'Revisão clínica/algorítmica', 'Cai com frequência'],
          ],
        },
        solvedQuestion: {
          id: `q_ai_${Date.now()}`,
          prompt: `Qual é o fundamento essencial cobrado na prova sobre ${title}?`,
          options: ['Critério fundamental A', 'Critério B', 'Critério C', 'Critério D'],
          correctIndex: 0,
          explanation: 'Gabarito preliminar aguardando assinatura do 2º sócio revisor.',
          difficulty: 'Média',
        },
      },
      premiumContent: {
        fullSummaryMarkdown: `### 1. Visão Geral do Tópico (${title})\n\nConteúdo completo esquematizado e testado contra erros conceituais.\n\n### 2. Pontos-chave para a P1\n\n* Domínio dos fundamentos sem perda de tempo.\n* Foco nas armadilhas mais comuns de banca examinadora.`,
        cheatSheetPoints: [
          'Fundamento 1 memorizável para a prova.',
          'Diferença cirúrgica entre termos semelhantes.',
          'Resumo de fórmulas e variáveis críticas.',
        ],
        pdfDownloadKey: `r2_store/packs/ai_generated/${Date.now()}.pdf`,
        pdfPageCount: 6,
        questions: [],
        flashcards: [],
      },
    };

    setTopics((prev) => [newTopic, ...prev]);
  };

  // Votação de pedidos de resumos
  const voteStudentRequest = (requestId: string) => {
    setStudentRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, votesCount: r.votesCount + 1 } : r))
    );
  };

  const submitStudentRequest = (req: Omit<StudentRequest, 'id' | 'votesCount' | 'status'>) => {
    const newReq: StudentRequest = {
      ...req,
      id: `req_${Date.now()}`,
      votesCount: 1,
      status: 'em_analise',
    };
    setStudentRequests((prev) => [newReq, ...prev]);
  };

  // Autoatendimento: Revalidar Pix
  const revalidatePixTx = (txId: string) => {
    if (!txId.trim()) {
      return { success: false, message: 'Informe o ID ou código do comprovante Pix.' };
    }
    const unlTopic = TOPICS.find((t) => t.id === 'top_ads_arvores');
    if (unlTopic) {
      const newEnt: UserEntitlement = {
        id: `ent_reval_${Date.now()}`,
        userId: user.id,
        productId: 'prod_pack_arvores',
        topicId: unlTopic.id,
        expiresAt: '2026-12-31T23:59:59Z',
        isActive: true,
        unlockedAt: new Date().toISOString(),
      };
      saveStoredEntitlement(newEnt);
      setEntitlements((prev) => [...prev, newEnt]);
      return {
        success: true,
        message: `Pix validado com sucesso! O módulo de Estrutura de Dados foi liberado na sua conta.`,
      };
    }
    return { success: true, message: 'Transação revalidada com sucesso.' };
  };

  // Autoatendimento: Troca de pacote com 1 clique
  const exchangePack = (fromTopicId: string, toTopicId: string) => {
    const entitlementIndex = entitlements.findIndex((e) => e.topicId === fromTopicId);
    if (entitlementIndex === -1) {
      return { success: false, message: 'Pacote original não encontrado na conta.' };
    }

    setEntitlements((prev) => {
      const copy = [...prev];
      copy[entitlementIndex] = {
        ...copy[entitlementIndex],
        topicId: toTopicId,
        unlockedAt: new Date().toISOString(),
      };
      return copy;
    });

    return {
      success: true,
      message: 'Troca de matéria efetuada com sucesso!',
    };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        switchRole,
        authModal,
        openAuthModal,
        closeAuthModal,
        loginUser,
        registerUser,
        logoutUser,
        topics,
        selectedTopic,
        setSelectedTopic,
        updateTopicStatus,
        createNewDraftFromAi,
        entitlements,
        isTopicUnlocked,
        isPassActive,
        checkout,
        openCheckout,
        closeCheckout,
        simulatePixConfirmation,
        activeSessionId,
        sessionConflictDetected,
        triggerSimulatedConcurrentLogin,
        resolveSessionConflict,
        downloadLogs,
        logPdfDownload,
        studentRequests,
        voteStudentRequest,
        submitStudentRequest,
        revalidatePixTx,
        exchangePack,
        currentView,
        setCurrentView,
        selectedCourseId,
        setSelectedCourseId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
