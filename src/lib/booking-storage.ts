/**
 * Capa unificada de citas / disponibilidad.
 * Usa Supabase si hay env; si no, localStorage (dev / offline).
 */
import { professionals } from "@/data/professionals";
import type {
  Appointment,
  AppointmentStatus,
  DayAvailability,
  ProfessionalAvailability,
} from "@/types";
import {
  createAppointmentRemote,
  fetchAvailableSlots,
  fetchAvailability,
  fetchMyAppointments,
  isSupabaseConfigured,
  updateAppointmentStatusRemote,
  upsertAvailabilityDay,
} from "@/lib/supabase/api";

const APPOINTMENTS_KEY = "habitadas_appointments";
const AVAILABILITY_KEY = "habitadas_availability";
const ADMIN_SESSION_KEY = "habitadas_admin_session";
/** Solo fallback local cuando no hay Supabase */
export const ADMIN_PIN = "1234";

const DEFAULT_HOURS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

function isBrowser() {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, data: T) {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(data));
}

function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

function generateDefaultAvailability(): DayAvailability[] {
  const days: DayAvailability[] = [];
  const today = new Date();
  for (let i = 1; i <= 21; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue;
    const slots = DEFAULT_HOURS.filter(() => Math.random() > 0.35);
    if (slots.length > 0) days.push({ date: formatDate(d), slots });
  }
  return days;
}

export function initStorage() {
  if (!isBrowser() || isSupabaseConfigured()) return;
  const existing = readJSON<ProfessionalAvailability[]>(AVAILABILITY_KEY, []);
  if (existing.length === 0) {
    const initial = professionals.map((p) => ({
      professionalId: p.id,
      days: generateDefaultAvailability(),
    }));
    writeJSON(AVAILABILITY_KEY, initial);
  }
}

function getAllAvailabilityLocal(): ProfessionalAvailability[] {
  initStorage();
  return readJSON<ProfessionalAvailability[]>(AVAILABILITY_KEY, []);
}

function getAvailabilityLocal(professionalId: string): DayAvailability[] {
  return (
    getAllAvailabilityLocal().find((a) => a.professionalId === professionalId)
      ?.days ?? []
  );
}

function setAvailabilityLocal(professionalId: string, days: DayAvailability[]) {
  const all = getAllAvailabilityLocal();
  const idx = all.findIndex((a) => a.professionalId === professionalId);
  if (idx >= 0) all[idx] = { professionalId, days };
  else all.push({ professionalId, days });
  writeJSON(AVAILABILITY_KEY, all);
}

/** @deprecated sync — prefer getAvailabilityAsync */
export function getAvailability(professionalId: string): DayAvailability[] {
  return getAvailabilityLocal(professionalId);
}

export async function getAvailabilityAsync(
  professionalId: string,
): Promise<DayAvailability[]> {
  if (isSupabaseConfigured()) {
    const remote = await fetchAvailability(professionalId);
    if (remote) return remote;
  }
  return getAvailabilityLocal(professionalId);
}

export async function setAvailabilityAsync(
  professionalId: string,
  days: DayAvailability[],
) {
  if (isSupabaseConfigured()) {
    const byDate = new Map(days.map((d) => [d.date, d.slots]));
    const existing = (await fetchAvailability(professionalId)) ?? [];
    for (const d of existing) {
      if (!byDate.has(d.date)) {
        await upsertAvailabilityDay(professionalId, d.date, []);
      }
    }
    for (const [date, slots] of byDate) {
      await upsertAvailabilityDay(professionalId, date, slots);
    }
    return;
  }
  setAvailabilityLocal(professionalId, days);
}

export async function addSlotAsync(
  professionalId: string,
  date: string,
  time: string,
) {
  const days = await getAvailabilityAsync(professionalId);
  const day = days.find((d) => d.date === date);
  let next: DayAvailability[];
  if (day) {
    if (!day.slots.includes(time)) day.slots.push(time);
    day.slots.sort();
    next = [...days];
  } else {
    next = [...days, { date, slots: [time] }].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  }
  if (isSupabaseConfigured()) {
    const slots = next.find((d) => d.date === date)?.slots ?? [time];
    await upsertAvailabilityDay(professionalId, date, slots);
    return;
  }
  setAvailabilityLocal(professionalId, next);
}

