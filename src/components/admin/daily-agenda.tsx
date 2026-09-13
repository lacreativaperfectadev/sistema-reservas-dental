import { useState } from "react";
import type { Appointment, Service } from "../../types";
import { DatePickerCustom } from "./date-picker-custom";

interface DailyAgendaProps {
  appointments: Appointment[];
  services: Service[];
  onRemove: (id: string) => void;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function DailyAgenda({
  appointments,
  services,
  onRemove,
}: DailyAgendaProps) {
  const [date, setDate] = useState(todayStr());

  const dayAppointments = appointments
    .filter((a) => a.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));

  function serviceName(serviceId: string): string {
    return services.find((s) => s.id === serviceId)?.name ?? serviceId;
  }

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-clinic-800">
          Agenda del día
        </h3>
        <div className="w-40">
          <DatePickerCustom
            value={date}
            onChange={setDate}
            min={todayStr()}
          />
        </div>
      </div>

      {dayAppointments.length === 0 ? (
        <p className="mt-4 text-sm text-clinic-400">
          No hay citas para este día.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-clinic-100">
          {dayAppointments.map((a) => (
            <li key={a.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-clinic-800">
                  {a.time} · {serviceName(a.serviceId)}
                </p>
                <p className="text-xs text-clinic-500">
                  {a.patientName} · {a.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(a.id)}
                className="text-xs font-medium text-red-500 hover:text-red-700"
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
