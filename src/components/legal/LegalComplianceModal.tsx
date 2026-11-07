import React from 'react';
import { X, Scale, ShieldAlert, CheckCircle, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalComplianceModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">
                Blindagem Jurídica, Direitos Autorais e LGPD
              </h2>
              <span className="text-[11px] text-slate-500">
                Conformidade estrita com a Lei 9.610/98 e Marco Civil da Internet
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bloco 1: O Que Jamais Faremos */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>O Que Jamais Faremos (Risco Zero de Processo):</span>
          </div>
          <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Proibido usar gravações de aulas de professores:</strong> Transcrever áudio ou
              vídeo gravado em sala sem autorização prévia viola direito de imagem e direito autoral
              de aula expositiva.
            </li>
            <li>
              <strong>Proibido publicar slides ou provas de faculdades:</strong> Materiais
              institucionais e lâminas pertencem exclusivamente ao docente ou à universidade.
            </li>
            <li>
              <strong>Proibido copiar figuras de livros protegidos:</strong> Jamais copiar fotos ou
              esquemas protegidos de atlas renomados (Netter, Sobotta, Guyton, Cormen) para colar
              nos PDFs.
            </li>
          </ul>
        </div>

        {/* Bloco 2: Como Trabalharemos 100% Legal */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Como Trabalhamos 100% Legal (Lei 9.610/98):</span>
          </div>
          <ul className="text-xs text-emerald-950 space-y-1.5 list-disc list-inside">
            <li>
              <strong>Art. 8º da Lei de Direitos Autorais:</strong> Conceitos científicos, anatomia,
              fisiologia, fórmulas matemáticas e algoritmos de computação <em>são de domínio público</em>.
              O que a lei protege é a forma de expressão (o texto didático autoral dos sócios).
            </li>
            <li>
              <strong>Redação 100% Original:</strong> O estudante envia a ementa ou lista de temas; os
              sócios redigem a síntese com metodologia pedagógica própria citando formalmente as
              Diretrizes Curriculares do MEC.
            </li>
            <li>
              <strong>Ilustrações Livres:</strong> Diagramas vetoriais próprios ou acervos Creative
              Commons / Domínio Público (Wikimedia, Servier Medical Art).
            </li>
          </ul>
        </div>

        {/* Bloco 3: LGPD e Conformidade Fiscal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <strong className="text-slate-900 font-bold block">Conformidade LGPD (Dados)</strong>
            <p className="text-slate-600 leading-relaxed">
              O CPF do estudante é coletado com base legal de legítimo interesse e cumprimento de
              obrigação fiscal (liquidação do Pix e combate a fraudes/pirataria).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <strong className="text-slate-900 font-bold block">Transição Fiscal (CNPJ)</strong>
            <p className="text-slate-600 leading-relaxed">
              Formalização sob CNAE de portal de conteúdo e edição didática para emissão automática
              de NFS-e a cada liberação bancária.
            </p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
