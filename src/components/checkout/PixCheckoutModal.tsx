import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Copy, 
  Check, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Lock,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const PixCheckoutModal: React.FC = () => {
  const { checkout, closeCheckout, simulatePixConfirmation, setCurrentView } = useApp();
  const [copied, setCopied] = useState(false);

  if (!checkout.isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(checkout.pixCopiaCola);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const priceFormatted = checkout.product
    ? (checkout.product.priceCents / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    : 'R$ 19,90';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header do Checkout */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight text-white">Checkout Instantâneo Pix</h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Liberação em 2s
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {checkout.topic ? checkout.topic.title : checkout.product?.title}
              </p>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo Central */}
        <div className="p-6">
          {!checkout.isSuccess ? (
            <div className="space-y-5">
              {/* Resumo do Pedido e Preço */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Total a Pagar
                  </span>
                  <span className="text-2xl font-black text-slate-900">{priceFormatted}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expira em 04:58 min</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">Acesso liberado sem espera</span>
                </div>
              </div>

              {/* QR Code & Copia e Cola */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50/80 rounded-2xl border border-dashed border-slate-300">
                <div className="relative bg-white p-2.5 rounded-xl shadow-sm border border-slate-200 flex-shrink-0">
                  <img
                    src={checkout.pixQrCodeUrl}
                    alt="QR Code Pix"
                    className="w-32 h-32 object-contain"
                  />
                  <div className="absolute inset-x-0 -bottom-2 flex justify-center">
                    <span className="bg-slate-900 text-[9px] font-bold text-white px-2 py-0.5 rounded shadow">
                      Banco Central
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-2.5 text-center sm:text-left">
                  <h4 className="font-semibold text-xs text-slate-800">
                    Pague pelo app do seu banco
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Abra o app do seu banco, escolha <strong>Pix &gt; Ler QR Code</strong> ou use a
                    chave <strong>Pix Copia e Cola</strong> abaixo.
                  </p>

                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold bg-white border border-slate-300 hover:border-indigo-500 rounded-lg text-slate-700 hover:text-indigo-600 transition shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Código Pix Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copiar Código Pix</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Blindagem Antifraude HMAC */}
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-950">
                <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Engenharia de Confirmação HMAC SHA-256:</strong> Nosso webhook conecta à
                  API oficial do gateway bancário. Assim que você autoriza no banco, a liberação cai
                  na tela em 2 segundos sem precisar de comprovante manual.
                </div>
              </div>

              {/* Botão de Demonstração / Simulação de Pagamento */}
              <button
                onClick={simulatePixConfirmation}
                disabled={checkout.isProcessing}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition shadow-lg shadow-emerald-600/20 disabled:opacity-70 cursor-pointer"
              >
                {checkout.isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validando Webhook HMAC do Banco (2s)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Simular Pagamento no Banco (Testar Liberação em 2s)</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Sucesso / Acesso Liberado */
            <div className="py-6 text-center space-y-4 animate-scale-up">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Pix Confirmado com Sucesso!
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  A assinatura criptográfica foi validada. O resumo completo, questões comentadas,
                  simulados e baralho de flashcards já estão liberados na sua conta.
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1 max-w-md mx-auto">
                <div className="flex justify-between text-slate-600">
                  <span>Status da Licença:</span>
                  <span className="font-semibold text-emerald-600">Ativa (180 dias)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Carimbo Forense:</span>
                  <span className="font-mono text-[11px] text-slate-800">Vinculado ao seu CPF</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => {
                    closeCheckout();
                    setCurrentView('reader');
                  }}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white transition shadow"
                >
                  <span>Abrir Leitor com Resumo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    closeCheckout();
                    setCurrentView('simulator');
                  }}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  <span>Fazer Simulado de Prova</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
