import { useRef, useState } from "react";
import type { Appointment } from "../../types";

interface AppointmentsBackupProps {
  appointments: Appointment[];
  onImport: (imported: Appointment[]) => number;
}

const REQUIRED_FIELDS: (keyof Appointment)[] = [
  "id",
  "serviceId",
  "date",
  "time",
  "durationMinutes",
  "patientName",
];

function isValidAppointment(value: unknown): value is Appointment {
  if (!value || typeof value !== "object") return false;
  return REQUIRED_FIELDS.every((field) => field in value);
}

export function AppointmentsBackup({
  appointments,
  onImport,
}: AppointmentsBackupProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  function handleExport() {
    const payload = {
      exportedAt: new Date().toISOString(),
      appointments,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `citas-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const raw = JSON.parse(event.target?.result as string);
        const list = Array.isArray(raw) ? raw : raw.appointments;
        if (!Array.isArray(list) || !list.every(isValidAppointment)) {
          setMessage("El archivo no tiene el formato esperado.");
          return;
        }
        const added = onImport(list);
        setMessage(
          added > 0
            ? `Importadas ${added} cita(s) nueva(s).`
            : "No había citas nuevas que importar (ya estaban todas).",
        );
      } catch {
        setMessage("No se pudo leer el archivo. ¿Es un .json válido?");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-clinic-800">
        Copia de seguridad de citas
      </h3>
      <p className="mt-1 text-sm text-clinic-500">
        Las citas se guardan solo en este navegador. Descarga una copia de vez
        en cuando por si se borra el historial o cambias de ordenador.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleExport}
          disabled={appointments.length === 0}
          className="rounded-lg bg-clinic-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-clinic-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Exportar citas ({appointments.length})
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-clinic-300 px-4 py-2 text-sm font-medium text-clinic-700 transition hover:bg-clinic-50"
        >
          Importar citas
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          onChange={handleFileSelect}
          className="sr-only"
        />
      </div>
      {message && <p className="mt-3 text-sm text-clinic-600">{message}</p>}
    </div>
  );
}
