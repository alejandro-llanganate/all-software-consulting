"use client";

import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { FormField } from "@/components/ui/FormField";
import { bankInfo, createAppointment, getAvailableSlots, initStorage } from "@/lib/booking-storage";
import { downloadAppointmentPdf } from "@/lib/download-appointment-pdf";
import type { Appointment, Professional } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { n: 1, label: "Horario", icon: Calendar },
  { n: 2, label: "Motivo", icon: FileText },
  { n: 3, label: "Datos", icon: User },
  { n: 4, label: "Pago", icon: CreditCard },
  { n: 5, label: "Listo", icon: CheckCircle2 },
];

export function BookingFlow({ professional }: { professional: Professional }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientId, setClientId] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [slots, setSlots] = useState<{ date: string; slots: string[] }[]>([]);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    initStorage();
    setSlots(getAvailableSlots(professional.id));
  }, [professional.id]);

  const refreshSlots = () => setSlots(getAvailableSlots(professional.id));

  const handleSelectSlot = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    const appointment = createAppointment({
      professionalId: professional.id,
      professionalName: professional.name,
      date: selectedDate,
      time: selectedTime,
      reason,
      clientName,
      clientEmail,
      clientPhone,
      clientId,
      paymentMethod: "transferencia",
      paymentReference,
    });
    setConfirmedAppointment(appointment);
    setStep(5);
    refreshSlots();
  };

  const formatDate = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary/8 ring-1 ring-primary/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-6 text-white sm:px-8">
        <p className="text-xs font-medium tracking-widest text-white/70 uppercase">Agendar cita</p>
        <h1 className="mt-1 font-serif text-2xl sm:text-3xl">{professional.name}</h1>
        <p className="mt-1 text-sm text-white/75">
          {professional.title} · ${professional.sessionPrice.toLocaleString("es-CO")}/sesión
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex border-b border-primary/8 px-6 py-4 sm:px-8">
        {STEPS.slice(0, 4).map((s) => {
          const Icon = s.icon;
          const active = step === s.n;
          const done = step > s.n;
          return (
            <div key={s.n} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition-all ${
                  done
                    ? "bg-primary text-white"
                    : active
                      ? "bg-primary/15 text-primary ring-2 ring-primary"
                      : "bg-primary/5 text-primary/40"
                }`}
              >
                {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span className={`hidden text-[10px] font-medium sm:block ${active ? "text-primary" : "text-foreground/40"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-6 py-8 sm:px-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <h2 className="text-lg font-semibold text-headline">Elige fecha y hora</h2>
              <p className="mt-1 text-sm text-foreground/50">Los días con punto tienen disponibilidad</p>
              <div className="mt-6">
                <BookingCalendar
                  slots={slots}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onSelect={handleSelectSlot}
                />
              </div>
              {selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl bg-violet-light/50 px-4 py-3 text-sm text-primary-dark"
                >
                  <strong className="capitalize">{formatDate(selectedDate)}</strong> · {selectedTime}
                </motion.div>
              )}
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(2)}
                className="mt-6 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:opacity-40"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5"
            >
              <div>
                <h2 className="text-lg font-semibold text-headline">Motivo de la consulta</h2>
                <p className="mt-1 text-sm capitalize text-foreground/50">
                  {formatDate(selectedDate)} · {selectedTime}
                </p>
              </div>
              <FormField
                multiline
                label="Cuéntanos qué te trae"
                hint="Mínimo 10 caracteres. Esta información ayuda al profesional a prepararse."
                rows={5}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe brevemente el motivo de tu consulta..."
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 rounded-full border border-primary/20 py-3 text-sm font-medium text-primary">
                  Atrás
                </button>
                <button
                  disabled={reason.trim().length < 10}
                  onClick={() => setStep(3)}
                  className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-headline">Tus datos de contacto</h2>
              <FormField label="Nombre completo" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Ej. Ana María López" icon={<User className="h-4 w-4" />} />
              <FormField label="Correo electrónico" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="correo@ejemplo.com" icon={<Mail className="h-4 w-4" />} />
              <FormField label="Teléfono / WhatsApp" type="tel" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+593 98 438 4524" icon={<Phone className="h-4 w-4" />} />
              <FormField label="Documento de identidad" value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="CC / CE / Pasaporte" />
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="flex-1 rounded-full border border-primary/20 py-3 text-sm font-medium text-primary">
                  Atrás
                </button>
                <button
                  disabled={!clientName || !clientEmail || !clientPhone || !clientId}
                  onClick={() => setStep(4)}
                  className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5"
            >
              <h2 className="text-lg font-semibold text-headline">Pago por transferencia</h2>
              <div className="rounded-2xl bg-gradient-to-br from-violet-light/60 to-white p-5 ring-1 ring-primary/10">
                <p className="text-sm font-semibold text-primary-dark">Datos bancarios HABITADAS</p>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {[
                    ["Banco", bankInfo.bank],
                    ["Tipo", bankInfo.accountType],
                    ["Cuenta", bankInfo.accountNumber],
                    ["Titular", bankInfo.holder],
                    ["NIT", bankInfo.nit],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2 rounded-xl bg-white/70 px-3 py-2">
                      <dt className="text-foreground/50">{k}</dt>
                      <dd className="font-medium text-headline">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 flex justify-between rounded-xl bg-primary/10 px-4 py-3">
                  <span className="font-medium text-primary-dark">Monto a transferir</span>
                  <span className="text-lg font-bold text-primary-dark">
                    ${professional.sessionPrice.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>
              <FormField
                label="Referencia o comprobante de pago"
                hint="Número de referencia, últimos dígitos o descripción del pago"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Ej. Ref. 123456789"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 rounded-full border border-primary/20 py-3 text-sm font-medium text-primary">
                  Atrás
                </button>
                <button
                  disabled={!paymentReference.trim()}
                  onClick={handleConfirm}
                  className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Confirmar cita
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && confirmedAppointment && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="mt-5 font-serif text-3xl text-headline">¡Cita confirmada!</h2>
              <p className="mx-auto mt-3 max-w-md text-foreground/65">
                Tu cita con <strong>{professional.name}</strong> quedó registrada para el{" "}
                <strong className="capitalize">{formatDate(selectedDate)}</strong> a las{" "}
                <strong>{selectedTime}</strong>.
              </p>

              <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-violet-light/40 p-5 text-left text-sm ring-1 ring-primary/10">
                <p><span className="text-foreground/50">Referencia:</span> {confirmedAppointment.id}</p>
                <p className="mt-1"><span className="text-foreground/50">Correo:</span> {clientEmail}</p>
                <p className="mt-1"><span className="text-foreground/50">Estado:</span> Pendiente de confirmación</p>
              </div>

              <button
                onClick={() => downloadAppointmentPdf(confirmedAppointment, professional)}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 sm:w-auto"
              >
                <Download className="h-5 w-5" />
                Descargar comprobante PDF
              </button>
              <p className="mt-4 text-xs text-foreground/40">
                Los datos se guardaron en tu navegador. Descarga el PDF como respaldo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
