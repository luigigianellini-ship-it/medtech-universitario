export type UserRole = 'visitor' | 'student' | 'editor' | 'admin';

export interface UserProfile {
  id: string;
  fullName: string;
  cpf: string;
  email: string;
  password?: string;
  role: UserRole;
  activeSessionId: string;
  courseId?: string;
}

export type CourseArea = 'Saúde' | 'Tecnologia';

export interface Course {
  id: string;
  slug: string;
  name: string;
  area: CourseArea;
  shortDesc: string;
  iconName: string;
  badge: string;
}

export interface Subject {
  id: string;
  courseId: string;
  slug: string;
  name: string;
  semester: number;
  description: string;
  failureRate: string; // Ex: "42% de reprovação média"
}

export type ContentStatus = 'draft' | 'review' | 'published';

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  mnemonic?: string;
  category: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  slug: string;
  title: string;
  semester: number;
  author: {
    name: string;
    role: string;
    crmCrfCref?: string;
    avatar: string;
  };
  reviewer: {
    name: string;
    role: string;
    crmCrfCref?: string;
    avatar: string;
  };
  mecBibliography: string[];
  status: ContentStatus;
  packPriceCents: number; // ex: 1990 para R$ 19,90
  
  // Camada Aberta (SEO / Isca Gratuita)
  freeContent: {
    conceptIntro: string;
    comparisonTable: {
      headers: string[];
      rows: string[][];
    };
    solvedQuestion: Question;
  };

  // Camada Protegida (Trava Server-Side / Paywall)
  premiumContent: {
    fullSummaryMarkdown: string;
    cheatSheetPoints: string[];
    pdfDownloadKey: string;
    pdfPageCount: number;
    questions: Question[];
    flashcards: Flashcard[];
  };
}

export interface Product {
  id: string;
  title: string;
  type: 'pack' | 'semester' | 'holiday_leveling';
  priceCents: number;
  durationDays: number;
  description: string;
  highlight?: boolean;
}

export interface UserEntitlement {
  id: string;
  userId: string;
  productId: string;
  topicId?: string;
  subjectId?: string;
  expiresAt: string;
  isActive: boolean;
  unlockedAt: string;
}

export interface DownloadLog {
  id: string;
  userId: string;
  userName: string;
  userCpf: string;
  topicTitle: string;
  ip: string;
  timestamp: string;
  watermarkHash: string;
  status: 'allowed' | 'suspicious' | 'blocked';
}

export interface StudentRequest {
  id: string;
  studentName: string;
  courseName: string;
  subjectName: string;
  description: string;
  suggestedDeadline: string;
  votesCount: number;
  status: 'em_analise' | 'na_esteira_ia' | 'em_revisao_socio' | 'publicado';
}
