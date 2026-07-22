"use client";

import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { OptionCard } from "@/components/booking/OptionCard";
import { FormField } from "@/components/ui/FormField";
import {
  contactFullName,
  emptyIntake,
  INTAKE_OPTIONS,
  intakeReasonSummary,
  patientFullName,
  PRIVACY_SUMMARY,
  type IntakeData,
} from "@/data/intake";
import { professionals as staticProfessionals } from "@/data/professionals";
import {
  bankInfo,
  createAppointment,
  getAvailableSlotsAsync,
} from "@/lib/booking-storage";
import { downloadAppointmentPdf } from "@/lib/download-appointment-pdf";
import { fetchProfessionals } from "@/lib/supabase/api";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";
import type { Appointment, DayAvailability, Professional } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Download,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const TOTAL_STEPS = 10;

type Props = {
  professional?: Professional | null;
};

function StepTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-1 font-serif text-2xl text-headline sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 text-sm text-foreground/60">{desc}</p>}
    </div>
  );
}

export function IntakeWizard({ professional: initialPro }: Props) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<IntakeData>(emptyIntake);
  const [proId, setProId] = useState(initialPro?.id ?? "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [email, setEmail] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [professionals, setProfessionals] = useState(staticProfessionals);
  const [slotVersion, setSlotVersion] = useState(0);
  const [slots, setSlots] = useState<DayAvailability[]>([]);
  const [saving, setSaving] = useState(false);
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);
  const [error, setError] = useState("");

  const professional = useMemo(
    () => professionals.find((p) => p.id === proId) ?? initialPro ?? null,
    [proId, initialPro, professionals],
  );

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    void fetchProfessionals().then((remote) => {
      if (remote?.length) setProfessionals(remote);
    });
  }, []);

  useEffect(() => {
    if (!professional) return;
    let cancelled = false;
    void getAvailableSlotsAsync(professional.id).then((s) => {
      if (!cancelled) setSlots(s);
    });
    return () => {
      cancelled = true;
    };
  }, [professional, slotVersion]);

  const displaySlots = professional ? slots : [];

  const patch = (partial: Partial<IntakeData>) => setData((d) => ({ ...d, ...partial }));

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const validate = (): boolean => {
    setError("");
    switch (step) {
      case 1:
        if (!data.truthAccepted || !data.privacyAccepted) {
          setError("Debes aceptar ambas condiciones para continuar.");
          return false;
        }
        break;
      case 2:
        if (!data.contactFirstName.trim() || !data.contactLastName.trim()) {
          setError("Indica tu nombre y apellidos.");
          return false;
        }
        if (data.beneficiary === "otra") {
          if (!data.relationship || !data.patientFirstName.trim() || !data.patientLastName.trim()) {
            setError("Completa la relación y el nombre de quien se atenderá.");
            return false;
          }
        }
        break;
      case 3:
        if (!data.age || !data.gender || !data.idNumber.trim() || !data.city.trim()) {
          setError("Completa edad, género, cédula y ciudad.");
          return false;
        }
        break;
      case 4:
        if (!data.serviceType || !data.modality || !data.reason.trim() || !data.homework || !data.riskLast3Months) {
          setError("Completa servicio, modalidad, motivo y las preguntas de seguimiento.");
          return false;
        }
        break;
      case 5:
        if (!data.employment || !data.income || !data.willingPay) {
          setError("Indica situación laboral, ingreso y disposición de pago.");
          return false;
        }
        break;
      case 6:
        if (data.availableSlots.length === 0) {
          setError("Selecciona al menos un horario preferido.");
          return false;
        }
        if (!data.therapistGender || !data.dialogueStyle || !data.timeFocus) {
          setError("Completa las preferencias terapéuticas.");
          return false;
        }
        break;
      case 7:
        if (!data.billingUnderstood || !data.heardFrom || !data.phone.trim()) {
          setError("Completa facturación, cómo nos conociste y tu teléfono.");
          return false;
        }
        if (!data.procedureUnderstood || !data.notificationsAccepted) {
          // notificationsAccepted must be true
        }
        if (!data.procedureUnderstood || !data.notificationsAccepted) {
          setError("Confirma el procedimiento y el uso de datos / notificaciones.");
          return false;
        }
        break;
      case 8:
        if (!professional) {
          setError("Elige una profesional.");
          return false;
        }
        break;
      case 9:
        if (!selectedDate || !selectedTime) {
          setError("Selecciona fecha y hora disponibles.");
          return false;
        }
        break;
      case 10:
        if (!email.trim() || !paymentReference.trim()) {
          setError("Indica correo y referencia de transferencia.");
          return false;
        }
        break;
    }
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 2 && data.beneficiary === "yo") {
      patch({
        patientFirstName: data.contactFirstName,
        patientLastName: data.contactLastName,
      });
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const toggleSlot = (day: string, hour: string) => {
    const key = `${day}-${hour}`;
    const has = data.availableSlots.includes(key);
    patch({
      availableSlots: has
        ? data.availableSlots.filter((s) => s !== key)
        : [...data.availableSlots, key],
    });
  };

  const confirm = async () => {
    if (!professional || !validate() || saving) return;
    const name = patientFullName(data) || contactFullName(data);
    setSaving(true);
    setError("");
    try {
      const apt = await createAppointment({
        professionalId: professional.id,
        professionalName: professional.name,
        date: selectedDate,
        time: selectedTime,
        reason: intakeReasonSummary(data),
        clientName: name,
        clientEmail: email,
        clientPhone: data.phone,
        clientId: data.idNumber,
        paymentMethod: "transferencia",
        paymentReference,
        intake: { ...data },
      });
      setConfirmed(apt);
      setSlotVersion((v) => v + 1);
      setStep(TOTAL_STEPS + 1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al guardar";
      setError(
        msg === "SLOT_TAKEN"
          ? "Ese horario acaba de ocuparse. Elige otro."
          : "No se pudo registrar la cita. Intenta de nuevo.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (confirmed && professional) {
    return (
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-primary/10">
        <div className="bg-gradient-to-r from-emerald-600 to-primary px-6 py-8 text-center text-white sm:px-10">
          <CheckCircle2 className="mx-auto h-12 w-12" />
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl">¡Cita registrada!</h2>
          <p className="mt-2 text-sm text-white/85">
            Guardamos tu ficha y preferencias. Te contactaremos para confirmar.
          </p>
        </div>
        <div className="space-y-3 p-6 sm:p-8">
          <p className="text-sm text-foreground/70">
            <strong>{professional.name}</strong> · {selectedDate} · {selectedTime}
          </p>
          <p className="text-sm text-foreground/70">{patientFullName(data)}</p>
          <button
            type="button"
            onClick={() => downloadAppointmentPdf(confirmed, professional)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            <Download className="h-4 w-4" /> Descargar comprobante PDF
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary/10 ring-1 ring-primary/10">
      <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-5 text-white sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
              Agenda tu cita
            </p>
            <p className="font-serif text-lg sm:text-xl">
              {professional ? professional.name : "HABITADAS"}
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-white/70">
          Paso {step} de {TOTAL_STEPS}
        </p>
      </div>

      <div className="p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
          >
            {step === 1 && (
              <>
                <StepTitle
                  eyebrow="Empecemos"
                  title="Consentimientos"
                  desc="Antes de conocer tu situación, necesitamos tu confirmación."
                />
                <label className="flex cursor-pointer gap-3 rounded-2xl bg-violet-light/40 p-4 ring-1 ring-primary/10">
                  <input
                    type="checkbox"
                    checked={data.truthAccepted}
                    onChange={(e) => patch({ truthAccepted: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-foreground/80">
                    Acepto que toda la información que aportaré a partir de ahora es completamente
                    verdadera.
                  </span>
                </label>
                <label className="mt-3 flex cursor-pointer gap-3 rounded-2xl bg-violet-light/40 p-4 ring-1 ring-primary/10">
                  <input
                    type="checkbox"
                    checked={data.privacyAccepted}
                    onChange={(e) => patch({ privacyAccepted: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-foreground/80">
                    He leído y acepto la{" "}
                    <span className="font-semibold text-primary">política de tratamiento de datos</span>.
                  </span>
                </label>
                <div className="mt-4 rounded-2xl border border-primary/10 bg-light p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold text-primary uppercase">
                    <Shield className="h-3.5 w-3.5" /> Política (resumen)
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60">{PRIVACY_SUMMARY}</p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <StepTitle
                  eyebrow="Lo más importante"
                  title="¿A quién vamos a acompañar?"
                />
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard
                    selected={data.beneficiary === "yo"}
                    onClick={() => patch({ beneficiary: "yo" })}
                  >
                    A mí
                  </OptionCard>
                  <OptionCard
                    selected={data.beneficiary === "otra"}
                    onClick={() => patch({ beneficiary: "otra" })}
                  >
                    A otra persona
                  </OptionCard>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Tu nombre"
                    value={data.contactFirstName}
                    onChange={(e) => patch({ contactFirstName: e.target.value })}
                    placeholder="Nombre"
                  />
                  <FormField
                    label="Tus apellidos"
                    value={data.contactLastName}
                    onChange={(e) => patch({ contactLastName: e.target.value })}
                    placeholder="Apellidos"
                  />
                </div>
                {data.beneficiary === "otra" && (
                  <div className="mt-6 space-y-4 rounded-2xl bg-violet-light/30 p-4 ring-1 ring-primary/10">
                    <p className="text-sm font-medium text-headline">Datos de quien se atenderá</p>
                    <div className="flex flex-wrap gap-2">
                      {INTAKE_OPTIONS.relationships.map((r) => (
                        <OptionCard
                          key={r}
                          selected={data.relationship === r}
                          onClick={() => patch({ relationship: r })}
                          className="px-3 py-2 text-xs"
                        >
                          {r}
                        </OptionCard>
                      ))}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        label="Nombre"
                        value={data.patientFirstName}
                        onChange={(e) => patch({ patientFirstName: e.target.value })}
                      />
                      <FormField
                        label="Apellidos"
                        value={data.patientLastName}
                        onChange={(e) => patch({ patientLastName: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <StepTitle
                  eyebrow="Perfil"
                  title="Queremos conocer a quien acompañaremos"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="Edad"
                    type="number"
                    min={1}
                    max={120}
                    value={data.age}
                    onChange={(e) => patch({ age: e.target.value })}
                  />
                  <FormField
                    label="Cédula"
                    value={data.idNumber}
                    onChange={(e) => patch({ idNumber: e.target.value })}
                    hint="Si es menor, puedes poner la del representante legal."
                  />
                  <FormField
                    label="Ciudad"
                    value={data.city}
                    onChange={(e) => patch({ city: e.target.value })}
                  />
                  <FormField
                    label="País"
                    value={data.country}
                    onChange={(e) => patch({ country: e.target.value })}
                  />
                </div>
                <p className="mt-5 mb-2 text-sm font-medium text-foreground/80">Género</p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.genders.map((g) => (
                    <OptionCard
                      key={g}
                      selected={data.gender === g}
                      onClick={() => patch({ gender: g })}
                      className="px-3 py-2 text-xs"
                    >
                      {g}
                    </OptionCard>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <StepTitle eyebrow="Atención" title="Servicio y motivo de consulta" />
                <p className="mb-2 text-sm font-medium">Tipo de servicio</p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.services.map((s) => (
                    <OptionCard
                      key={s}
                      selected={data.serviceType === s}
                      onClick={() => patch({ serviceType: s })}
                      className="px-3 py-2 text-xs"
                    >
                      {s}
                    </OptionCard>
                  ))}
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">Modalidad</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {INTAKE_OPTIONS.modalities.map((m) => (
                    <OptionCard
                      key={m}
                      selected={data.modality === m}
                      onClick={() => patch({ modality: m })}
                    >
                      {m}
                    </OptionCard>
                  ))}
                </div>
                <div className="mt-5">
                  <FormField
                    label="Motivo de consulta"
                    multiline
                    rows={4}
                    value={data.reason}
                    onChange={(e) => patch({ reason: e.target.value })}
                    placeholder="Cuéntanos brevemente qué te gustaría trabajar..."
                  />
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">¿Ejercicios prácticos después de las citas?</p>
                <div className="grid gap-2">
                  {INTAKE_OPTIONS.homework.map((h) => (
                    <OptionCard
                      key={h}
                      selected={data.homework === h}
                      onClick={() => patch({ homework: h })}
                      className="text-xs sm:text-sm"
                    >
                      {h}
                    </OptionCard>
                  ))}
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">
                  ¿Ideas o conductas autolesivas / suicidas en los últimos 3 meses?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {INTAKE_OPTIONS.risk.map((r) => (
                    <OptionCard
                      key={r}
                      selected={data.riskLast3Months === r}
                      onClick={() => patch({ riskLast3Months: r })}
                    >
                      {r}
                    </OptionCard>
                  ))}
                </div>
                {data.riskLast3Months === "Sí" && (
                  <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 ring-1 ring-amber-200">
                    Si estás en crisis, contacta emergencias (911) de inmediato. HABITADAS no sustituye
                    atención de urgencia.
                  </p>
                )}
              </>
            )}

            {step === 5 && (
              <>
                <StepTitle
                  eyebrow="Acceso asequible"
                  title="Situación económica"
                  desc="Nos ayuda a ajustar el acceso. La información es confidencial."
                />
                <p className="mb-2 text-sm font-medium">¿Quién pagará la atención?</p>
                <div className="grid grid-cols-2 gap-2">
                  {INTAKE_OPTIONS.payer.map((p) => (
                    <OptionCard
                      key={p}
                      selected={data.payer === p}
                      onClick={() => patch({ payer: p })}
                    >
                      {p}
                    </OptionCard>
                  ))}
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">Situación actual</p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.employment.map((e) => (
                    <OptionCard
                      key={e}
                      selected={data.employment === e}
                      onClick={() => patch({ employment: e })}
                      className="px-3 py-2 text-xs"
                    >
                      {e}
                    </OptionCard>
                  ))}
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">Ingreso mensual aproximado</p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.income.map((i) => (
                    <OptionCard
                      key={i}
                      selected={data.income === i}
                      onClick={() => patch({ income: i })}
                      className="px-3 py-2 text-xs"
                    >
                      {i}
                    </OptionCard>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="¿De dónde proviene este dinero?"
                    value={data.incomeSource}
                    onChange={(e) => patch({ incomeSource: e.target.value })}
                  />
                  <FormField
                    label="¿Cuánto suele quedar al final del mes?"
                    value={data.leftover}
                    onChange={(e) => patch({ leftover: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <FormField
                    label="Algo más sobre la situación económica (opcional)"
                    multiline
                    rows={3}
                    value={data.economicNote}
                    onChange={(e) => patch({ economicNote: e.target.value })}
                  />
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">
                  ¿Cuánto estarías dispuesto/a a pagar por sesión?
                </p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.willingPay.map((w) => (
                    <OptionCard
                      key={w}
                      selected={data.willingPay === w}
                      onClick={() => patch({ willingPay: w })}
                      className="px-3 py-2 text-xs"
                    >
                      {w}
                    </OptionCard>
                  ))}
                </div>
              </>
            )}

            {step === 6 && (
              <>
                <StepTitle
                  eyebrow="Horarios"
                  title="¿Cuándo te viene mejor?"
                  desc="Marca los bloques en los que podrías asistir."
                />
                <div className="overflow-x-auto rounded-2xl ring-1 ring-primary/10">
                  <table className="min-w-[640px] w-full border-collapse text-center text-[10px] sm:text-xs">
                    <thead>
                      <tr className="bg-violet-light/50">
                        <th className="p-2 text-left font-semibold text-primary">Día</th>
                        {INTAKE_OPTIONS.hours.map((h) => (
                          <th key={h} className="p-1 font-medium text-foreground/60">
                            {h.replace(":00", "h")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {INTAKE_OPTIONS.weekdays.map((day) => (
                        <tr key={day} className="border-t border-primary/8">
                          <td className="p-2 text-left font-medium text-headline">{day}</td>
                          {INTAKE_OPTIONS.hours.map((hour) => {
                            const key = `${day}-${hour}`;
                            const on = data.availableSlots.includes(key);
                            return (
                              <td key={key} className="p-1">
                                <button
                                  type="button"
                                  onClick={() => toggleSlot(day, hour)}
                                  className={cn(
                                    "h-7 w-full rounded-md transition-colors",
                                    on ? "bg-primary" : "bg-violet-light/40 hover:bg-violet-light",
                                  )}
                                  aria-label={`${day} ${hour}`}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">Preferencia de profesional</p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.therapistGender.map((t) => (
                    <OptionCard
                      key={t}
                      selected={data.therapistGender === t}
                      onClick={() => patch({ therapistGender: t })}
                      className="px-3 py-2 text-xs"
                    >
                      {t}
                    </OptionCard>
                  ))}
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">Estilo de diálogo</p>
                <div className="grid gap-2">
                  {INTAKE_OPTIONS.dialogue.map((d) => (
                    <OptionCard
                      key={d}
                      selected={data.dialogueStyle === d}
                      onClick={() => patch({ dialogueStyle: d })}
                      className="text-xs sm:text-sm"
                    >
                      {d}
                    </OptionCard>
                  ))}
                </div>
                <p className="mt-5 mb-2 text-sm font-medium">Enfoque temporal</p>
                <div className="grid gap-2">
                  {INTAKE_OPTIONS.timeFocus.map((t) => (
                    <OptionCard
                      key={t}
                      selected={data.timeFocus === t}
                      onClick={() => patch({ timeFocus: t })}
                      className="text-xs sm:text-sm"
                    >
                      {t}
                    </OptionCard>
                  ))}
                </div>
              </>
            )}

            {step === 7 && (
              <>
                <StepTitle eyebrow="Casi listos" title="Contacto y facturación" />
                <div className="rounded-2xl bg-violet-light/40 p-4 text-sm text-foreground/75 ring-1 ring-primary/10">
                  <p className="font-semibold text-headline">Facturación (SRI)</p>
                  <p className="mt-2 text-xs leading-relaxed sm:text-sm">
                    Los pagos deben facturarse con los datos de este formulario. Si pagas desde una
                    cuenta de otra persona, avísanos por WhatsApp antes para actualizar la
                    información.
                  </p>
                </div>
                <label className="mt-4 flex cursor-pointer gap-3 rounded-2xl p-3 ring-1 ring-primary/10">
                  <input
                    type="checkbox"
                    checked={data.billingUnderstood}
                    onChange={(e) => patch({ billingUnderstood: e.target.checked })}
                    className="mt-1 accent-primary"
                  />
                  <span className="text-sm">Entiendo lo anterior sobre facturación.</span>
                </label>
                <p className="mt-5 mb-2 text-sm font-medium">¿Cómo nos conociste?</p>
                <div className="flex flex-wrap gap-2">
                  {INTAKE_OPTIONS.heardFrom.map((h) => (
                    <OptionCard
                      key={h}
                      selected={data.heardFrom === h}
                      onClick={() => patch({ heardFrom: h })}
                      className="px-3 py-2 text-xs"
                    >
                      {h}
                    </OptionCard>
                  ))}
                </div>
                <div className="mt-5">
                  <FormField
                    label="Número de teléfono / WhatsApp"
                    value={data.phone}
                    onChange={(e) => patch({ phone: e.target.value })}
                    placeholder="0984370041"
                  />
                </div>
                <label className="mt-4 flex cursor-pointer gap-3 rounded-2xl p-3 ring-1 ring-primary/10">
                  <input
                    type="checkbox"
                    checked={data.procedureUnderstood}
                    onChange={(e) => patch({ procedureUnderstood: e.target.checked })}
                    className="mt-1 accent-primary"
                  />
                  <span className="text-sm">Tengo claro el procedimiento a seguir.</span>
                </label>
                <label className="mt-2 flex cursor-pointer gap-3 rounded-2xl p-3 ring-1 ring-primary/10">
                  <input
                    type="checkbox"
                    checked={data.notificationsAccepted}
                    onChange={(e) => patch({ notificationsAccepted: e.target.checked })}
                    className="mt-1 accent-primary"
                  />
                  <span className="text-sm">
                    Acepto el uso de mis datos y recibir notificaciones por WhatsApp, correo u otros
                    medios digitales.
                  </span>
                </label>
              </>
            )}

            {step === 8 && (
              <>
                <StepTitle
                  eyebrow="Profesional"
                  title="Elige con quién agendar"
                  desc={initialPro ? "Puedes continuar con esta profesional o cambiar." : undefined}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {professionals.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProId(p.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl p-3 text-left ring-1 transition-all",
                        proId === p.id
                          ? "bg-primary/10 ring-primary"
                          : "bg-white ring-primary/10 hover:ring-primary/30",
                      )}
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                        <Image src={p.image} alt="" fill className="object-cover object-top" sizes="56px" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-headline">{p.name}</p>
                        <p className="truncate text-xs text-foreground/55">{p.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 9 && professional && (
              <>
                <StepTitle
                  eyebrow="Calendario"
                  title="Elige fecha y hora"
                  desc={`Disponibilidad de ${professional.name}`}
                />
                <BookingCalendar
                  slots={displaySlots}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelect={(d, t) => {
                    setSelectedDate(d);
                    setSelectedTime(t);
                  }}
                />
              </>
            )}

            {step === 10 && professional && (
              <>
                <StepTitle eyebrow="Pago" title="Transferencia y confirmación" />
                <div className="rounded-2xl bg-gradient-to-br from-violet-light/60 to-white p-5 ring-1 ring-primary/10">
                  <p className="text-sm font-semibold text-primary-dark">Datos bancarios HABITADAS</p>
                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    {[
                      ["Banco", bankInfo.bank],
                      ["País", bankInfo.country],
                      ["Tipo", bankInfo.accountType],
                      ["Cuenta", bankInfo.accountNumber],
                      ["Titular", bankInfo.holder],
                      ["RUC", bankInfo.ruc],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-2 rounded-xl bg-white/70 px-3 py-2">
                        <dt className="text-foreground/50">{k}</dt>
                        <dd className="font-medium text-headline">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3 flex justify-between rounded-xl bg-primary/10 px-4 py-3">
                    <span className="font-medium text-primary-dark">Referencia sugerida</span>
                    <span className="font-bold text-primary-dark">
                      Según tu disposición: {data.willingPay || "a coordinar"}
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid gap-4">
                  <FormField
                    label="Correo electrónico"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormField
                    label="Referencia / comprobante de transferencia"
                    value={paymentReference}
                    onChange={(e) => setPaymentReference(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-xs text-foreground/50">
                  {selectedDate} · {selectedTime} · {patientFullName(data)}
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
            {error}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground/60 disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Atrás
          </button>
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Continuar <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void confirm()}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Guardando…" : "Confirmar cita"} <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
