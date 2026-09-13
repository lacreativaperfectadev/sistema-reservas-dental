import { useState, type FormEvent } from "react";

export interface PatientFormData {
  patientName: string;
  phone: string;
  email: string;
  reason: string;
}

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
}

export function PatientForm({ onSubmit }: PatientFormProps) {
  const [form, setForm] = useState<PatientFormData>({
    patientName: "",
    phone: "",
    email: "",
    reason: "",
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="text-sm font-medium text-clinic-700">Nombre</label>
        <input
          required
          value={form.patientName}
          onChange={(e) =>
            setForm((f) => ({ ...f, patientName: e.target.value }))
          }
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm outline-none focus:border-clinic-400"
          placeholder="Tu nombre completo"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-clinic-700">
            Teléfono
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm outline-none focus:border-clinic-400"
            placeholder="600 000 000"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-clinic-700">
            Correo
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm outline-none focus:border-clinic-400"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-clinic-700">
          Motivo de la consulta
        </label>
        <textarea
          value={form.reason}
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
          rows={3}
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm outline-none focus:border-clinic-400"
          placeholder="Cuéntanos brevemente qué te trae por aquí (opcional)"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-clinic-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-clinic-700"
      >
        Confirmar cita
      </button>
    </form>
  );
}
