"use client";

import { fetchSiteContent, upsertSiteContent } from "@/lib/supabase/api";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useEffect, useState } from "react";

type HeroContent = {
  subtitle: string;
  title: string;
  description: string;
};

type ContactContent = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
};

type PriceItem = {
  title: string;
  price: number;
  currency: string;
  duration: string;
};

const emptyHero: HeroContent = {
  subtitle: "",
  title: "",
  description: "",
};

const emptyContact: ContactContent = {
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  instagram: "",
  facebook: "",
};

export function AdminContentEditor() {
  const connected = isSupabaseConfigured();
  const [hero, setHero] = useState<HeroContent>(emptyHero);
  const [contact, setContact] = useState<ContactContent>(emptyContact);
  const [pricesJson, setPricesJson] = useState("[]");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!connected) return;
    void (async () => {
      const [h, c, p] = await Promise.all([
        fetchSiteContent<HeroContent>("hero"),
        fetchSiteContent<ContactContent>("contact"),
        fetchSiteContent<PriceItem[]>("prices"),
      ]);
      if (h) setHero(h);
      if (c) setContact(c);
      if (p) setPricesJson(JSON.stringify(p, null, 2));
    })();
  }, [connected]);

  const save = async () => {
    if (!connected) {
      setMsg("Configura Supabase para editar el contenido en la base.");
      return;
    }
    setBusy(true);
    setMsg("");
    let prices: PriceItem[];
    try {
      prices = JSON.parse(pricesJson) as PriceItem[];
    } catch {
      setMsg("JSON de precios inválido.");
      setBusy(false);
      return;
    }
    const ok =
      (await upsertSiteContent("hero", hero)) &&
      (await upsertSiteContent("contact", contact)) &&
      (await upsertSiteContent("prices", prices));
    setMsg(ok ? "Contenido guardado en Supabase." : "Error al guardar.");
    setBusy(false);
  };

  if (!connected) {
    return (
      <div className="rounded-2xl bg-amber-50 p-6 text-sm text-amber-900 ring-1 ring-amber-200">
        Conecta Supabase pegando URL y anon key en{" "}
        <code className="rounded bg-white/70 px-1">src/lib/supabase/config.ts</code>{" "}
        para administrar el contenido del sitio desde aquí. Mientras tanto el sitio
        usa los datos de{" "}
        <code className="rounded bg-white/70 px-1">src/data/site.ts</code>.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
        <h2 className="font-title text-xl text-headline">Hero</h2>
        {(
          [
            ["Subtítulo", "subtitle"],
            ["Título", "title"],
            ["Descripción", "description"],
          ] as const
        ).map(([label, key]) => (
          <label key={key} className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">{label}</span>
            {key === "description" ? (
              <textarea
                value={hero[key]}
                onChange={(e) => setHero({ ...hero, [key]: e.target.value })}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            ) : (
              <input
                value={hero[key]}
                onChange={(e) => setHero({ ...hero, [key]: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            )}
          </label>
        ))}
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
        <h2 className="font-title text-xl text-headline">Contacto</h2>
        {(Object.keys(emptyContact) as (keyof ContactContent)[]).map((key) => (
          <label key={key} className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-foreground/50">{key}</span>
            <input
              value={contact[key]}
              onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </label>
        ))}
      </section>

      <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
        <h2 className="font-title text-xl text-headline">Precios (JSON)</h2>
        <textarea
          value={pricesJson}
          onChange={(e) => setPricesJson(e.target.value)}
          rows={10}
          className="w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 font-mono text-xs outline-none focus:border-primary"
        />
      </section>

      {msg && <p className="text-sm text-primary-dark">{msg}</p>}

      <button
        type="button"
        disabled={busy}
        onClick={() => void save()}
        className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {busy ? "Guardando…" : "Guardar contenido"}
      </button>
      <p className="text-xs text-foreground/45">
        Nota: el sitio público aún lee primero de <code>src/data/site.ts</code>.
        Puedes enlazar estas claves al frontend cuando quieras publicar cambios
        en vivo.
      </p>
    </div>
  );
}
