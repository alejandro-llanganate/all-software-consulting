import { assetPath } from "@/lib/asset-path";
import type {
  Appointment,
  AppointmentStatus,
  AreaSlug,
  Certification,
  DayAvailability,
  Education,
  Professional,
} from "@/types";

export type ProfessionalRow = {
  id: string;
  slug: string;
  name: string;
  title: string;
  short_bio: string;
  bio: string;
  approach: string;
  image_url: string;
  gallery: string[] | unknown;
  areas: string[];
  specializations: string[];
  education: Education[] | unknown;
  certifications: Certification[] | unknown;
  session_price: number | string;
  featured: boolean;
  email: string | null;
  active: boolean;
};

export type AppointmentRow = {
  id: string;
  professional_id: string;
  date: string;
  time: string;
  reason: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_id: string;
  payment_method: string;
  payment_reference: string;
  status: AppointmentStatus;
  intake: Record<string, unknown> | null;
  created_at: string;
  professionals?: { name: string } | { name: string }[] | null;
};

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  return [];
}

function asEducation(value: unknown): Education[] {
  if (!Array.isArray(value)) return [];
  return value as Education[];
}

function asCerts(value: unknown): Certification[] {
  if (!Array.isArray(value)) return [];
  return value as Certification[];
}

function resolveMedia(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return assetPath(path);
}

export function mapProfessional(row: ProfessionalRow): Professional {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    title: row.title,
    shortBio: row.short_bio,
    bio: row.bio,
    approach: row.approach,
    image: resolveMedia(row.image_url),
    gallery: asStringArray(row.gallery).map(resolveMedia),
    areas: (row.areas ?? []) as AreaSlug[],
    specializations: row.specializations ?? [],
    education: asEducation(row.education),
    certifications: asCerts(row.certifications),
    sessionPrice: Number(row.session_price) || 0,
    featured: row.featured,
  };
}

function professionalNameFromJoin(
  join: AppointmentRow["professionals"],
): string {
  if (!join) return "";
  if (Array.isArray(join)) return join[0]?.name ?? "";
  return join.name ?? "";
}

export function mapAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    professionalId: row.professional_id,
    professionalName: professionalNameFromJoin(row.professionals),
    date: row.date,
    time: row.time,
    reason: row.reason,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    clientId: row.client_id,
    paymentMethod: (row.payment_method as Appointment["paymentMethod"]) || "transferencia",
    paymentReference: row.payment_reference,
    status: row.status,
    createdAt: row.created_at,
    intake: row.intake ?? undefined,
  };
}

export function mapAvailabilityRows(
  rows: { date: string; slots: string[] | null }[],
): DayAvailability[] {
  return rows
    .map((r) => ({ date: r.date, slots: r.slots ?? [] }))
    .filter((d) => d.slots.length > 0)
    .sort((a, b) => a.date.localeCompare(b.date));
}
