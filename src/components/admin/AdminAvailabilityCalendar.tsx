"use client";

import { addSlotAsync, removeSlotAsync } from "@/lib/booking-storage";
import { cn } from "@/lib/utils";
import type { DayAvailability } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Moon,
  Plus,
  Sparkles,
  Sun,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const MORNING = ["08:00", "09:00", "10:00", "11:00"];
const AFTERNOON = ["14:00", "15:00", "16:00", "17:00", "18:00"];

type Props = {
  professionalId: string;
  availability: DayAvailability[];
  onRefresh: () => void;
};

function toDateKey(d: Date) {
  return d.toISOString().split("T")[0];
}

export function AdminAvailabilityCalendar({ professionalId, availability, onRefresh }: Props) {
  const today = toDateKey(new Date());

  const slotsByDate = useMemo(
    () => Object.fromEntries(availability.map((d) => [d.date, d.slots])),
    [availability],
  );

  const firstDate = availability[0]?.date ?? today;
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(firstDate + "T12:00:00");
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(
    availability.find((d) => d.date >= today)?.date ?? availability[0]?.date ?? null,
  );

  const calendarDays = useMemo(() => {
    const { year, month } = viewDate;
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { date: string | null; day: number | null }[] = [];

    for (let i = 0; i < startPad; i++) cells.push({ date: null, day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ date: dateStr, day: d });
    }
    return cells;
  }, [viewDate]);

  const monthStats = useMemo(() => {
    const prefix = `${viewDate.year}-${String(viewDate.month + 1).padStart(2, "0")}`;
    const daysInMonth = availability.filter((d) => d.date.startsWith(prefix));
    const totalSlots = daysInMonth.reduce((n, d) => n + d.slots.length, 0);
    return { days: daysInMonth.length, slots: totalSlots };
  }, [availability, viewDate]);

  const selectedSlots = selectedDate ? (slotsByDate[selectedDate] ?? []) : [];

  const prevMonth = () =>
    setViewDate((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));

  const nextMonth = () =>
    setViewDate((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  const goToday = () => {
    const now = new Date();
    setViewDate({ year: now.getFullYear(), month: now.getMonth() });
    setSelectedDate(today);
  };

  const toggleSlot = async (time: string) => {
    if (!selectedDate) return;
    if (selectedSlots.includes(time)) {
      await removeSlotAsync(professionalId, selectedDate, time);
    } else {
      await addSlotAsync(professionalId, selectedDate, time);
    }
    onRefresh();
  };

  const addBulk = async (times: string[]) => {
    if (!selectedDate) return;
    for (const t of times) {
      await addSlotAsync(professionalId, selectedDate, t);
    }
    onRefresh();
  };

  const clearDay = async () => {
    if (!selectedDate) return;
    for (const t of [...selectedSlots]) {
      await removeSlotAsync(professionalId, selectedDate, t);
    }
    onRefresh();
  };

  const formatDayLabel = (date: string) =>
    new Date(date + "T12:00:00").toLocaleDateString("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <div className="space-y-4">
      {/* Stats strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Días con horario", value: monthStats.days, icon: CalendarDays, tint: "from-violet-light/80 to-white" },
          { label: "Horarios este mes", value: monthStats.slots, icon: Clock, tint: "from-accent/25 to-white" },
          { label: "Total configurado", value: availability.reduce((n, d) => n + d.slots.length, 0), icon: Sparkles, tint: "from-emerald-50 to-white" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "flex items-center gap-4 rounded-2xl bg-gradient-to-br p-4 shadow-sm ring-1 ring-primary/10",
              stat.tint,
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm ring-1 ring-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-headline">{stat.value}</p>
              <p className="text-xs text-foreground/50">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
        {/* Calendario */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-primary/10 lg:col-span-3">
          <div className="bg-gradient-to-r from-primary to-primary-dark px-5 py-5 text-white sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                aria-label="Mes anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <p className="text-[11px] font-medium tracking-widest text-white/70 uppercase">Calendario</p>
                <h3 className="font-serif text-xl sm:text-2xl">
                  {MONTHS[viewDate.month]} {viewDate.year}
                </h3>
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
                aria-label="Mes siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={goToday}
              className="mt-3 w-full rounded-xl bg-white/15 py-2 text-xs font-medium transition-colors hover:bg-white/25 sm:w-auto sm:px-4"
            >
              Ir a hoy
            </button>
          </div>

          <div className="p-4 sm:p-5">
            <div className="mb-2 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="py-1 text-center text-[10px] font-bold tracking-wide text-primary/45 uppercase sm:text-[11px]">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((cell, i) => {
                if (!cell.date || !cell.day) {
                  return <div key={`empty-${i}`} className="aspect-square" />;
                }

                const slotCount = slotsByDate[cell.date]?.length ?? 0;
                const isSelected = selectedDate === cell.date;
                const isToday = cell.date === today;
                const isPast = cell.date < today;

                return (
                  <button
                    key={cell.date}
                    type="button"
                    onClick={() => setSelectedDate(cell.date)}
                    className={cn(
                      "group relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200",
                      isSelected && "bg-primary text-white shadow-lg shadow-primary/30 scale-[1.04] z-10",
                      !isSelected && slotCount > 0 && "bg-violet-light/70 text-primary-dark hover:bg-violet-light",
                      !isSelected && slotCount === 0 && "text-headline hover:bg-violet-light/40",
                      isPast && !isSelected && "opacity-45",
                      isToday && !isSelected && "ring-2 ring-primary/40 ring-offset-1",
                    )}
                  >
                    <span>{cell.day}</span>
                    {slotCount > 0 && (
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold",
                          isSelected ? "bg-white/25 text-white" : "bg-primary/15 text-primary-dark",
                        )}
                      >
                        {slotCount}
                      </span>
                    )}
                    {slotCount === 0 && !isSelected && (
                      <span className="mt-1 h-1 w-1 rounded-full bg-transparent group-hover:bg-primary/30" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-primary/8 pt-4 text-[11px] text-foreground/45">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-violet-light/80 ring-1 ring-primary/20" /> Con horarios
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md bg-primary ring-1 ring-primary" /> Seleccionado
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-md ring-2 ring-primary/40" /> Hoy
              </span>
            </div>
          </div>
        </div>

        {/* Panel del día */}
        <div className="rounded-3xl bg-white shadow-sm ring-1 ring-primary/10 lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedDate ? (
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col"
              >
                <div className="border-b border-primary/8 bg-gradient-to-br from-violet-light/50 to-white px-5 py-5">
                  <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">Gestionar día</p>
                  <h3 className="mt-1 font-serif text-xl capitalize text-headline">{formatDayLabel(selectedDate)}</h3>
                  <p className="mt-1 text-sm text-foreground/50">
                    {selectedSlots.length === 0
                      ? "Sin horarios — activa los que quieras ofrecer"
                      : `${selectedSlots.length} horario${selectedSlots.length === 1 ? "" : "s"} disponible${selectedSlots.length === 1 ? "" : "s"}`}
                  </p>
                </div>

                <div className="flex-1 space-y-5 p-5">
                  {/* Acciones rápidas */}
                  <div>
                    <p className="mb-2 text-xs font-semibold text-foreground/45 uppercase tracking-wide">Agregar bloques</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => addBulk(MORNING)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-200 transition-all hover:bg-amber-100"
                      >
                        <Sun className="h-3.5 w-3.5" /> Mañana
                      </button>
                      <button
                        type="button"
                        onClick={() => addBulk(AFTERNOON)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-800 ring-1 ring-indigo-200 transition-all hover:bg-indigo-100"
                      >
                        <Moon className="h-3.5 w-3.5" /> Tarde
                      </button>
                      {selectedSlots.length > 0 && (
                        <button
                          type="button"
                          onClick={clearDay}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600 ring-1 ring-red-200 transition-all hover:bg-red-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Limpiar día
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Grid de horarios */}
                  <div>
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-foreground/45 uppercase tracking-wide">
                      <Plus className="h-3.5 w-3.5" /> Horarios
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time) => {
                        const active = selectedSlots.includes(time);
                        const isMorning = MORNING.includes(time);
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => toggleSlot(time)}
                            className={cn(
                              "relative rounded-xl py-3 text-sm font-semibold transition-all duration-200",
                              active
                                ? "bg-primary text-white shadow-md shadow-primary/25"
                                : cn(
                                    "ring-1 hover:ring-primary/40",
                                    isMorning
                                      ? "bg-amber-50/60 text-amber-900/70 ring-amber-200/60 hover:bg-amber-50"
                                      : "bg-indigo-50/60 text-indigo-900/70 ring-indigo-200/60 hover:bg-indigo-50",
                                  ),
                            )}
                          >
                            {time}
                            {active && (
                              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-primary shadow-sm">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lista activa */}
                  {selectedSlots.length > 0 && (
                    <div className="rounded-2xl bg-violet-light/30 p-4 ring-1 ring-primary/8">
                      <p className="mb-2 text-xs font-medium text-primary-dark">Horarios activos</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSlots.map((time) => (
                          <span
                            key={time}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-primary-dark shadow-sm ring-1 ring-primary/10"
                          >
                            <Clock className="h-3 w-3 text-primary" />
                            {time}
                            <button
                              type="button"
                              onClick={() => toggleSlot(time)}
                              className="ml-0.5 text-foreground/30 transition-colors hover:text-red-500"
                              aria-label={`Quitar ${time}`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-light/60 ring-1 ring-primary/10">
                  <CalendarDays className="h-8 w-8 text-primary/40" />
                </div>
                <p className="mt-4 font-medium text-headline">Selecciona un día</p>
                <p className="mt-1 max-w-[200px] text-sm text-foreground/45">
                  Haz clic en una fecha del calendario para configurar tus horarios
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
