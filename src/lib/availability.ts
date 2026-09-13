import type { Appointment, Schedule } from "../types";

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function rangesOverlap(
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** Fecha local (no UTC) en formato weekday 0-6, evitando el desfase de `new Date("YYYY-MM-DD")`. */
export function weekdayOf(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function isDayFullyBlocked(schedule: Schedule, date: string): boolean {
  return schedule.blockedSlots.some((b) => b.date === date && b.time === null);
}

/**
 * Huecos disponibles para una fecha y una duración de servicio dados, ya
 * descontando citas existentes y horas bloqueadas manualmente desde el admin.
 */
export function getAvailableSlots(
  schedule: Schedule,
  appointments: Appointment[],
  date: string,
  durationMinutes: number,
): string[] {
  if (isDayFullyBlocked(schedule, date)) return [];

  const weekday = weekdayOf(date);
  const daySchedule = schedule.days.find((d) => d.weekday === weekday);
  if (!daySchedule) return [];

  const dayAppointments = appointments.filter((a) => a.date === date);
  const blockedRanges = schedule.blockedSlots
    .filter((b) => b.date === date && b.time !== null)
    .map((b) => {
      const start = timeToMinutes(b.time as string);
      return { start, end: start + schedule.slotStepMinutes };
    });

  const slots: string[] = [];

  for (const range of daySchedule.ranges) {
    const rangeStart = timeToMinutes(range.start);
    const rangeEnd = timeToMinutes(range.end);

    for (
      let start = rangeStart;
      start + durationMinutes <= rangeEnd;
      start += schedule.slotStepMinutes
    ) {
      const slotTime = minutesToTime(start);
      const end = start + durationMinutes;

      const overlapsBlockedHour = blockedRanges.some((b) =>
        rangesOverlap(start, end, b.start, b.end),
      );
      if (overlapsBlockedHour) continue;

      const overlapsAppointment = dayAppointments.some((a) => {
        const aStart = timeToMinutes(a.time);
        const aEnd = aStart + a.durationMinutes;
        return rangesOverlap(start, end, aStart, aEnd);
      });
      if (overlapsAppointment) continue;

      slots.push(slotTime);
    }
  }

  return slots;
}

export function isSlotStillAvailable(
  schedule: Schedule,
  appointments: Appointment[],
  date: string,
  time: string,
  durationMinutes: number,
): boolean {
  return getAvailableSlots(schedule, appointments, date, durationMinutes).includes(time);
}
