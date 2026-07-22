import { professionals } from "@/data/professionals";
import { getAppointmentsByProfessional } from "@/lib/booking-storage";
import type { Appointment, AppointmentStatus } from "@/types";

export type AdminStats = {
  totalRevenue: number;
  monthRevenue: number;
  sessionPrice: number;
  totalAppointments: number;
  pending: number;
  completed: number;
  cancelled: number;
  completionRate: number;
  upcoming: Appointment[];
  recent: Appointment[];
  byMonth: { label: string; count: number; revenue: number }[];
  statusBreakdown: { status: AppointmentStatus; count: number; label: string }[];
};

function getSessionPrice(professionalId: string) {
  return professionals.find((p) => p.id === professionalId)?.sessionPrice ?? 0;
}

function isThisMonth(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function monthLabel(date: Date) {
  return date.toLocaleDateString("es-CO", { month: "short", year: "2-digit" });
}

export function getAdminStats(professionalId: string): AdminStats {
  const appointments = getAppointmentsByProfessional(professionalId);
  const sessionPrice = getSessionPrice(professionalId);
  const completed = appointments.filter((a) => a.status === "completada");
  const pending = appointments.filter((a) => a.status === "pendiente");
  const cancelled = appointments.filter((a) => a.status === "cancelada");

  const totalRevenue = completed.length * sessionPrice;
  const monthRevenue =
    completed.filter((a) => isThisMonth(a.date)).length * sessionPrice;

  const today = new Date().toISOString().split("T")[0];
  const upcoming = pending
    .filter((a) => a.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const recent = [...appointments]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);

  const active = appointments.filter((a) => a.status !== "cancelada").length;
  const completionRate = active > 0 ? Math.round((completed.length / active) * 100) : 0;

  const byMonth: AdminStats["byMonth"] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = monthLabel(d);
    const monthApps = appointments.filter((a) => {
      const ad = new Date(a.date + "T12:00:00");
      return ad.getMonth() === d.getMonth() && ad.getFullYear() === d.getFullYear();
    });
    const monthCompleted = monthApps.filter((a) => a.status === "completada");
    byMonth.push({
      label,
      count: monthApps.length,
      revenue: monthCompleted.length * sessionPrice,
    });
  }

  return {
    totalRevenue,
    monthRevenue,
    sessionPrice,
    totalAppointments: appointments.length,
    pending: pending.length,
    completed: completed.length,
    cancelled: cancelled.length,
    completionRate,
    upcoming,
    recent,
    byMonth,
    statusBreakdown: [
      { status: "pendiente", count: pending.length, label: "Pendientes" },
      { status: "completada", count: completed.length, label: "Completadas" },
      { status: "cancelada", count: cancelled.length, label: "Canceladas" },
    ],
  };
}

export function formatCurrency(n: number) {
  return `$${n.toLocaleString("es-EC")} USD`;
}