export async function removeSlotAsync(
  professionalId: string,
  date: string,
  time: string,
) {
  const days = (await getAvailabilityAsync(professionalId))
    .map((d) =>
      d.date === date ? { ...d, slots: d.slots.filter((s) => s !== time) } : d,
    )
    .filter((d) => d.slots.length > 0);
  if (isSupabaseConfigured()) {
    const slots = days.find((d) => d.date === date)?.slots ?? [];
    await upsertAvailabilityDay(professionalId, date, slots);
    return;
  }
  setAvailabilityLocal(professionalId, days);
}

/** sync wrappers usados por el calendario admin (actualizado a async en el componente) */
export function addSlot(professionalId: string, date: string, time: string) {
  void addSlotAsync(professionalId, date, time);
}

export function removeSlot(professionalId: string, date: string, time: string) {
  void removeSlotAsync(professionalId, date, time);
}

export function setAvailability(professionalId: string, days: DayAvailability[]) {
  void setAvailabilityAsync(professionalId, days);
}

export async function getAvailableSlotsAsync(
  professionalId: string,
): Promise<DayAvailability[]> {
  if (isSupabaseConfigured()) {
    const remote = await fetchAvailableSlots(professionalId);
    if (remote) return remote;
  }
  const booked = getAppointmentsByProfessional(professionalId)
    .filter((a) => a.status !== "cancelada")
    .map((a) => `${a.date}|${a.time}`);
  return getAvailabilityLocal(professionalId)
    .map((d) => ({
      date: d.date,
      slots: d.slots.filter((s) => !booked.includes(`${d.date}|${s}`)),
    }))
    .filter((d) => d.slots.length > 0);
}

/** @deprecated sync */
export function getAvailableSlots(professionalId: string): DayAvailability[] {
  const booked = getAppointmentsByProfessional(professionalId)
    .filter((a) => a.status !== "cancelada")
    .map((a) => `${a.date}|${a.time}`);
  return getAvailabilityLocal(professionalId)
    .map((d) => ({
      date: d.date,
      slots: d.slots.filter((s) => !booked.includes(`${d.date}|${s}`)),
    }))
    .filter((d) => d.slots.length > 0);
}

export function getAppointments(): Appointment[] {
  return readJSON<Appointment[]>(APPOINTMENTS_KEY, []);
}

export function getAppointmentsByProfessional(
  professionalId: string,
): Appointment[] {
  return getAppointments().filter((a) => a.professionalId === professionalId);
}

export async function getAppointmentsByProfessionalAsync(
  professionalId: string,
): Promise<Appointment[]> {
  if (isSupabaseConfigured()) {
    const mine = await fetchMyAppointments();
    if (mine) return mine.filter((a) => a.professionalId === professionalId);
  }
  return getAppointmentsByProfessional(professionalId);
}

export function createAppointmentLocal(
  data: Omit<Appointment, "id" | "createdAt" | "status">,
): Appointment {
  const appointment: Appointment = {
    ...data,
    id: `apt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "pendiente",
    createdAt: new Date().toISOString(),
  };
  const all = getAppointments();
  all.push(appointment);
  writeJSON(APPOINTMENTS_KEY, all);
  return appointment;
}

export async function createAppointment(
  data: Omit<Appointment, "id" | "createdAt" | "status">,
): Promise<Appointment> {
  if (isSupabaseConfigured()) {
    const remote = await createAppointmentRemote(data);
    if (remote) return remote;
  }
  return createAppointmentLocal(data);
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  void updateAppointmentStatusAsync(id, status);
}

export async function updateAppointmentStatusAsync(
  id: string,
  status: AppointmentStatus,
) {
  if (isSupabaseConfigured()) {
    const ok = await updateAppointmentStatusRemote(id, status);
    if (ok) return;
  }
  const all = getAppointments().map((a) => (a.id === id ? { ...a, status } : a));
  writeJSON(APPOINTMENTS_KEY, all);
}

export function setAdminSession(professionalId: string) {
  if (!isBrowser()) return;
  sessionStorage.setItem(ADMIN_SESSION_KEY, professionalId);
}

export function getAdminSession(): string | null {
  if (!isBrowser()) return null;
  return sessionStorage.getItem(ADMIN_SESSION_KEY);
}

export function clearAdminSession() {
  if (!isBrowser()) return;
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export function verifyPin(pin: string) {
  return pin === ADMIN_PIN;
}

export const bankInfo = {
  bank: "Banco Pichincha",
  country: "Ecuador",
  accountType: "Ahorros",
  accountNumber: "2200123456",
  holder: "HABITADAS",
  ruc: "1790123456001",
};
