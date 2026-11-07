import React from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES, SUBJECTS } from '../../data/mockData';
import { AlertOctagon, ChevronRight, Lock, CheckCircle, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';

export const CourseCatalog: React.FC = () => {
  const {
    selectedCourseId,
    setSelectedCourseId,
    topics,
    setSelectedTopic,
    setCurrentView,
    isTopicUnlocked,
  } = useApp();

  const currentCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];
  const courseSubjects = SUBJECTS.filter((s) => s.courseId === currentCourse.id);

  const handleSelectTopic = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Header & Abas dos Cursos */}
      <div className="space-y-4 pb-4 border-b border-slate-200">
        <button
          onClick={() => setCurrentView('home')}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Início</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {currentCourse.name}
              </h1>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentCourse.area === 'Saúde'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-cyan-100 text-cyan-800'
                }`}
              >
                {currentCourse.area}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{currentCourse.shortDesc}</p>
          </div>

          {/* Abas dos Cursos (Grandes e Fáceis de Clicar) */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-100 rounded-xl">
            {COURSES.map((course) => (
              <button
                key={course.id}
                onClick={() => setSelectedCourseId(course.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCourseId === course.id
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {course.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grade de Disciplinas */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Disciplinas do Ciclo Básico (1º ao 3º Semestre)
          </h2>
          <p className="text-xs text-slate-500">
            Focado nas matérias que mais reprovam alunos nas semanas de prova
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseSubjects.map((subject) => {
            const subjectTopics = topics.filter((t) => t.subjectId === subject.id);

            return (
              <div
                key={subject.id}
                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="p-6 border-b border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                      {subject.semester}º Semestre
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                      <span>{subject.failureRate}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg">{subject.name}</h3>
                  <p className="text-xs text-slate-500">{subject.description}</p>
                </div>

                {/* Lista de Tópicos */}
                <div className="p-5 bg-slate-50/60 space-y-2.5">
                  <span className="text-xs font-bold text-slate-600 block mb-1">
                    Tópicos e Resumos Disponíveis:
                  </span>

                  {subjectTopics.length > 0 ? (
                    subjectTopics.map((topic) => {
                      const unlocked = isTopicUnlocked(topic.id);
                      return (
                        <div
                          key={topic.id}
                          onClick={() => handleSelectTopic(topic)}
                          className="w-full text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition flex items-center justify-between group cursor-pointer"
                        >
                          <div className="space-y-1.5 flex-1 pr-3">
                            <div className="flex items-center gap-2">
                              {unlocked ? (
                                <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  Liberado na Sua Conta
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                                  Pack Pix R$ 19,90
                                </span>
                              )}
                              <span className="text-xs text-slate-500">
                                Revisado por {topic.author.name.split(',')[0]}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                              {topic.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1 text-indigo-600 text-xs font-bold flex-shrink-0">
                            <span>Ver Resumo</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center bg-white rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                      Módulo em produção. Você pode pedir esta matéria aos sócios!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
