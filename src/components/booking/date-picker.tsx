import { motion } from "framer-motion";
import type { Schedule } from "../../types";
import { isDayFullyBlocked, weekdayOf } from "../../lib/availability";

interface DatePickerProps {
  schedule: Schedule;
  selectedDate: string | null;
  onSelect: (date: string) => void;
  daysAhead?: number;
}

function toDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

const WEEKDAY_LABEL = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function DatePicker({
  schedule,
  selectedDate,
  onSelect,
  daysAhead = 14,
}: DatePickerProps) {
  const today = new Date();
  const days = Array.from({ length: daysAhead }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  const workingWeekdays = new Set(schedule.days.map((d) => d.weekday));

  return (
    <div>
      <h3 className="text-lg font-semibold text-clinic-800">Elige un día</h3>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const dateStr = toDateStr(day);
          const weekday = weekdayOf(dateStr);
          const isWorkingDay = workingWeekdays.has(weekday);
          const isBlocked = isDayFullyBlocked(schedule, dateStr);
          const disabled = !isWorkingDay || isBlocked;
          const isSelected = dateStr === selectedDate;

          return (
            <motion.button
              key={dateStr}
              type="button"
              disabled={disabled}
              whileHover={disabled ? undefined : { y: -2 }}
              onClick={() => onSelect(dateStr)}
              className={`flex min-w-16 flex-col items-center rounded-xl border px-3 py-2 text-sm transition ${
                disabled
                  ? "cursor-not-allowed border-clinic-100 bg-sand-100 text-clinic-300"
                  : isSelected
                    ? "border-clinic-600 bg-clinic-600 text-white shadow-md"
                    : "border-clinic-100 bg-white text-clinic-700 hover:border-clinic-400"
              }`}
            >
              <span className="text-xs uppercase">
                {WEEKDAY_LABEL[weekday]}
              </span>
              <span className="text-lg font-semibold">{day.getDate()}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
