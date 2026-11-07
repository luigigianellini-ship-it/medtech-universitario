import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSES } from '../../data/mockData';
import { 
  FileText, 
  ThumbsUp, 
  Sparkles, 
  UploadCloud, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ArrowLeft
} from 'lucide-react';

export const StudentRequestsQueue: React.FC = () => {
  const { studentRequests, voteStudentRequest, submitStudentRequest, setCurrentView } = useApp();

  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('Fisioterapia');
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [suggestedDeadline, setSuggestedDeadline] = useState('Em 7 dias');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim() || !description.trim()) return;

    submitStudentRequest({
      studentName: studentName.trim() || 'Estudante Anônimo',
      courseName,
      subjectName,
      description,
      suggestedDeadline,
    });

    setIsSuccess(true);
    setSubjectName('');
    setDescription('');
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para a Página Inicial</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Fila de Pedidos & Esteira de Produção de Resumos
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Envie a ementa ou prova antiga da sua faculdade. Os sócios produzem os temas mais votados
            em tempo recorde.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Envio (com checagem de sanitização de arquivo) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <UploadCloud className="w-4 h-4" />
            <span>Enviar Nova Ementa / Tópico</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Seu Nome e Semestre:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ex: Clara Mendes (Fisio - 2º Sem)"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Curso:</label>
              <select
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Matéria ou Tópico Crítico da P1/P2:
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Ex: Nervos Cranianos e Trajetos Foraminais"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                O que você mais precisa que seja explicado?
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Ex: O professor cobra a diferença entre pares III, IV e VI. Queremos tabela e mnemônico!"
                required
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Simulação de Sanitização de Upload */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                <span>Sanitização Automática de Arquivos:</span>
              </div>
              <p>
                Uploads de PDFs são submetidos a verificação de Magic Bytes para bloquear scripts
                maliciosos antes de entrar na esteira de IA dos sócios.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow"
            >
              Adicionar à Fila de Prioridades
            </button>
          </form>

          {isSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Pedido protocolado com sucesso! Já está aberto para votos.</span>
            </div>
          )}
        </div>

        {/* Fila Pública de Votação */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Fila de Demanda dos Alunos (Votação em Tempo Real)
              </h2>
              <p className="text-xs text-slate-500">
                Os módulos que atingem mais votos entram imediatamente na esteira de redação dos
                sócios
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {studentRequests.length} pedido(s)
            </span>
          </div>

          <div className="space-y-3">
            {studentRequests.map((req) => {
              let statusBadge = (
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Em Análise
                </span>
              );

              if (req.status === 'na_esteira_ia') {
                statusBadge = (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Esteira IA Gerando Esqueleto
                  </span>
                );
              } else if (req.status === 'em_revisao_socio') {
                statusBadge = (
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-600" />
                    Em Revisão pelo 2º Sócio
                  </span>
                );
              }

              return (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {req.courseName}
                      </span>
                      {statusBadge}
                      <span className="text-[11px] text-slate-400">
                        Sugerido para: {req.suggestedDeadline}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm">{req.subjectName}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{req.description}</p>
                    <div className="text-[11px] text-slate-400">Enviado por: {req.studentName}</div>
                  </div>

                  {/* Botão de Votar */}
                  <button
                    onClick={() => voteStudentRequest(req.id)}
                    className="flex sm:flex-col items-center justify-center gap-1 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 p-2.5 sm:p-3 rounded-xl transition cursor-pointer min-w-[70px]"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-bold text-xs">{req.votesCount}</span>
                    <span className="text-[9px] text-slate-400 uppercase">Votos</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
