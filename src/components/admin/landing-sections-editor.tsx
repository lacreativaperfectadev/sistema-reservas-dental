import type { ClinicInfo } from "../../types";
import { ImageUploader } from "./image-uploader";

interface LandingSectionsEditorProps {
  form: ClinicInfo;
  onChange: (patch: Partial<ClinicInfo>) => void;
}

export function LandingSectionsEditor({
  form,
  onChange,
}: LandingSectionsEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-lg border border-clinic-100 p-3">
        <h4 className="text-sm font-semibold text-clinic-800">
          Sección Tratamientos
        </h4>
        <TextField
          label="Texto pequeño superior (eyebrow)"
          value={form.treatmentsEyebrow}
          onChange={(v) => onChange({ treatmentsEyebrow: v })}
        />
        <TextField
          label="Título (primera parte)"
          value={form.treatmentsHeading}
          onChange={(v) => onChange({ treatmentsHeading: v })}
        />
        <TextField
          label="Título (parte destacada en color)"
          value={form.treatmentsHeadingAccent}
          onChange={(v) => onChange({ treatmentsHeadingAccent: v })}
        />
        <TextField
          label="Descripción"
          value={form.treatmentsDescription}
          onChange={(v) => onChange({ treatmentsDescription: v })}
          textarea
        />
      </div>

      <div className="space-y-3 rounded-lg border border-clinic-100 p-3">
        <h4 className="text-sm font-semibold text-clinic-800">
          Sección CTA final
        </h4>
        <TextField
          label="Texto pequeño superior (eyebrow)"
          value={form.finalCtaEyebrow}
          onChange={(v) => onChange({ finalCtaEyebrow: v })}
        />
        <TextField
          label="Título (primera parte)"
          value={form.finalCtaHeading}
          onChange={(v) => onChange({ finalCtaHeading: v })}
        />
        <TextField
          label="Título (parte destacada en color)"
          value={form.finalCtaHeadingAccent}
          onChange={(v) => onChange({ finalCtaHeadingAccent: v })}
        />
        <TextField
          label="Descripción"
          value={form.finalCtaDescription}
          onChange={(v) => onChange({ finalCtaDescription: v })}
          textarea
        />
        <TextField
          label="Texto del botón"
          value={form.finalCtaButtonText}
          onChange={(v) => onChange({ finalCtaButtonText: v })}
        />
        <ImageUploader
          label="Imagen de la sección CTA final"
          image={
            form.finalCtaImageUrl?.startsWith("data:")
              ? form.finalCtaImageUrl
              : null
          }
          fallbackImage={form.finalCtaImageUrl || "/images/cta-sonrisas.webp"}
          onImageChange={(image) =>
            onChange({ finalCtaImageUrl: image || "/images/cta-sonrisas.webp" })
          }
        />
      </div>

      <div className="space-y-3 rounded-lg border border-clinic-100 p-3">
        <h4 className="text-sm font-semibold text-clinic-800">
          Sección Servicios
        </h4>
        <TextField
          label="Título"
          value={form.servicesHeading}
          onChange={(v) => onChange({ servicesHeading: v })}
        />
        <TextField
          label="Subtítulo"
          value={form.servicesSubtext}
          onChange={(v) => onChange({ servicesSubtext: v })}
        />
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}

function TextField({ label, value, onChange, textarea }: TextFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-clinic-700">{label}</label>
      {textarea ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}
