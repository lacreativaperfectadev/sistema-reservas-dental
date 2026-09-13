import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";

interface DatePickerCustomProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  min?: string;
  max?: string;
}

const WEEKDAY_LETTERS = ["L", "M", "X", "J", "V", "S", "D"];

function parseDate(value: string): Date | undefined {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplay(date: Date | undefined): string {
  if (!date) return "Selecciona una fecha";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function DatePickerCustom({
  value,
  onChange,
  label,
  disabled = false,
  id,
  min,
  max,
}: DatePickerCustomProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = parseDate(value);
  const minDate = min ? parseDate(min) : undefined;
  const maxDate = max ? parseDate(max) : undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectDate(date: Date) {
    onChange(formatIso(date));
    setOpen(false);
  }

  return (
    <div className="relative flex flex-col gap-1" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-clinic-700">
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center justify-between gap-3 rounded border-2 px-3 py-2 text-sm font-medium
          border-clinic-300 bg-white text-clinic-900
          focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200
          focus:outline-none transition-all
          ${disabled ? "opacity-50 cursor-not-allowed bg-clinic-50" : "hover:border-clinic-400"}
        `}
      >
        {formatDisplay(selected)}
        <span aria-hidden="true">📅</span>
      </button>

      {open && !disabled && (
        <div className="absolute top-full right-0 z-20 mt-2 w-72 rounded-xl border border-clinic-200 bg-white p-4 shadow-lg">
          <DayPicker
            mode="single"
            locale={es}
            weekStartsOn={1}
            selected={selected}
            defaultMonth={selected}
            startMonth={minDate}
            endMonth={maxDate}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
            onSelect={(date) => date && selectDate(date)}
            formatters={{
              formatWeekdayName: (date) => WEEKDAY_LETTERS[(date.getDay() + 6) % 7],
              formatCaption: (date) =>
                date
                  .toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                  .replace(/^./, (c) => c.toUpperCase()),
            }}
            classNames={{
              root: "text-clinic-900 w-full",
              months: "w-full",
              month: "w-full",
              month_caption: "flex items-center justify-center py-1 mb-2 font-semibold text-clinic-800",
              nav: "flex items-center justify-between absolute inset-x-0 top-1",
              button_previous:
                "flex h-7 w-7 items-center justify-center rounded-full text-clinic-600 hover:bg-clinic-100",
              button_next:
                "flex h-7 w-7 items-center justify-center rounded-full text-clinic-600 hover:bg-clinic-100",
              month_grid: "w-full border-collapse",
              weekdays: "flex w-full",
              weekday: "flex-1 text-center text-xs font-semibold uppercase text-clinic-500 pb-2",
              week: "flex w-full",
              day: "flex-1 text-center p-0.5",
              day_button:
                "flex h-8 w-8 mx-auto items-center justify-center rounded-full text-sm hover:bg-clinic-100 transition-colors",
              today: "font-bold text-clinic-700",
              selected: "[&>button]:bg-clinic-600! [&>button]:text-white! [&>button]:hover:bg-clinic-600!",
              disabled: "text-clinic-200",
              outside: "text-clinic-200",
              hidden: "invisible",
            }}
            footer={
              <div className="mt-3 flex justify-end border-t border-clinic-100 pt-2">
                <button
                  type="button"
                  onClick={() => selectDate(new Date())}
                  className="text-sm font-semibold text-clinic-600 hover:text-clinic-700"
                >
                  Hoy
                </button>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
