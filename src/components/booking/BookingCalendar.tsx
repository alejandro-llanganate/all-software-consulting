"use client";

import { cn } from "@/lib/utils";
import type { DayAvailability } from "@/types";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  slots: DayAvailability[];
  selectedDate: string;
  selectedTime: string;
  onSelect: (date: string, time: string) => void;
};

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function BookingCalendar({ slots, selectedDate, selectedTime, onSelect }: Props) {
  const availableDates = useMemo(
    () => new Set(slots.map((s) => s.date)),
    [slots],
  );

  const slotsByDate = useMemo(
    () => Object.fromEntries(slots.map((s) => [s.date, s.slots])),
    [slots],
  );

  const firstAvailable = slots[0]?.date ?? new Date().toISOString().split("T")[0];
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(firstAvailable + "T12:00:00");
    return { year: d.getFullYear(), month: d.getMonth() };
  });

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

  const prevMonth = () =>
    setViewDate((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 }));

  const nextMonth = () =>
    setViewDate((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 }));

  const daySlots = selectedDate ? slotsByDate[selectedDate] ?? [] : [];

  if (slots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/20 bg-white/60 p-10 text-center">
        <Clock className="mx-auto h-8 w-8 text-primary/30" />
        <p className="mt-3 text-foreground/50">No hay horarios disponibles por ahora.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
      {/* Calendario */}
      <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-primary/8 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-violet-light/60"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-title text-lg text-headline">
            {MONTHS[viewDate.month]} {viewDate.year}
          </h3>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-violet-light/60"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-0.5 sm:mb-4 sm:gap-1">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1 text-center text-[11px] font-semibold tracking-wide text-primary/50 uppercase">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
          {calendarDays.map((cell, i) => {
            if (!cell.date || !cell.day) {
              return <div key={`empty-${i}`} className="aspect-square" />;
            }
            const isAvailable = availableDates.has(cell.date);
            const isSelected = selectedDate === cell.date;
            const isToday = cell.date === new Date().toISOString().split("T")[0];

            return (
              <button
                key={cell.date}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelect(cell.date!, selectedTime && slotsByDate[cell.date!]?.includes(selectedTime) ? selectedTime : "")}
                className={cn(
                  "relative aspect-square rounded-xl text-sm font-medium transition-all duration-200",
                  isAvailable
                    ? "cursor-pointer hover:bg-violet-light/70 hover:text-primary-dark"
                    : "cursor-not-allowed text-foreground/20",
                  isSelected && "bg-primary text-white shadow-md shadow-primary/30 sm:scale-105",
                  isToday && !isSelected && "ring-2 ring-primary/30",
                  isAvailable && !isSelected && "text-headline",
                )}
              >
                {cell.day}
                {isAvailable && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horarios del día seleccionado */}
      <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-primary/8 sm:p-5">
        {selectedDate ? (
          <>
            <p className="text-sm font-medium capitalize text-primary break-words">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="mt-1 text-xs text-foreground/45">Selecciona un horario</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {daySlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => onSelect(selectedDate, time)}
                  className={cn(
                    "rounded-xl py-3 text-sm font-semibold transition-all duration-200",
                    selectedTime === time
                      ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.03]"
                      : "bg-violet-light/40 text-primary-dark ring-1 ring-primary/10 hover:ring-primary/40",
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
            {daySlots.length === 0 && (
              <p className="mt-4 text-sm text-foreground/45">Sin horarios este día.</p>
            )}
          </>
        ) : (
          <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
            <Clock className="h-8 w-8 text-primary/25" />
            <p className="mt-3 text-sm text-foreground/45">
              Selecciona un día disponible en el calendario
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
