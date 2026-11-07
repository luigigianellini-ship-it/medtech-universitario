import React from 'react';
import { useApp } from '../../context/AppContext';
import { FuzzySearchBar } from './FuzzySearchBar';
import { COURSES } from '../../data/mockData';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setSelectedCourseId, setCurrentView } = useApp();

  return (
    <div className="bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Chamada Principal Bolder e Clara */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Focado no Ciclo Básico Universitário (1º ao 3º Semestre)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Resumos Esquematizados e Simulados para{' '}
            <span className="text-indigo-600">
              Passar na Semana de Provas
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Esqueça os drives bagunçados da faculdade. Tenha resumos revisados por professores,
            questões comentadas passo a passo e simulados para salvar suas notas em P1 e P2.
          </p>

          {/* Busca Ampla e Clara */}
          <div className="pt-2">
            <FuzzySearchBar />
          </div>
        </div>

        {/* 3 Diferenciais Claros e Objetivos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Liberação via Pix</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Pagamento único de R$ 19,90 sem mensalidades. Acesso liberado na hora.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Revisão por Especialistas</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Conteúdo revisado por 2 sócios especialistas seguindo a bibliografia MEC.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Simulados & Flashcards</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Ferramentas interativas para testar sua nota antes do dia da prova oficial.
              </p>
            </div>
          </div>
        </div>

        {/* Cursos Disponíveis (Grandes e Fáceis de Clicar) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Selecione Seu Curso
              </h2>
              <p className="text-xs text-slate-500">
                Matérias organizadas pelo tronco comum das faculdades
              </p>
            </div>

            <button
              onClick={() => setCurrentView('catalog')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todas as matérias</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setCurrentView('catalog');
                }}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-600 hover:shadow-lg transition cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        course.area === 'Saúde'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-cyan-100 text-cyan-800'
                      }`}
                    >
                      {course.area}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition">
                    {course.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {course.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Acessar Resumos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
