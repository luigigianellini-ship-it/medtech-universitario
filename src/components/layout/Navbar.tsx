import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  Layers, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  LogOut, 
  FileText,
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    user, 
    currentView, 
    setCurrentView, 
    openAuthModal, 
    logoutUser,
    loginUser,
  } = useApp();

  const isLogged = user.role !== 'visitor' && !!user.email;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Barra de Notificação Superior Discreta */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-2 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            MedTech Universitário
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Portal de Resumos Cirúrgicos e Simulados Oficiais P1/P2
          </span>
        </div>

        {/* Autenticação: Entrar / Criar Conta se deslogado, ou Usuário Conectado se logado */}
        <div>
          {!isLogged ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('admin')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition flex items-center gap-1.5 cursor-pointer"
                title="Acesso dos Sócios e Administradores"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Área do Sócio</span>
              </button>
              <button
                onClick={() => openAuthModal('login')}
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg transition shadow flex items-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Criar Conta</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Conectado: <strong className="text-white">{user.fullName}</strong></span>
                {user.role === 'admin' && (
                  <span className="ml-1 text-[9px] font-black bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    SÓCIO
                  </span>
                )}
              </div>

              <button
                onClick={logoutUser}
                className="text-xs font-bold text-rose-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition cursor-pointer"
                title="Desconectar da conta"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Navegação Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Nome */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-slate-900 tracking-tight">MedTech</span>
                <span className="text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">
                  Universitário
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Resumos Diretos ao Ponto & Simulados P1/P2
              </p>
            </div>
          </button>

          {/* Abas Principais Públicas */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                currentView === 'home'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Início</span>
            </button>

            <button
              onClick={() => setCurrentView('catalog')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                currentView === 'catalog' || currentView === 'topic'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cursos & Resumos</span>
            </button>

            <button
              onClick={() => setCurrentView('simulator')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                currentView === 'simulator'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulados</span>
            </button>

            <button
              onClick={() => setCurrentView('flashcards')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                currentView === 'flashcards'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setCurrentView('requests')}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                currentView === 'requests'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pedir Resumo</span>
            </button>

            {/* Painel do Sócio (APENAS quando autenticado como sócio) */}
            {user.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-2.5 rounded-xl text-sm font-black transition flex items-center gap-2 border cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Painel dos Sócios</span>
              </button>
            )}
          </nav>

          {/* Botão da Direita: Minha Conta se logado, ou Entrar se visitante */}
          <div className="flex items-center gap-3">
            {isLogged ? (
              <button
                onClick={() => setCurrentView('account')}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition flex items-center gap-2 border cursor-pointer ${
                  currentView === 'account'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Minha Conta</span>
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition shadow cursor-pointer flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
