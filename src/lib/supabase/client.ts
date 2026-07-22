import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseEnv,
  isSupabaseConfigured,
  SUPABASE_SCHEMA,
} from "./config";

let browserClient: SupabaseClient | null = null;

function createHabitadasClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createClient(url, anonKey, {
    db: { schema: SUPABASE_SCHEMA },
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined",
      storageKey: "habitadas-auth",
    },
  });
}

/** Cliente browser/server apuntando al schema `habitadas` (no a public). */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (typeof window === "undefined") {
    return createHabitadasClient();
  }
  if (!browserClient) {
    browserClient = createHabitadasClient();
  }
  return browserClient;
}
