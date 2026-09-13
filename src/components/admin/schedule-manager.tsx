import type { Schedule, ScheduleDay } from "../../types";
import { CheckboxCustom } from "./checkbox-custom";
import { TimePickerCustom } from "./time-picker-custom";

interface ScheduleManagerProps {
  schedule: Schedule;
  onUpdate: (schedule: Schedule) => void;
}

const WEEKDAY_LABEL = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function ScheduleManager({ schedule, onUpdate }: ScheduleManagerProps) {
  function toggleWeekday(weekday: number, enabled: boolean) {
    if (enabled) {
      const next: ScheduleDay = {
        weekday,
        ranges: [{ start: "09:00", end: "14:00" }],
      };
      onUpdate({ ...schedule, days: [...schedule.days, next] });
    } else {
      onUpdate({
        ...schedule,
        days: schedule.days.filter((d) => d.weekday !== weekday),
      });
    }
  }

  function updateRange(
    weekday: number,
    rangeIndex: number,
    field: "start" | "end",
    value: string,
  ) {
    onUpdate({
      ...schedule,
      days: schedule.days.map((d) =>
        d.weekday === weekday
          ? {
              ...d,
              ranges: d.ranges.map((r, i) =>
                i === rangeIndex ? { ...r, [field]: value } : r,
              ),
            }
          : d,
      ),
    });
  }

  function addRange(weekday: number) {
    onUpdate({
      ...schedule,
      days: schedule.days.map((d) =>
        d.weekday === weekday
          ? { ...d, ranges: [...d.ranges, { start: "16:00", end: "20:00" }] }
          : d,
      ),
    });
  }

  function removeRange(weekday: number, rangeIndex: number) {
    onUpdate({
      ...schedule,
      days: schedule.days.map((d) =>
        d.weekday === weekday
          ? { ...d, ranges: d.ranges.filter((_, i) => i !== rangeIndex) }
          : d,
      ),
    });
  }

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-clinic-800">
        Horario semanal
      </h3>
      <div className="mt-4 space-y-3">
        {WEEKDAY_LABEL.map((label, weekday) => {
          const day = schedule.days.find((d) => d.weekday === weekday);
          return (
            <div key={weekday} className="rounded-lg border border-clinic-100 p-3">
              <CheckboxCustom
                checked={Boolean(day)}
                onChange={(checked) => toggleWeekday(weekday, checked)}
                label={label}
              />

              {day && (
                <div className="mt-2 space-y-2">
                  {day.ranges.map((range, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <TimePickerCustom
                          value={range.start}
                          onChange={(value) =>
                            updateRange(weekday, index, "start", value)
                          }
                        />
                      </div>
                      <span className="text-xs text-clinic-400">a</span>
                      <div className="flex-1">
                        <TimePickerCustom
                          value={range.end}
                          onChange={(value) =>
                            updateRange(weekday, index, "end", value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRange(weekday, index)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addRange(weekday)}
                    className="text-xs font-medium text-clinic-600 hover:text-clinic-800"
                  >
                    + Añadir tramo horario
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
