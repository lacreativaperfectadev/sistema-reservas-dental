import { useState, type FormEvent } from "react";
import type { ClinicInfo, Differentiator, Treatment } from "../../types";
import { LogoUploader } from "./logo-uploader";
import { DifferentiatorsEditor } from "./differentiators-editor";
import { TreatmentsEditor } from "./treatments-editor";
import { HeroSectionEditor } from "./hero-section-editor";
import { LandingSectionsEditor } from "./landing-sections-editor";

interface ClinicInfoFormProps {
  clinicInfo: ClinicInfo;
  onUpdate: (info: ClinicInfo) => void;
}

const EMPTY_DIFFERENTIATOR: Differentiator = {
  icon: "clinic",
  title: "",
  description: "",
};

const EMPTY_TREATMENT: Treatment = {
  title: "",
  description: "",
  imageUrl: "",
};

export function ClinicInfoForm({ clinicInfo, onUpdate }: ClinicInfoFormProps) {
  const [form, setForm] = useState<ClinicInfo>({
    ...clinicInfo,
    differentiators:
      clinicInfo.differentiators && clinicInfo.differentiators.length > 0
        ? clinicInfo.differentiators
        : [EMPTY_DIFFERENTIATOR],
    treatments:
      clinicInfo.treatments && clinicInfo.treatments.length > 0
        ? clinicInfo.treatments
        : [EMPTY_TREATMENT],
  });

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
            ["dentistName", "Nombre del dentista"],
          ] as const
        ).map(([field, label]) => (
          <div key={field}>
            <label className="text-sm font-medium text-clinic-700">
              {label}
            </label>
            <input
              value={form[field] || ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, [field]: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
            />
          </div>
        ))}

        <HeroSectionEditor
          form={form}
          onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
        />

        <DifferentiatorsEditor
          differentiators={form.differentiators || [EMPTY_DIFFERENTIATOR]}
          onChange={(differentiators) =>
            setForm((f) => ({ ...f, differentiators }))
          }
        />

        <TreatmentsEditor
          treatments={form.treatments || [EMPTY_TREATMENT]}
          onChange={(treatments) => setForm((f) => ({ ...f, treatments }))}
        />

        <LandingSectionsEditor
          form={form}
          onChange={(patch) => setForm((f) => ({ ...f, ...patch }))}
        />
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
