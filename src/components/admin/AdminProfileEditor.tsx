"use client";

import { updateMyProfile } from "@/lib/supabase/api";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Professional } from "@/types";
import { useState } from "react";

type Props = {
  professional: Professional;
  onSaved: (p: Professional) => void;
};

export function AdminProfileEditor({ professional, onSaved }: Props) {
  const [name, setName] = useState(professional.name);
  const [title, setTitle] = useState(professional.title);
  const [shortBio, setShortBio] = useState(professional.shortBio);
  const [bio, setBio] = useState(professional.bio);
  const [approach, setApproach] = useState(professional.approach);
  const [price, setPrice] = useState(String(professional.sessionPrice));
  const [specs, setSpecs] = useState(professional.specializations.join(", "));
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const connected = isSupabaseConfigured();

  const save = async () => {
    setBusy(true);
    setMsg("");
    const next: Professional = {
      ...professional,
      name: name.trim(),
      title: title.trim(),
      shortBio: shortBio.trim(),
      bio: bio.trim(),
      approach: approach.trim(),
      sessionPrice: Number(price) || professional.sessionPrice,
      specializations: specs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (connected) {
      const ok = await updateMyProfile(professional.id, {
        name: next.name,
        title: next.title,
        short_bio: next.shortBio,
        bio: next.bio,
        approach: next.approach,
        session_price: next.sessionPrice,
        specializations: next.specializations,
      });
      if (!ok) {
        setMsg("No se pudo guardar en Supabase.");
        setBusy(false);
        return;
      }
    }

    onSaved(next);
    setMsg(connected ? "Perfil actualizado en Supabase." : "Guardado local (sin Supabase).");
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
      <div>
        <h2 className="font-title text-xl text-headline">Tu perfil público</h2>
        <p className="mt-1 text-sm text-foreground/50">
          Estos datos se muestran en /profesionales y en la ficha de agendar.
        </p>
      </div>

      {(
        [
          ["Nombre", name, setName],
          ["Título", title, setTitle],
          ["Bio corta", shortBio, setShortBio],
        ] as const
      ).map(([label, value, setter]) => (
        <label key={label} className="block">
          <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">{label}</span>
          <input
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </label>
      ))}

      <label className="block">
        <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">Biografía</span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">Enfoque</span>
        <textarea
          value={approach}
          onChange={(e) => setApproach(e.target.value)}
          rows={3}
          className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">Precio sesión (USD)</span>
          <input
            type="number"
            min={0}
            step={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wide">Especializaciones</span>
          <input
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            placeholder="Separadas por coma"
            className="mt-1.5 w-full rounded-xl border border-primary/15 bg-light px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      {msg && <p className="text-sm text-primary-dark">{msg}</p>}

      <button
        type="button"
        disabled={busy}
        onClick={() => void save()}
        className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {busy ? "Guardando…" : "Guardar perfil"}
      </button>
    </div>
  );
}
