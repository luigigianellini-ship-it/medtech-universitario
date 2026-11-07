import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, LogOut, RefreshCw, Smartphone } from 'lucide-react';

export const SessionConflictModal: React.FC = () => {
  const { sessionConflictDetected, resolveSessionConflict, user } = useApp();

  if (!sessionConflictDetected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-amber-500/50">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Sessão Concorrente Interrompida
        </h3>
        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800 mb-3">
          Blindagem Anti-Vaquinha Ativa
        </span>

        <p className="text-slate-600 text-xs leading-relaxed mb-4">
          Detectamos que sua conta ({user.email}) acabou de ser autenticada em outro dispositivo:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 mb-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" /> Dispositivo:
            </span>
            <span className="font-semibold">Samsung Galaxy S23 (Chrome)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Endereço IP:</span>
            <span className="font-mono text-[11px] text-slate-900">189.44.12.9 (Rio de Janeiro)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">ID da Nova Sessão:</span>
            <span className="font-mono text-[11px] text-indigo-700">sess_conflict_b9412</span>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 mb-5">
          <strong>Por que isso acontece?</strong> Para evitar o compartilhamento não autorizado de
          senhas e grupos de vaquinha, nossa política permite apenas <strong>1 sessão simultânea</strong>.
          O aparelho anterior perde o token de descriptografia em tempo real.
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={resolveSessionConflict}
            className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retomar Sessão Neste Aparelho</span>
          </button>
        </div>
      </div>
    </div>
  );
};
