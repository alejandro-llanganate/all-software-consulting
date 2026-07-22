import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseEnv,
  isSupabaseConfigured,
  SUPABASE_SCHEMA,
} from "./config";

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

type HabitadasClient = ReturnType<typeof createHabitadasClient>;

let browserClient: HabitadasClient | null = null;

/** Cliente apuntando al schema `habitadas` (no a public). */
export function getSupabase(): HabitadasClient | null {
  if (!isSupabaseConfigured()) return null;
  if (typeof window === "undefined") {
    return createHabitadasClient();
  }
  if (!browserClient) {
    browserClient = createHabitadasClient();
  }
  return browserClient;
}
