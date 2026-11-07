import type { UserProfile, UserEntitlement } from '../types';

const USERS_KEY = 'medtech_db_users';
const SESSION_KEY = 'medtech_db_session';
const ENTITLEMENTS_KEY = 'medtech_db_entitlements';

// Usuários iniciais registrados no banco
export const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'usr_luigi',
    fullName: 'Luigi',
    cpf: '521.849.302-18',
    email: 'luigi@email.com',
    password: '123',
    role: 'student',
    activeSessionId: 'sess_luigi_initial',
    courseId: 'fisio',
  },
  {
    id: 'usr_thiago_admin',
    fullName: 'Dr. Thiago Medeiros (Sócio Fundador)',
    cpf: '112.334.556-78',
    email: 'thiago@medtech.edu.br',
    password: '123',
    role: 'admin',
    activeSessionId: 'sess_admin_master',
  },
];

// Licença inicial para Luigi
export const DEFAULT_ENTITLEMENTS: UserEntitlement[] = [
  {
    id: 'ent_luigi_cinesio',
    userId: 'usr_luigi',
    productId: 'prod_pack_cinesio',
    topicId: 'top_cinesio_alavancas',
    subjectId: 'subj_cinesio',
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
    unlockedAt: '2026-10-15T10:00:00Z',
  },
];

// Obter todos os usuários registrados
export function getRegisteredUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

// Salvar novo usuário no banco
export function saveRegisteredUser(user: UserProfile): void {
  try {
    const users = getRegisteredUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Erro ao salvar no banco local:', err);
  }
}

// Obter a sessão ativa (ou null se deslogado)
export function getActiveSession(): UserProfile | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    
    // SEGURANÇA MÁXIMA: NUNCA auto-restaurar sessão de administrador/sócio.
    // Qualquer resíduo de admin ou visitante é purgado para iniciar 100% como visitante deslogado.
    if (!parsed || parsed.role === 'admin' || parsed.role === 'visitor') {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

// Gravar a sessão ativa
export function setActiveSession(user: UserProfile | null): void {
  try {
    if (!user) {
      localStorage.removeItem(SESSION_KEY);
    } else {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Erro ao salvar sessão:', err);
  }
}

// Obter entitlements
export function getStoredEntitlements(): UserEntitlement[] {
  try {
    const raw = localStorage.getItem(ENTITLEMENTS_KEY);
    if (!raw) {
      localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(DEFAULT_ENTITLEMENTS));
      return DEFAULT_ENTITLEMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ENTITLEMENTS;
  }
}

// Salvar entitlement
export function saveStoredEntitlement(entitlement: UserEntitlement): void {
  try {
    const list = getStoredEntitlements();
    list.push(entitlement);
    localStorage.setItem(ENTITLEMENTS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Erro ao salvar entitlement:', err);
  }
}
