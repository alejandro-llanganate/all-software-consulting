"use client";

import { AdminAvailabilityCalendar } from "@/components/admin/AdminAvailabilityCalendar";
import { AdminContentEditor } from "@/components/admin/AdminContentEditor";
import { AdminProfileEditor } from "@/components/admin/AdminProfileEditor";
import { professionals as staticProfessionals } from "@/data/professionals";
import { logo } from "@/data/site";
import { formatCurrency, getAdminStats } from "@/lib/admin-stats";
import {
  clearAdminSession,
  getAdminSession,
  getAppointmentsByProfessionalAsync,
  getAvailabilityAsync,
  initStorage,
  setAdminSession,
  updateAppointmentStatusAsync,
  verifyPin,
} from "@/lib/booking-storage";
import {
  getSessionProfessional,
  isSupabaseConfigured,
  signInProfessional,
  signOutProfessional,
} from "@/lib/supabase/api";
import { PROFESSIONAL_LOGINS } from "@/lib/supabase/config";
import type { Appointment, AppointmentStatus, DayAvailability, Professional } from "@/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  LayoutDashboard,
  Lock,
  LogOut,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type View = "loading" | "login" | "select-pro" | "dashboard";
type Tab = "overview" | "appointments" | "availability" | "profile" | "content";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
  completada: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelada: "bg-red-50 text-red-600 ring-red-200",
};

const useSupabase = isSupabaseConfigured();

