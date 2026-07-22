/**
 * Crea usuarios Auth de las psicólogas y los vincula a professionals.
 *
 *   SUPABASE_SERVICE_ROLE_KEY=sb_secret_... node scripts/seed-auth.mjs
 *
 * URL sale de config.ts; el secret NUNCA va al repo (GitHub lo bloquea).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = join(__dirname, "../src/lib/supabase/config.ts");
const configSrc = readFileSync(configPath, "utf8");

function pick(name) {
  const re = new RegExp(`export const ${name} = "([^"]*)"`);
  const m = configSrc.match(re);
  return m?.[1] ?? "";
}

const url = pick("SUPABASE_URL");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!url || !serviceKey) {
  console.error(
    "Falta URL en config.ts o SUPABASE_SERVICE_ROLE_KEY en el entorno.\n" +
      "  SUPABASE_SERVICE_ROLE_KEY=sb_secret_... npm run supabase:seed-auth",
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const users = [
  {
    email: "stepfanie@habitadas.site",
    password: "Habitadas2026!",
    professionalId: "11111111-1111-1111-1111-111111111111",
  },
  {
    email: "valery@habitadas.site",
    password: "Habitadas2026!",
    professionalId: "22222222-2222-2222-2222-222222222222",
  },
];

for (const u of users) {
  const { data: created, error } = await admin.auth.admin.createUser({
    email: u.email,
    password: u.password,
    email_confirm: true,
  });

  let userId = created?.user?.id;

  if (error) {
    const { data: list } = await admin.auth.admin.listUsers({ perPage: 200 });
    const existing = list?.users?.find(
      (x) => x.email?.toLowerCase() === u.email.toLowerCase(),
    );
    if (!existing) {
      console.error(u.email, error.message);
      continue;
    }
    userId = existing.id;
    console.log("Ya existía:", u.email);
  } else {
    console.log("Creado:", u.email);
  }

  const { error: linkErr } = await admin
    .schema("habitadas")
    .from("professionals")
    .update({ auth_user_id: userId, email: u.email })
    .eq("id", u.professionalId);

  if (linkErr) console.error("Link", u.email, linkErr.message);
  else console.log("Vinculado a profesional", u.professionalId);
}

console.log("\nCredenciales:");
for (const u of users) {
  console.log(`  ${u.email} / ${u.password}`);
}
