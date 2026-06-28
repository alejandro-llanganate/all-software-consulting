import { professionals } from "@/data/professionals";
import type {
  Appointment,
  AppointmentStatus,
  DayAvailability,
  ProfessionalAvailability,
} from "@/types";

const APPOINTMENTS_KEY = "habitadas_appointments";
const AVAILABILITY_KEY = "habitadas_availability";
const ADMIN_SESSION_KEY = "habitadas_admin_session";
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

function generateDefaultAvailability(professionalId: string): DayAvailability[] {
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
  if (!isBrowser()) return;
  const existing = readJSON<ProfessionalAvailability[]>(AVAILABILITY_KEY, []);
  if (existing.length === 0) {
    const initial = professionals.map((p) => ({
      professionalId: p.id,
      days: generateDefaultAvailability(p.id),
    }));
    writeJSON(AVAILABILITY_KEY, initial);
  }
}

export function getAllAvailability(): ProfessionalAvailability[] {
  initStorage();
  return readJSON<ProfessionalAvailability[]>(AVAILABILITY_KEY, []);
}

export function getAvailability(professionalId: string): DayAvailability[] {
  const all = getAllAvailability();
  return all.find((a) => a.professionalId === professionalId)?.days ?? [];
}

export function setAvailability(professionalId: string, days: DayAvailability[]) {
  const all = getAllAvailability();
  const idx = all.findIndex((a) => a.professionalId === professionalId);
  if (idx >= 0) all[idx] = { professionalId, days };
  else all.push({ professionalId, days });
  writeJSON(AVAILABILITY_KEY, all);
}

export function addSlot(professionalId: string, date: string, time: string) {
  const days = getAvailability(professionalId);
  const day = days.find((d) => d.date === date);
  if (day) {
    if (!day.slots.includes(time)) day.slots.push(time);
    day.slots.sort();
  } else {
    days.push({ date, slots: [time] });
    days.sort((a, b) => a.date.localeCompare(b.date));
  }
  setAvailability(professionalId, days);
}

export function removeSlot(professionalId: string, date: string, time: string) {
  const days = getAvailability(professionalId).map((d) =>
    d.date === date ? { ...d, slots: d.slots.filter((s) => s !== time) } : d,
  ).filter((d) => d.slots.length > 0);
  setAvailability(professionalId, days);
}

export function getAvailableSlots(professionalId: string): DayAvailability[] {
  const booked = getAppointmentsByProfessional(professionalId)
    .filter((a) => a.status !== "cancelada")
    .map((a) => `${a.date}|${a.time}`);

  return getAvailability(professionalId)
    .map((d) => ({
      date: d.date,
      slots: d.slots.filter((s) => !booked.includes(`${d.date}|${s}`)),
    }))
    .filter((d) => d.slots.length > 0);
}

export function getAppointments(): Appointment[] {
  return readJSON<Appointment[]>(APPOINTMENTS_KEY, []);
}

export function getAppointmentsByProfessional(professionalId: string): Appointment[] {
  return getAppointments().filter((a) => a.professionalId === professionalId);
}

export function createAppointment(
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

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
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
  bank: "Bancolombia",
  accountType: "Ahorros",
  accountNumber: "12345678901",
  holder: "HABITADAS S.A.S",
  nit: "900.000.000-1",
};