export default function AdminPage() {
  const [view, setView] = useState<View>("loading");
  const [pro, setPro] = useState<Professional | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (useSupabase) {
        const sessionPro = await getSessionProfessional();
        if (cancelled) return;
        if (sessionPro) {
          setPro(sessionPro);
          setView("dashboard");
          return;
        }
        setView("login");
        return;
      }
      initStorage();
      const sessionId = getAdminSession();
      if (sessionId) {
        const found = staticProfessionals.find((p) => p.id === sessionId) ?? null;
        setPro(found);
        setView(found ? "dashboard" : "login");
      } else {
        setView("login");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (view !== "dashboard" || !pro) return;
    let cancelled = false;
    const professionalId = pro.id;
    void (async () => {
      const [apps, days] = await Promise.all([
        getAppointmentsByProfessionalAsync(professionalId),
        getAvailabilityAsync(professionalId),
      ]);
      if (cancelled) return;
      setAppointments(apps);
      setAvailability(days);
    })();
    return () => {
      cancelled = true;
    };
  }, [view, pro, refreshKey]);

  const stats = pro ? getAdminStats(pro.id, appointments) : null;
  const filteredAppointments =
    filter === "all" ? appointments : appointments.filter((a) => a.status === filter);
  const maxBar = Math.max(...(stats?.byMonth.map((m) => m.count) ?? [1]), 1);

  const handleLogin = async () => {
    setAuthError("");
    setAuthBusy(true);
    try {
      if (useSupabase) {
        await signInProfessional(email.trim(), password);
        const sessionPro = await getSessionProfessional();
        if (!sessionPro) {
          await signOutProfessional();
          setAuthError("Tu cuenta no está vinculada a un perfil profesional.");
          return;
        }
        setPro(sessionPro);
        setView("dashboard");
        return;
      }
      if (verifyPin(pin)) {
        setView("select-pro");
      } else {
        setAuthError("PIN incorrecto");
      }
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "No se pudo iniciar sesión");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSelectPro = (id: string) => {
    const found = staticProfessionals.find((p) => p.id === id) ?? null;
    setPro(found);
    setAdminSession(id);
    setView("dashboard");
    refresh();
  };

  const handleLogout = async () => {
    if (useSupabase) await signOutProfessional();
    clearAdminSession();
    setPro(null);
    setView("login");
    setPin("");
    setPassword("");
    setTab("overview");
  };

  const formatAptDate = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  if (view === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-light/60 via-white to-cream">
        <p className="text-sm text-foreground/50">Cargando panel…</p>
      </div>
    );
  }

  if (view === "login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-light/60 via-white to-cream p-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary/10 ring-1 ring-primary/10"
        >
          <div className="border-b border-primary/10 bg-gradient-to-r from-violet-light/80 to-white px-8 py-6">
            <div className="flex items-center gap-3">
              <Image src={logo.default} alt="HABITADAS" width={140} height={63} className="h-10 w-auto object-contain" />
              <div>
                <p className="font-serif text-xl text-primary-dark">HABITADAS</p>
                <p className="text-xs text-foreground/50">Panel profesional</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Lock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="mt-5 text-center text-xl font-semibold text-headline">Acceso seguro</h1>
            <p className="mt-1 text-center text-sm text-foreground/50">
              {useSupabase
                ? "Inicia sesión con tu correo profesional"
                : "Pega URL + anon key en src/lib/supabase/config.ts"}
            </p>

            {useSupabase ? (
              <div className="mt-6 space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@habitadas.site"
                  className="w-full rounded-2xl border border-primary/15 bg-light px-4 py-3 text-sm text-headline outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && void handleLogin()}
                  placeholder="Contraseña"
                  className="w-full rounded-2xl border border-primary/15 bg-light px-4 py-3 text-sm text-headline outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            ) : (
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && void handleLogin()}
                placeholder="••••"
                className="mt-6 w-full rounded-2xl border border-primary/15 bg-light px-4 py-4 text-center text-3xl tracking-[0.6em] text-headline outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            )}

            {authError && <p className="mt-2 text-center text-sm text-red-500">{authError}</p>}
            <button
              onClick={() => void handleLogin()}
              disabled={authBusy}
              className="mt-6 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 disabled:opacity-60"
            >
              {authBusy ? "Ingresando…" : "Ingresar al panel"}
            </button>
            {useSupabase && (
              <div className="mt-5 rounded-2xl bg-violet-light/40 p-3 text-left text-[11px] leading-relaxed text-foreground/55">
                <p className="font-semibold text-primary-dark">Credenciales</p>
                {PROFESSIONAL_LOGINS.map((u) => (
                  <p key={u.email} className="mt-1 font-mono">
                    {u.email} · {u.password}
                  </p>
                ))}
              </div>
            )}
            <Link href="/" className="mt-4 flex items-center justify-center gap-1 text-xs text-foreground/40 hover:text-primary">
              <ArrowLeft className="h-3 w-3" /> Volver al sitio
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (view === "select-pro") {
    return (
      <div className="min-h-screen bg-[#F4F0FA] p-6 pt-12">
        <div className="mx-auto max-w-3xl">
          <button onClick={() => void handleLogout()} className="mb-8 flex items-center gap-2 text-sm text-foreground/50 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Cerrar sesión
          </button>
          <h1 className="font-serif text-3xl text-headline">Selecciona tu perfil</h1>
          <p className="mt-2 text-foreground/50">Accede al dashboard de tu consulta</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {staticProfessionals.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelectPro(p.id)}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-headline">{p.name}</p>
                  <p className="text-sm text-foreground/50">{p.title}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-primary/30 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!pro || !stats) return null;

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Resumen", icon: LayoutDashboard },
    { id: "appointments", label: "Citas", icon: CalendarDays },
    { id: "availability", label: "Disponibilidad", icon: Clock },
    { id: "profile", label: "Perfil", icon: UserRound },
    { id: "content", label: "Contenido", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-primary/10 bg-white shadow-sm lg:flex">
        <div className="border-b border-primary/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <Image src={logo.default} alt="" width={120} height={54} className="h-9 w-auto object-contain" />
            <div>
              <p className="font-serif text-lg text-primary-dark">HABITADAS</p>
              <p className="text-[10px] tracking-widest text-primary/60 uppercase">Panel Pro</p>
            </div>
          </div>
        </div>

        <div className="border-b border-primary/10 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-violet-light/50 p-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-2 ring-white">
              <Image src={pro.image} alt="" fill className="object-cover" sizes="40px" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-headline">{pro.name.split(" ").slice(-2).join(" ")}</p>
              <p className="truncate text-xs text-foreground/50">{pro.title}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                tab === id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-foreground/55 hover:bg-violet-light/50 hover:text-primary-dark",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {id === "appointments" && stats.pending > 0 && (
                <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="space-y-1 border-t border-primary/10 p-3">
          {!useSupabase && (
            <button
              onClick={() => { setView("select-pro"); setTab("overview"); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/50 hover:bg-violet-light/40 hover:text-primary-dark"
            >
              <Users className="h-4 w-4" /> Cambiar perfil
            </button>
          )}
          <button
            onClick={() => void handleLogout()}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500/70 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/40 hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Ir al sitio
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-primary/10 bg-white/95 px-4 py-3 backdrop-blur-lg lg:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <Image src={logo.default} alt="" width={100} height={45} className="h-7 w-auto object-contain" />
            <span className="truncate font-serif text-primary-dark">Panel Pro</span>
          </div>
          <button onClick={() => void handleLogout()} className="rounded-lg p-2 text-foreground/40 hover:text-primary">
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        <div className="flex gap-1 overflow-x-auto border-b border-primary/10 bg-white px-4 py-2 lg:hidden">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-1.5 text-xs font-medium",
                tab === id ? "bg-primary text-white" : "bg-violet-light/60 text-foreground/50",
              )}
            >
              {label}
              {id === "appointments" && stats.pending > 0 && (
                <span className="ml-1">({stats.pending})</span>
              )}
            </button>
          ))}
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {navItems.find((n) => n.id === tab)?.label}
              </p>
              <h1 className="mt-1 font-serif text-2xl text-headline sm:text-3xl">
                Hola, {pro.name.split(" ")[0]}
              </h1>
            </div>
            {!useSupabase && (
              <p className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800 ring-1 ring-amber-200">
                Datos locales — conecta Supabase
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {tab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Ingresos totales", value: formatCurrency(stats.totalRevenue), icon: DollarSign },
                    { label: "Este mes", value: formatCurrency(stats.monthRevenue), icon: TrendingUp },
                    { label: "Citas totales", value: String(stats.totalAppointments), icon: Calendar },
                    { label: "Tasa completadas", value: `${stats.completionRate}%`, icon: BarChart3 },
                  ].map((card) => (
                    <div key={card.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-primary/10">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-light/70">
                          <card.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-foreground/45">{card.label}</p>
                          <p className="text-xl font-bold text-headline">{card.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-headline">
                      <Sparkles className="h-4 w-4 text-primary" /> Actividad (6 meses)
                    </h3>
                    <div className="mt-6 flex h-40 items-end gap-2">
                      {stats.byMonth.map((m) => (
                        <div key={m.label} className="flex flex-1 flex-col items-center gap-1">
                          <div
                            className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-primary to-accent transition-all duration-700"
                            style={{ height: `${Math.max((m.count / maxBar) * 100, m.count > 0 ? 8 : 2)}%` }}
                          />
                          <span className="text-[10px] text-foreground/40">{m.label}</span>
                          <span className="text-xs font-semibold text-headline">{m.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-headline">
                        <Calendar className="h-4 w-4 text-primary" />
                        Próximas citas
                      </h3>
                      <button onClick={() => setTab("appointments")} className="text-xs text-primary hover:text-primary-dark">
                        Ver todas →
                      </button>
                    </div>
                    {stats.upcoming.length === 0 ? (
                      <p className="mt-6 text-center text-sm text-foreground/40">No hay citas próximas</p>
                    ) : (
                      <div className="mt-4 divide-y divide-primary/8">
                        {stats.upcoming.slice(0, 5).map((apt) => (
                          <div key={apt.id} className="flex items-center justify-between py-3">
                            <div>
                              <p className="font-medium text-headline">{apt.clientName}</p>
                              <p className="text-xs capitalize text-foreground/50">{formatAptDate(apt.date)} · {apt.time}</p>
                            </div>
                            <span className="text-sm font-semibold text-emerald-600">{formatCurrency(stats.sessionPrice)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {tab === "appointments" && (
              <motion.div key="appointments" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(["all", "pendiente", "completada", "cancelada"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-all",
                        filter === f ? "bg-primary text-white shadow-sm" : "bg-white text-foreground/50 ring-1 ring-primary/15 hover:ring-primary/40",
                      )}
                    >
                      {f === "all" ? "Todas" : f}
                    </button>
                  ))}
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-primary/10">
                  {filteredAppointments.length === 0 ? (
                    <p className="py-16 text-center text-sm text-foreground/40">No hay citas en este filtro</p>
                  ) : (
                    <div className="divide-y divide-primary/8">
                      {filteredAppointments.map((apt) => (
                        <div key={apt.id} className="p-5 transition-colors hover:bg-violet-light/20">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-headline">{apt.clientName}</p>
                                <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ring-1", STATUS_STYLES[apt.status])}>
                                  {apt.status}
                                </span>
                              </div>
                              <p className="mt-1 text-sm capitalize text-foreground/55">
                                {formatAptDate(apt.date)} · {apt.time}
                              </p>
                              <p className="mt-2 line-clamp-2 text-xs text-foreground/45">{apt.reason}</p>
                              <div className="mt-2 flex flex-col gap-1 text-xs text-foreground/40 sm:flex-row sm:flex-wrap sm:gap-3">
                                <span>{apt.clientPhone}</span>
                                <span>{apt.clientEmail}</span>
                                <span>Ref: {apt.paymentReference}</span>
                              </div>
                            </div>
                            <p className="text-lg font-bold text-emerald-600">{formatCurrency(stats.sessionPrice)}</p>
                          </div>
                          {apt.status === "pendiente" && (
                            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                              <button
                                onClick={() => {
                                  void updateAppointmentStatusAsync(apt.id, "completada").then(refresh);
                                }}
                                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                              >
                                <Check className="h-3.5 w-3.5" /> Marcar completada
                              </button>
                              <button
                                onClick={() => {
                                  void updateAppointmentStatusAsync(apt.id, "cancelada").then(refresh);
                                }}
                                className="flex items-center gap-1.5 rounded-xl bg-red-50 px-4 py-2 text-xs font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-100"
                              >
                                <X className="h-3.5 w-3.5" /> Cancelar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {tab === "availability" && (
              <motion.div key="availability" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AdminAvailabilityCalendar
                  professionalId={pro.id}
                  availability={availability}
                  onRefresh={refresh}
                />
              </motion.div>
            )}

            {tab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AdminProfileEditor
                  professional={pro}
                  onSaved={(updated) => {
                    setPro(updated);
                    refresh();
                  }}
                />
              </motion.div>
            )}

            {tab === "content" && (
              <motion.div key="content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AdminContentEditor />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
