import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente configuráveis no arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verifica se as credenciais reais do Supabase foram inseridas
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('sua-url-do-supabase') &&
  !supabaseAnonKey.includes('sua-chave-anon')
);

// Cliente oficial do Supabase
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Informações de diagnóstico para a interface
export function getSupabaseStatus() {
  return {
    isConfigured: isSupabaseConfigured,
    url: supabaseUrl || 'Não informada (usando banco local simulado)',
    hasKey: Boolean(supabaseAnonKey),
  };
}
