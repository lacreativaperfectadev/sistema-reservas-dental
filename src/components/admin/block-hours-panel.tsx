import { useState } from "react";
import type { Schedule } from "../../types";
import { isDayFullyBlocked, weekdayOf } from "../../lib/availability";
import { DatePickerCustom } from "./date-picker-custom";

interface BlockHoursPanelProps {
  schedule: Schedule;
  onUpdate: (schedule: Schedule) => void;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function rawSlotsForDay(schedule: Schedule, date: string): string[] {
  const weekday = weekdayOf(date);
  const daySchedule = schedule.days.find((d) => d.weekday === weekday);
  if (!daySchedule) return [];

  const slots: string[] = [];
  for (const range of daySchedule.ranges) {
    const [startH, startM] = range.start.split(":").map(Number);
    const [endH, endM] = range.end.split(":").map(Number);
    let minutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    while (minutes < endMinutes) {
      const h = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
      const m = (minutes % 60).toString().padStart(2, "0");
      slots.push(`${h}:${m}`);
      minutes += schedule.slotStepMinutes;
    }
  }
  return slots;
}

export function BlockHoursPanel({ schedule, onUpdate }: BlockHoursPanelProps) {
  const [date, setDate] = useState(todayStr());

  const slots = rawSlotsForDay(schedule, date);
  const blockedTimesForDay = new Set(
    schedule.blockedSlots
      .filter((b) => b.date === date && b.time !== null)
      .map((b) => b.time),
  );
  const dayFullyBlocked = isDayFullyBlocked(schedule, date);

  function toggleHour(time: string) {
    const exists = schedule.blockedSlots.some(
      (b) => b.date === date && b.time === time,
    );
    const nextBlockedSlots = exists
      ? schedule.blockedSlots.filter(
          (b) => !(b.date === date && b.time === time),
        )
      : [
          ...schedule.blockedSlots,
          { id: crypto.randomUUID(), date, time },
        ];
    onUpdate({ ...schedule, blockedSlots: nextBlockedSlots });
  }

  function toggleFullDay() {
    const nextBlockedSlots = dayFullyBlocked
      ? schedule.blockedSlots.filter(
          (b) => !(b.date === date && b.time === null),
        )
      : [
          ...schedule.blockedSlots.filter((b) => b.date !== date),
          { id: crypto.randomUUID(), date, time: null },
        ];
    onUpdate({ ...schedule, blockedSlots: nextBlockedSlots });
  }

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-clinic-800">
          Bloquear horas
        </h3>
        <div className="w-40">
          <DatePickerCustom
            value={date}
            onChange={setDate}
            min={todayStr()}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={toggleFullDay}
        className={`mt-4 rounded-full px-4 py-2 text-sm font-medium transition ${
          dayFullyBlocked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "border border-clinic-200 text-clinic-700 hover:bg-clinic-50"
        }`}
      >
        {dayFullyBlocked ? "Desbloquear día completo" : "Bloquear día completo"}
      </button>

      {slots.length === 0 ? (
        <p className="mt-4 text-sm text-clinic-400">
          Este día no tiene horario de consulta configurado.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {slots.map((time) => {
            const blocked = blockedTimesForDay.has(time);
            return (
              <button
                key={time}
                type="button"
                disabled={dayFullyBlocked}
                onClick={() => toggleHour(time)}
                className={`rounded-lg border px-2 py-1.5 text-xs font-medium transition disabled:opacity-40 ${
                  blocked
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-clinic-100 text-clinic-700 hover:border-clinic-400"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
