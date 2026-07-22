/**
 * Credenciales Supabase pegadas en código (sin .env).
 * Project Settings → API → Project URL + anon public
 */
export const SUPABASE_URL = "https://TU_PROJECT.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.PEGA_AQUI_LA_ANON_KEY";

/** Schema Postgres aislado — no pisa tablas de public */
export const SUPABASE_SCHEMA = "habitadas";

/** Logins de las profesionales (Auth → Users, luego migration 002) */
export const PROFESSIONAL_LOGINS = [
  {
    email: "stepfanie@habitadas.ec",
    password: "Habitadas2026!",
    name: "Stepfanie Villacís",
  },
  {
    email: "valery@habitadas.ec",
    password: "Habitadas2026!",
    name: "Lic. Valery Cevallos",
  },
] as const;

/** Solo scripts de seed (service_role). Nunca en el navegador. */
export const SUPABASE_SERVICE_ROLE_KEY = "";

export function isSupabaseConfigured(): boolean {
  return (
    Boolean(SUPABASE_URL) &&
    !SUPABASE_URL.includes("TU_PROJECT") &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_ANON_KEY.includes("PEGA_AQUI")
  );
}

export function getSupabaseEnv() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase no configurado en src/lib/supabase/config.ts");
  }
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
}
