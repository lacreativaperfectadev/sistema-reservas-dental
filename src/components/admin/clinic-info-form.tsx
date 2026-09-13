import { useState, type FormEvent } from "react";
import type { ClinicInfo } from "../../types";
import { LogoUploader } from "./logo-uploader";

interface ClinicInfoFormProps {
  clinicInfo: ClinicInfo;
  onUpdate: (info: ClinicInfo) => void;
}

export function ClinicInfoForm({ clinicInfo, onUpdate }: ClinicInfoFormProps) {
  const [form, setForm] = useState(clinicInfo);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onUpdate(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-clinic-800">
        Datos del consultorio
      </h3>
      <p className="mt-1 text-xs text-clinic-500">
        Se muestran en la página informativa y en el archivo .ics.
      </p>
      <div className="mt-4 space-y-4">
        <LogoUploader
          logo={form.logo || null}
          onLogoChange={(logo) => setForm((f) => ({ ...f, logo }))}
        />

        {(
          [
            ["name", "Nombre"],
            ["address", "Dirección"],
            ["phone", "Teléfono"],
            ["email", "Correo"],
            ["hoursText", "Horario (texto libre)"],
          ] as const
        ).map(([field, label]) => (
          <div key={field}>
            <label className="text-sm font-medium text-clinic-700">
              {label}
            </label>
            <input
              value={form[field]}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field]: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 rounded-full bg-clinic-600 px-4 py-2 text-sm font-medium text-white hover:bg-clinic-700"
      >
        Guardar
      </button>
    </form>
  );
}
