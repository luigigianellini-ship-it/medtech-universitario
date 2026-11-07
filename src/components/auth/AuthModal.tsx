import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/mockData';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  CreditCard, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { authModal, closeAuthModal, loginUser, registerUser } = useApp();
  const [tab, setTab] = useState<'login' | 'register' | 'admin'>(authModal.mode);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sincroniza a aba com o modo solicitado ao abrir o modal
  React.useEffect(() => {
    if (authModal.isOpen) {
      setTab(authModal.mode);
      setAuthError(null);
    }
  }, [authModal.mode, authModal.isOpen]);

  // Campos de Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Campos de Cadastro
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [courseId, setCourseId] = useState(COURSES[0].id);

  if (!authModal.isOpen) return null;

  // Formatar CPF enquanto digita
  const handleCpfChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    let formatted = raw;
    if (raw.length > 9) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
    } else if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
    }
    setCpf(formatted);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const email = loginEmail.trim();
    const pwd = loginPassword.trim();

    if (!email || !pwd) {
      setAuthError('Por favor, informe seu e-mail e senha.');
      return;
    }

    const res: any = await loginUser(email, pwd);
    if (res && !res.success && res.error) {
      setAuthError(res.error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!fullName.trim() || !cpf.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      setAuthError('Por favor, preencha todos os campos do cadastro.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res: any = await registerUser(
        fullName.trim(),
        cpf.trim(),
        registerEmail.trim(),
        courseId,
        registerPassword.trim()
      );
      if (res && !res.success && res.error) {
        setAuthError(res.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header com Abas */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">MedTech Universitário</h3>
              <p className="text-xs text-slate-400">Portal de Resumos e Simulados</p>
            </div>
          </div>

          {/* Seletor de Aba: Aluno / Sócio / Criar Conta */}
          <div className="grid grid-cols-3 p-1 bg-slate-800 rounded-xl gap-1 text-[11px]">
            <button
              onClick={() => { setTab('login'); setAuthError(null); }}
              className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                tab === 'login'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Aluno</span>
            </button>
            <button
              onClick={() => { setTab('admin'); setAuthError(null); }}
              className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                tab === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Sócio / Admin</span>
            </button>
            <button
              onClick={() => { setTab('register'); setAuthError(null); }}
              className={`py-2 rounded-lg font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                tab === 'register'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Criar Conta</span>
            </button>
          </div>
        </div>

        {/* Formulário */}
        <div className="p-6">
          {tab === 'admin' ? (
            /* TAB LOGIN DO SÓCIO */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-emerald-950 text-xs flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Área Restrita dos Sócios:</strong> Acesso à esteira editorial com dupla assinatura, central forense anti-pirataria e métricas do banco.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold">
                  {authError}
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  E-mail do Sócio / Administrador:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ex: thiago@medtech.edu.br"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Senha do Sócio:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Acessar Painel de Sócios</span>
              </button>

              <div className="pt-2 text-center text-[10px] text-slate-500">
                Credencial de teste: <code className="font-bold text-emerald-700">thiago@medtech.edu.br</code> / senha: <code className="font-bold text-emerald-700">123</code>
              </div>
            </form>
          ) : tab === 'login' ? (
            /* TAB LOGIN DO ALUNO */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold">
                  {authError}
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  E-mail do Aluno:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ex: seu@email.com"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Sua Senha:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Entrar na Plataforma</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[10px] text-slate-500">
                Aluno demo: <code className="font-bold text-indigo-600">luigi@email.com</code> / senha: <code className="font-bold text-indigo-600">123</code>
              </div>
            </form>
          ) : (
            /* TAB CADASTRO */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {authError && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Aviso do Supabase Auth</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {authError.toLowerCase().includes('rate limit') 
                      ? 'Limite temporário de envio de e-mails atingido no plano gratuito do Supabase. Para cadastrar instantaneamente sem limite de SMTP, desmarque a opção "Confirm email" em Authentication -> Providers -> Email no painel do Supabase.' 
                      : authError}
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nome Completo:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Amanda Ferreira Silva"
                    className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    CPF (Para Carimbo Forense do PDF):
                  </label>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    LGPD Protegida
                  </span>
                </div>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={cpf}
                    onChange={(e) => handleCpfChange(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Usado apenas para emissão de nota fiscal e carimbo anti-vazamento no rodapé.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">E-mail:</label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Senha:</label>
                  <input
                    type="password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Mínimo 6 dígitos"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Seu Curso:</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.area})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Criar Conta e Começar a Estudar</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
