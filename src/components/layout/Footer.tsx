import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ShieldCheck, FileCheck2, Scale } from 'lucide-react';

interface FooterProps {
  onOpenLegal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { setCurrentView, setSelectedCourseId } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Bloco Superior Essencial */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Marca e Missão */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-base tracking-tight">MedTech Universitário</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Resumos esquematizados, simulados cronometrados e flashcards para salvar suas notas
              nas semanas de prova (P1 e P2).
            </p>
          </div>

          {/* Links Essenciais */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            <button
              onClick={() => {
                setCurrentView('catalog');
                setSelectedCourseId('fisio');
              }}
              className="text-slate-300 hover:text-white transition cursor-pointer"
            >
              Fisioterapia
            </button>
            <button
              onClick={() => {
                setCurrentView('catalog');
                setSelectedCourseId('edf');
              }}
              className="text-slate-300 hover:text-white transition cursor-pointer"
            >
              Educação Física
            </button>
            <button
              onClick={() => {
                setCurrentView('catalog');
                setSelectedCourseId('ads');
              }}
              className="text-slate-300 hover:text-white transition cursor-pointer"
            >
              ADS
            </button>
            <button
              onClick={() => {
                setCurrentView('catalog');
                setSelectedCourseId('cc');
              }}
              className="text-slate-300 hover:text-white transition cursor-pointer"
            >
              Ciência da Computação
            </button>
            <button
              onClick={() => setCurrentView('requests')}
              className="text-slate-300 hover:text-white transition cursor-pointer"
            >
              Pedir Resumo
            </button>
            <button
              onClick={onOpenLegal}
              className="text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Termos & LGPD</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Acadêmico Obrigatório (Essencial) */}
        <div className="space-y-3">
          <p className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Aviso Acadêmico:</strong> Material de apoio teórico
            universitário. Não substitui diretrizes clínicas nem supervisão presencial
            (CREFITO/CREF/MEC). Conteúdos 100% autorais baseados no tronco comum das Diretrizes
            Curriculares Nacionais (Lei 9.610/98).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 pt-2">
            <span>© 2026 MedTech Universitário. Todos os direitos reservados.</span>
            <span>Ambiente Seguro • Blindagem Forense Anti-Vazamento</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
