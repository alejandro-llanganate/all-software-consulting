import type {
  Appointment,
  AppointmentStatus,
  DayAvailability,
  Professional,
} from "@/types";
import { getSupabase } from "./client";
import { isSupabaseConfigured } from "./config";
import {
  mapAppointment,
  mapAvailabilityRows,
  mapProfessional,
  type AppointmentRow,
  type ProfessionalRow,
} from "./mappers";

export { isSupabaseConfigured };

export async function fetchProfessionals(): Promise<Professional[] | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("professionals")
    .select("*")
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("name");
  if (error) {
    console.error("[supabase] professionals", error.message);
    return null;
  }
  return (data as ProfessionalRow[]).map(mapProfessional);
}

export async function fetchProfessionalBySlug(
  slug: string,
): Promise<Professional | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("professionals")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error || !data) return null;
  return mapProfessional(data as ProfessionalRow);
}

export async function fetchAvailability(
  professionalId: string,
): Promise<DayAvailability[] | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("availability_days")
    .select("date, slots")
    .eq("professional_id", professionalId)
    .gte("date", new Date().toISOString().slice(0, 10))
    .order("date");
  if (error) {
    console.error("[supabase] availability", error.message);
    return null;
  }
  return mapAvailabilityRows(data ?? []);
}

export async function fetchBookedSlots(
  professionalId: string,
): Promise<{ date: string; time: string }[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.rpc("get_booked_slots", {
    p_professional_id: professionalId,
  });
  if (error) {
    console.error("[supabase] booked slots", error.message);
    return [];
  }
  return ((data ?? []) as { slot_date: string; slot_time: string }[]).map(
    (r) => ({ date: r.slot_date, time: r.slot_time }),
  );
}

export async function fetchAvailableSlots(
  professionalId: string,
): Promise<DayAvailability[] | null> {
  const days = await fetchAvailability(professionalId);
  if (!days) return null;
  const booked = await fetchBookedSlots(professionalId);
  const taken = new Set(booked.map((b) => `${b.date}|${b.time}`));
  return days
    .map((d) => ({
      date: d.date,
      slots: d.slots.filter((s) => !taken.has(`${d.date}|${s}`)),
    }))
    .filter((d) => d.slots.length > 0);
}

export async function upsertAvailabilityDay(
  professionalId: string,
  date: string,
  slots: string[],
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  if (slots.length === 0) {
    const { error } = await sb
      .from("availability_days")
      .delete()
      .eq("professional_id", professionalId)
      .eq("date", date);
    return !error;
  }
  const { error } = await sb.from("availability_days").upsert(
    {
      professional_id: professionalId,
      date,
      slots: [...slots].sort(),
    },
    { onConflict: "professional_id,date" },
  );
  if (error) {
    console.error("[supabase] upsert availability", error.message);
    return false;
  }
  return true;
}

export async function createAppointmentRemote(input: {
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  reason: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientId: string;
  paymentMethod: string;
  paymentReference: string;
  intake?: Record<string, unknown>;
}): Promise<Appointment | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data: id, error } = await sb.rpc("create_appointment", {
    p_professional_id: input.professionalId,
    p_date: input.date,
    p_time: input.time,
    p_reason: input.reason,
    p_client_name: input.clientName,
    p_client_email: input.clientEmail,
    p_client_phone: input.clientPhone,
    p_client_id: input.clientId,
    p_payment_method: input.paymentMethod,
    p_payment_reference: input.paymentReference,
    p_intake: input.intake ?? {},
  });

  if (error) {
    console.error("[supabase] create appointment", error.message);
    throw new Error(error.message.includes("SLOT_TAKEN") ? "SLOT_TAKEN" : error.message);
  }

  return {
    id: String(id),
    professionalId: input.professionalId,
    professionalName: input.professionalName,
    date: input.date,
    time: input.time,
    reason: input.reason,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    clientPhone: input.clientPhone,
    clientId: input.clientId,
    paymentMethod: input.paymentMethod as Appointment["paymentMethod"],
    paymentReference: input.paymentReference,
    status: "pendiente",
    createdAt: new Date().toISOString(),
    intake: input.intake,
  };
}

export async function fetchMyAppointments(): Promise<Appointment[] | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("appointments")
    .select("*, professionals(name)")
    .order("date", { ascending: false })
    .order("time", { ascending: false });
  if (error) {
    console.error("[supabase] my appointments", error.message);
    return null;
  }
  return (data as AppointmentRow[]).map(mapAppointment);
}

export async function updateAppointmentStatusRemote(
  id: string,
  status: AppointmentStatus,
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from("appointments").update({ status }).eq("id", id);
  if (error) {
    console.error("[supabase] update status", error.message);
    return false;
  }
  return true;
}

export async function updateMyProfile(
  professionalId: string,
  patch: Partial<{
    name: string;
    title: string;
    short_bio: string;
    bio: string;
    approach: string;
    image_url: string;
    session_price: number;
    specializations: string[];
  }>,
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb
    .from("professionals")
    .update(patch)
    .eq("id", professionalId);
  return !error;
}

export async function fetchSiteContent<T = unknown>(
  key: string,
): Promise<T | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error || !data) return null;
  return data.value as T;
}

export async function upsertSiteContent(
  key: string,
  value: unknown,
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from("site_content").upsert({ key, value });
  return !error;
}

export async function getSessionProfessional(): Promise<Professional | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  const { data, error } = await sb
    .from("professionals")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (error || !data) return null;
  return mapProfessional(data as ProfessionalRow);
}

export async function signInProfessional(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase no configurado");
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOutProfessional() {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signOut();
}
