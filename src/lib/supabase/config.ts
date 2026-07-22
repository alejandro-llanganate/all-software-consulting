/**
 * Credenciales Supabase (cliente). Sin secret key — GitHub la bloquea en el repo.
 * El secret solo para seed local: SUPABASE_SERVICE_ROLE_KEY=... npm run supabase:seed-auth
 */
export const SUPABASE_URL = "https://asgqeizkclbhcoaktcss.supabase.co";

/** Publishable / anon (segura en el navegador con RLS) */
export const SUPABASE_ANON_KEY =
  "sb_publishable_84Tj1KhfhmaUVeWidpwhHw_kNfD6yxO";

/** Schema Postgres aislado — no pisa tablas de public */
export const SUPABASE_SCHEMA = "habitadas" as const;

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

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function getSupabaseEnv() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase no configurado en src/lib/supabase/config.ts");
  }
  return { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
}
